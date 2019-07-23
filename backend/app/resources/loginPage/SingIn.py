from app.resources.Common.UsersCommon import UsersCommon
from flask import request


class SingUp(UsersCommon):

    def post(self):
        login = request.json['login']
        password_request = self.to_hash(request.json['password'].encode())
        result = self.__check_login_password_status(login, password_request)
        return result

    def __check_login_password_status(self, login, password_request):
        sql = '''SELECT password, status FROM users
                 WHERE login = %s
                ;'''
        record = (login,)
        password_status = self.base_get_one(sql, record)
        if not password_status['password']:
            return "Login does not exist"
        if not password_status['status']:
            return "You are not confirmed email address"
        if password_request != password_status['password']:
            return "Invalid Passport"
        return "Ok"

