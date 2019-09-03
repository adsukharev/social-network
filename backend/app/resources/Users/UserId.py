from flask import request
from app.resources.Common.UsersCommon import UsersCommon
from app.resources.Profile.Images import Images
from app.resources.Profile.Tags import Tags
from flask_jwt_extended import jwt_required


class UserId(UsersCommon):

    @jwt_required
    def get(self, user_id):
        sql = """
                SELECT  u.*, r.sumLikes, l.likes, h.history, t.tags
                FROM users u
                LEFT JOIN rating r ON r.user_fk = u.user_id
                LEFT JOIN (
                      SELECT likes.to_like_fk, array_agg(u.login) as likes
                      FROM likes
                      JOIN  users u ON u.user_id = likes.from_like_fk
                      GROUP BY 1
                      ) l ON u.user_id = l.to_like_fk
                LEFT JOIN (
                      SELECT history.to_history_fk, array_agg(u.login) as history
                      FROM history
                      JOIN  users u ON u.user_id = history.from_history_fk
                      GROUP BY 1
                      ) h ON u.user_id = h.to_history_fk
                LEFT JOIN (
                     SELECT user_id as user_id_fk, array_agg(tags.tag_name) as tags
                     FROM users_tags
                     JOIN  tags USING (tag_id)
                     GROUP BY 1
                     ) t ON u.user_id = t.user_id_fk
                WHERE u.user_id = %s
            ;"""
        record = (user_id,)
        user = self.base_get_one(sql, record)
        return user

    def delete(self, user_id):
        sql = """DELETE from users WHERE user_id = %s"""
        record = (user_id,)
        res = self.base_write(sql, record)
        return res

    @jwt_required
    def put(self, user_id):
        req_params = dict(request.form)
        params = self.__manage_user_params(req_params, user_id)
        if isinstance(params, str):
            return {'error': params}
        self.__write_userdata_to_db(params, user_id)
        return "ok"

    def __manage_user_params(self, params, user_id):
        checked_params = self.check_user_params(params)
        res = self.handle_tags(checked_params, user_id)
        image_obj = Images()
        result_image = image_obj.handle_images(request.files, user_id)
        if result_image != "ok":
            return result_image
        return res

    @staticmethod
    def check_user_params(params):
        allowed_user_columns = ['email', 'login', 'password', 'user_name', 'age', 'sex', 'preferences', 'bio', 'city',
                                'latitude', 'longitude', 'notification', 'tags']
        for key in params.copy():
            if key not in allowed_user_columns:
                del params[key]
        return params

    @staticmethod
    def handle_tags(params, user_id):
        if "tags" in params:
            import json
            tags = json.loads(params['tags'])
            tag_obj = Tags()
            tag_obj.manage_tags(tags, user_id)
            del params["tags"]
        return params

    def __write_userdata_to_db(self, params, user_id):
        for key, value in params.items():
            sql = "UPDATE users SET {} = %s WHERE user_id =%s".format(key)
            if key == "password":
                value = self.to_hash(value)
            record = (value, user_id)
            self.base_write(sql, record)
