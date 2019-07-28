from app.resources.Common.Base import Base
from flask import request


class Users(Base):

    def get(self):
        sql = """
                SELECT  u.*, l.likes, h.history, t.tags
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
            ;"""
        users = self.base_get_all(sql)
        return users

    def post(self):
        email = request.json['email']
        login = request.json['login']
        password = request.json['password']
        name = request.json['name']

        record = (email, login, password, name)
        sql = '''INSERT INTO users (email, login, password, user_name)
                 VALUES (%s, %s, %s, %s);'''
        res = self.base_write(sql, record)
        return res