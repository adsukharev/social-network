from flask import request, session, redirect
from app.config import FACEBOOK
from app.resources.Common.UsersCommon import UsersCommon
from app.resources.Rating import Rating
from .SignIn import SignIn
from rauth import OAuth2Service
import os
import json


class OAuthFB(UsersCommon):
    facebook = ''
    redirect_uri = ''

    def __init__(self):
        host = os.environ['HOST']
        self.redirect_uri = "http://{}:5000/api/oauth".format(host)
        self.facebook = OAuth2Service(
            client_id=FACEBOOK['id'],
            client_secret=FACEBOOK['secret'],
            name='facebook',
            authorize_url='https://graph.facebook.com/oauth/authorize',
            access_token_url='https://graph.facebook.com/oauth/access_token',
            base_url='https://graph.facebook.com/'
        )

    def post(self):
        return redirect(self.facebook.get_authorize_url(
            scope='email',
            response_type='code',
            redirect_uri=self.redirect_uri
        ))

    # callback
    def get(self):

        def decode_json(payload):
            return json.loads(payload.decode('utf-8'))

        data = {
            'code': request.args['code'],
            'grant_type': 'authorization_code',
            'redirect_uri': self.redirect_uri
        }
        session_fb = self.facebook.get_auth_session(data=data, decoder=decode_json)
        res = self.__manage_oauth(session_fb)
        return res

    def __manage_oauth(self, session_fb):
        user_fb = session_fb.get('me', params={'format': 'json'})
        social_id = user_fb.json()['id']
        login = user_fb.json()['name']
        checker = self.__check_social_id(social_id)
        if checker == 'blocked':
            return checker
        if not checker:                 # if user does not exist
            self.__add_to_db_users(social_id, login)
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

    def __add_to_db_users(self, social_id, login):
        user_name = login.split()[0]
        record = (login, user_name, social_id)
        sql = '''INSERT INTO users (login, user_name, social_id, status)
                             VALUES (%s, %s, %s, '1');'''
        self.base_write(sql, record)
