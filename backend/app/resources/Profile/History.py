from app.resources.Common.Base import Base
from flask import request, session
from app.resources.Email import Email


class History(Base):

    def post(self):
        to_history_id = request.json["to_history_id"]
        if self.__add_history(to_history_id) == "error":
            return "error"
        email = Email()
        res = email.manage_notification(to_history_id, "visited")
        return res

    def __add_history(self, to_history_id):
        from_history_id = session['user_id']
        record = (from_history_id, to_history_id)
        sql = '''INSERT INTO history (from_history_fk, to_history_fk)
                             VALUES (%s, %s);'''
        res = self.base_write(sql, record)
        return res

    def delete(self):
        sql = """DELETE from history WHERE history_id =%s"""
        to_history_id = request.json["to_history_id"]
        record = (to_history_id,)
        res = self.base_write(sql, record)
        return res
