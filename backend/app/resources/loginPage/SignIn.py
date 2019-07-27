from app.resources.Common.UsersCommon import UsersCommon
from flask import request, session
from flask_jwt_extended import create_access_token
import geoip2.database


class SignIn(UsersCommon):

    def post(self):
        login = request.json['login']
        password_request = self.to_hash(request.json['password'])
        result = self.__check_login_password_status(login, password_request)
        if result != "ok":
            return {'message': result}
        # todo: func add_gps
        if not self.__add_location():
          return {'message': 'error in adding location'}
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
        # session['login'] = login
        session['user_id'] = user_data['user_id']
        return "ok"

    def __create_token(self, login):
        # todo: change to id
        access_token = create_access_token(identity=login, expires_delta=False)
        result_obj = {
            'message': "ok",
            'access_token': access_token
        }
        return result_obj

    def __add_location(self):
        latitude, longitude = self.__get_location()
        sql = "UPDATE users SET latitude = %s, longitude = %s WHERE user_id =%s"
        record = (latitude, longitude, session['user_id'])
        res =  self.base_write(sql, record)
        return res

    def __get_location(self):
        try:
            if self.__check_location():
                latitude = request.json['latitude']
                longitude = request.json['longitude']
            else:
                reader = geoip2.database.Reader('./GeoLite2/GeoLite2-City.mmdb')
                ip = str(request.remote_addr)
                response = reader.city(ip)
                latitude = response.location.latitude
                longitude = response.location.longitude
                reader.close()
        except Exception as e:
            print(e)
            latitude = 55.7116423
            longitude = 37.738213
        finally:
            return float(latitude), float(longitude)

    def __check_location(self):
        if 'latitude' in request.json and 'longitude' in request.json:
            if request.json['latitude'] != '' and request.json['longitude'] != '':
                return 1
        return 0
