from app.resources.Common.Base import Base
from flask import request, session


class Search(Base):

    # recommendation
    # send tags
    def get(self):
        pass

    # search with user's input
    def post(self):
        sql_condition = self.__make_sql()
        sql = """
                SELECT  user_id, user_name, age, sex, preferences, r.sumLikes, t.tags
                FROM    users u
                JOIN rating r ON r.user_fk = u.user_id
                LEFT JOIN (
                     SELECT user_id as user_id_fk, array_agg(tags.tag_name) as tags
                     FROM users_tags
                     JOIN  tags USING (tag_id)
                     GROUP BY 1
                     ) t ON u.user_id = t.user_id_fk
                WHERE   u.user_id != %s
                        {}
                ;""".format(sql_condition)
        # print(sql)
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
