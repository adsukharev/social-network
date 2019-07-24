from app.resources.Common.UsersCommon import UsersCommon
from flask import request
from .Tags import Tags


class UserId(UsersCommon):

    def get(self, user_id):
        sql = """
                SELECT  u.user_id, u.login, u.email, u.user_name, u.age, u.sex, u.preferences,
                        u.bio, u.avatar ,l.likes, h.history, t.tags
                FROM users u
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

    def put(self, user_id):
        params = self.check_user_params_add_handle_tags(request.json)
        for key, value in params.items():
            sql = "UPDATE users SET {} = %s WHERE user_id =%s".format(key)
            if key == "password":
                value = self.to_hash(value)
            record = (value, user_id)
            self.base_write(sql, record)
        return "ok"

    def delete(self, user_id):
        sql = """DELETE from users WHERE user_id =%s"""
        record = (user_id,)
        if self.base_write(sql, record):
            return "ok"
        return "error"

    def check_user_params_add_handle_tags(self, params):
        allowed_user_columns = ['email', 'login', 'password', 'user_name', 'age', 'sex', 'preferences', 'bio', 'avatar',
                                'latitude', 'longitude', 'status', 'notification', 'tags']
        if "tags" in params:
            tag = Tags()
            tag.manage_tags(params["tags"])
            del params["tags"]
        for key in params.copy():
            if key not in allowed_user_columns:
                del params[key]
        return params
