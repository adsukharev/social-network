from .Base import Base
from flask import request


class Users(Base):

    def get(self):
        sql = "SELECT * FROM users;"
        users = self.base_get_all(sql)
        return users

    def post(self):
        try:
            email = request.json['email']
            login = request.json['login']
            password = request.json['password']
            name = request.json['name']

            record = (email, login, password, name)
            sql = '''INSERT INTO users (email, login, password, user_name)
                     VALUES (%s, %s, %s, %s);'''
            self.base_post(sql, record)
            return 201
        except:
            return 400
