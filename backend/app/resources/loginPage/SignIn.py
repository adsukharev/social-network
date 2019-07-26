from app.resources.Common.UsersCommon import UsersCommon
from flask import request, session
from flask_jwt_extended import create_access_token


class SignIn(UsersCommon):

    def post(self):
        login = request.json['login']
        password_request = self.to_hash(request.json['password'])
        result = self.__check_login_password_status(login, password_request)
        if result != "ok":
            return {'message': result}
        # todo: if res == "ok": func add_gps
        result_obj = self.__create_token(login)
        return result_obj

    def __check_login_password_status(self, login, password_request):
        sql = '''SELECT user_id, password, status FROM users
                 WHERE login = %s
                ;'''
        record = (login,)
        user_data = self.base_get_one(sql, record)
        if not user_data:
            return "Login does not exist"
        if not user_data['status']:
            return "You are not confirmed email address"
        if password_request != user_data['password']:
            return "Invalid Passport"
        session['login'] = login
        session['user_id'] = user_data['user_id']
        return "ok"

    def __create_token(self, login):
        access_token = create_access_token(identity=login, expires_delta=False)
        result_obj = {
            'message': "ok",
            'access_token': access_token
        }
        return result_obj
