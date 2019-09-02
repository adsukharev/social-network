from app.resources.Common.Base import Base
from flask import session
from flask_jwt_extended import jwt_required
from .Notification import Notification


class History(Base):

    @jwt_required
    def post(self, to_history_id):
        res = self.__add_history(to_history_id)
        # Notification.send_notification(to_history_id, 'history')
        return res

    def __add_history(self, to_history_id):
        from_history_id = session['user_id']
        record = (from_history_id, to_history_id)
        sql = '''INSERT INTO history (from_history_fk, to_history_fk)
                             VALUES (%s, %s);'''
        res = self.base_write(sql, record)
        # todo:notificate
        return res

    @jwt_required
    def delete(self, to_history_id):
        sql = """DELETE from history WHERE history_id =%s"""
        record = (to_history_id,)
        res = self.base_write(sql, record)
        return res
