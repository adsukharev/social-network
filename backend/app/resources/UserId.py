from .Base import Base
from flask import request
from .Tags import Tags

class UserId(Base):

    def get(self, user_id):
        sql = """
                SELECT  u.user_id, u.login, l.likes, h.history
                FROM users u
                JOIN (
                    SELECT to_like_fk, array_agg(from_like_fk) as likes
                    FROM likes
                    GROUP BY 1
                    ) l ON u.user_id = l.to_like_fk
                JOIN (
                    SELECT to_history_fk, array_agg(from_history_fk) as history
                    FROM history
                    GROUP BY 1
                    ) h ON u.user_id = h.to_history_fk
                WHERE user_id = %s
            ;"""
        record = (user_id,)
        user = self.base_get_one(sql, record)
        return user

    def put(self, user_id):
        try:
            params = self.check_user_params(request.json)
            for key,value in params.items():
                sql = "UPDATE users SET {} = %s WHERE user_id =%s".format(key)
                record = (value, user_id)
                self.base_write(sql, record)
            return "ok"
        except Exception as error:
            print(error)
            return "error"

    def delete(self, user_id):
        try:
            sql = """DELETE from users WHERE user_id =%s"""
            record = (user_id,)
            self.base_write(sql, record)
            return "ok"
        except Exception as error:
            print(error)
            return "error"

    def check_user_params(self, params):
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