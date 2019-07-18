from .Base import Base
from flask import request

class UserId(Base):

    def get(self, user_id):
        sql = "SELECT user_id, login FROM users WHERE user_id = %s;"
        record = (user_id,)
        user = self.base_get_one(sql, record)
        return user

    def put(self, user_id):
        try:
            sql = """UPDATE users SET email = %s WHERE user_id =%s"""
            # Todo {} doesn't exist".format(todo_id))
            email = request.json['email']
            record = (email, user_id)
            self.base_put(sql, record)
            return 201
        except:
            return 400

    def delete(self, user_id):
        try:
            sql = """DELETE from users WHERE user_id =%s"""
            record = (user_id,)
            self.base_put(sql, record)
            return 201
        except:
            return 400