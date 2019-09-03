from app.resources.Users.UserId import UserId
from app.resources.Common.Base import Base
from flask import request, session
from flask_jwt_extended import jwt_required


class Search(Base):

    sql = """
                    SELECT  user_id, user_name, age, sex, l.likes, avatar, preferences, r.sumLikes, t.tags
                    FROM    users u
                    JOIN rating r ON r.user_fk = u.user_id
                    LEFT JOIN (
                        SELECT user_id as user_id_fk, array_agg(tags.tag_name) as tags
                        FROM users_tags
                        JOIN  tags USING (tag_id)
                        GROUP BY 1
                        ) t ON u.user_id = t.user_id_fk
                    LEFT JOIN (
                      SELECT likes.to_like_fk, array_agg(u.login) as likes
                      FROM likes
                      JOIN  users u ON u.user_id = likes.from_like_fk
                      GROUP BY 1
                      ) l ON u.user_id = l.to_like_fk
                    WHERE   u.user_id != %s AND u.fake = '0'
                            {}
                    ;"""

    # recommendation
    @jwt_required
    def get(self):
        user_obj = UserId()
        user = dict(user_obj.get(session['user_id']))
        checker = self.__check_full_profile(user)
        if checker == "error":
            return {"message": "error"}
        sql_recommendation = self.__make_recomendation(user)
        sql = self.sql.format(sql_recommendation)
        record = (session['user_id'],)
        users = self.base_get_limited_all(sql, record)
        return users

    def __check_full_profile(self, user):
        needed_cols = ['age', 'sex', 'preferences', 'tags']
        try:
            for key in needed_cols:
                if not user[key]:
                    return "error"
            return "ok"
        except:
            return "error"

    def __make_recomendation(self, user):
        sql_recommendation = "AND (u.preferences = '{}'".format(user['preferences'])
        sql_sex = self.__recommend_sql_sex(user['preferences'], user['sex'])
        sql_age = " AND (u.age BETWEEN {} AND {}) ".format(user['age'] - 5, user['age'] + 5)
        sql_location = self.__recomend_sql_location(user['latitude'], user['longitude'])
        sql_rating = " AND (r.sumLikes BETWEEN {} AND {}) ".format(user['sumlikes'] - 15, user['sumlikes'] + 15)
        sql_tags = self.__recommend_sql_tags(user['tags'])
        sql_recommendation += sql_sex
        sql_recommendation += sql_age
        sql_recommendation += sql_location
        sql_recommendation += sql_rating
        sql_recommendation += sql_tags
        sql_recommendation += ")"
        return sql_recommendation

    def __recommend_sql_tags(self, tags):
        sql_tags = "AND (t.tags @> '{"
        start = " OR t.tags @> '{"
        end = "}'"
        sql_tags += tags[0] + end
        for i in range(1, len(tags)):
            sql = start + tags[i] + end
            sql_tags += sql
        sql_tags += ")"
        return sql_tags

    def __recomend_sql_location(self, latitude, longitude):
        res = """ 
                AND (u.latitude BETWEEN {} AND {})
                AND (u.longitude BETWEEN {} AND {})
            """.format(latitude - 0.3, latitude + 0.3, longitude - 0.3, longitude + 0.3)
        return res

    def __recommend_sql_sex(self, preferences, sex):
        getero = {
            "male": " AND u.sex = 'female' ",
            "female": " AND u.sex = 'male' "
        }
        if preferences == "gomo":
            res = " AND u.sex = '{}' ".format(sex)
        elif preferences == "getero":
            res = getero.get(sex)
        else:
            res = " "
        return res

    # search with user's input
    @jwt_required
    def post(self):
        # todo: block condition
        sql_condition = self.__make_sql()
        sql = self.sql.format(sql_condition)
        record = (session['user_id'],)
        users = self.base_get_limited_all(sql, record)
        return users

    def __make_sql(self):
        preferences_sql = self.__make_sql_preferences()
        sql_rating = self.__make_sql_rating()
        sql_tags = self.__make_sql_tags()
        sex_sql = self.__make_sql_sex()
        age_sql = self.__make_sql_age()
        location_sql = self.__make_sql_location()
        sql_condition = ''
        if preferences_sql:
            sql_condition += preferences_sql
        if sql_rating:
            sql_condition += sql_rating
        if sex_sql:
            sql_condition += sex_sql
        if age_sql:
            sql_condition += age_sql
        if location_sql:
            sql_condition += location_sql
        if sql_tags:
            sql_condition += sql_tags
        return sql_condition

    def __make_sql_preferences(self):
        try:
            preferences = request.json["preferences"]
            if not preferences:
                return ""
            sql_preferences = " AND u.preferences = '{}' ".format(preferences)
            return sql_preferences
        except:
            return ""

    def __make_sql_rating(self):
        try:
            rating_from = request.json["sumLikes"][0]
            rating_to = request.json["sumLikes"][1]
            if rating_from == "" or not rating_to:
                return ""
            sql_rating = " AND r.sumLikes BETWEEN {} AND {} ".format(rating_from, rating_to)
            return sql_rating
        except Exception as e:
            print(e)
            return ""

    def __make_sql_tags(self):
        try:
            tags = request.json["tags"]
            if not tags:
                return ""
            sql_tags = ""
            start = " AND t.tags @> '{"
            end = "}'"
            for tag in tags:
                sql = start + tag + end
                sql_tags += sql
            return sql_tags
        except:
            return ""

    def __make_sql_sex(self):
        try:
            sex = request.json["sex"]
            if not sex:
                return ""
            sex_sql = " AND u.sex = '{}' ".format(sex)
            return sex_sql
        except:
            return ""

    def __make_sql_age(self):
        try:
            age_from = request.json["age"][0]
            age_to = request.json["age"][1]
            if age_from == "" or not age_to:
                return ""
            age_sql = " AND u.age BETWEEN {} AND {} ".format(age_from, age_to)
            return age_sql
        except:
            return ""

    def __make_sql_location(self):
        try:
            location = request.json["location"]
            if not location:
                return ''
            sql = "SELECT latitude, longitude FROM users WHERE user_id = %s;"
            record = (session['user_id'],)
            user_location = self.base_get_one(sql, record)

            latitude = user_location['latitude']
            longitude = user_location['longitude']
            location_sql = """ AND u.latitude BETWEEN {} AND {} AND
                                u.longitude BETWEEN {} AND {} 
                                """.format(latitude - 0.3, latitude + 0.3, longitude - 0.3, longitude + 0.3)
            return location_sql
        except:
            return ""
