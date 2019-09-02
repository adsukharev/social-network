from app.resources.Common.Base import Base
from flask import session
from flask_jwt_extended import get_raw_jwt, jwt_required
from time import gmtime, strftime


class LogOut(Base):

    @jwt_required
    def delete(self):
        try:
            self.__offline_status()
            session['login'] = ''
            session['user_id'] = ''
            jti = get_raw_jwt()['jti']
            sql = "INSERT INTO token_revokes (token) VALUES (%s);"
            record = (jti,)
            res = self.base_write(sql, record)
            return res
        except Exception as e:
            print("logout", e)

    def __offline_status(self):
        try:
            online = strftime("%Y-%m-%d %H:%M:%S", gmtime())
            sql = "UPDATE users SET online = %s WHERE user_id = %s;"
            record = (online,  session['user_id'])
            self.base_write(sql, record)
        except Exception as e:
            print("logout", e)
