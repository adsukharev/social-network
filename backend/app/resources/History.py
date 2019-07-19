from .Base import Base
from flask import request


class History(Base):

    def post(self):
        try:
            # todo: id from session
            from_history_id = 3
            to_history_id = request.json["to_history_id"]
            record = (from_history_id, to_history_id)
            sql = '''INSERT INTO history (from_history_fk, to_history_fk)
                     VALUES (%s, %s);'''
            self.base_write(sql, record)
            return "ok"
        except Exception as error:
            print(error)
            return "error"

    def delete(self):
        try:
            sql = """DELETE from history WHERE history_id =%s"""
            to_history_id = request.json["to_history_id"]
            record = (to_history_id,)
            self.base_write(sql, record)
            return "ok"
        except Exception as error:
            print(error)
            return "error"
