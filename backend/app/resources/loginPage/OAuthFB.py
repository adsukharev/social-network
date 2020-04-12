from flask import request, session, redirect
from app.resources.Common.UsersCommon import UsersCommon
from app.resources.Rating import Rating
from .SignIn import SignIn
from rauth import OAuth2Service
import os
import json


class OAuthFB(UsersCommon):


    def post(self):
        fb_data = request.json
        res = self.__manage_oauth(fb_data['social_id'], fb_data['login'], fb_data['name'], fb_data['email'], )
        return res

    def __manage_oauth(self, social_id, login, name, email):
        checker = self.__check_social_id(social_id)
        if checker == 'blocked':
            return checker
        if not checker:                 # if user does not exist
            self.__add_to_db_users(social_id, login, name, email)
            user_id = self.__get_user_id(social_id)
            rating = Rating()
            if rating.create_user(user_id) == "error":
                return "can't add user to rating"
        user_id = self.__get_user_id(social_id)
        session['login'] = login
        session['user_id'] = user_id
        signin = SignIn()
        if not signin.add_location():
            return {'message': 'error in adding location'}
        result_obj = signin.create_token()
        return result_obj

    def __get_user_id(self, social_id):
        record = (social_id,)
        sql = '''SELECT user_id FROM users
                         WHERE social_id = %s
                        ;'''
        user_id = self.base_get_one(sql, record)
        return user_id['user_id']

    def __check_social_id(self, social_id):
        sql = '''SELECT user_id, fake FROM users
                     WHERE social_id = %s
                                    ;'''
        record = (social_id,)
        user = self.base_get_one(sql, record)
        if not user:
            return False
        if user['fake']:
            return 'blocked'
        return True

    def __add_to_db_users(self, social_id, login, name, email):
        latitude = 55.7116423
        longitude = 37.738213
        record = (email, login, name, social_id, latitude, longitude)
        sql = '''INSERT INTO users (email, login, user_name, social_id, latitude, longitude, status)
                             VALUES (%s, %s, %s, %s, %s, %s, '1', );'''
        self.base_write(sql, record)
