from .Base import Base
from flask import request


class History(Base):

    def post(self):
        # todo: id from session
        from_history_id = 3
        to_history_id = request.json["to_history_id"]
        record = (from_history_id, to_history_id)
        sql = '''INSERT INTO history (from_history_fk, to_history_fk)
                     VALUES (%s, %s);'''
        if self.base_write(sql, record):
            return "ok"
        else:
            return "error"

    def delete(self):
        sql = """DELETE from history WHERE history_id =%s"""
        to_history_id = request.json["to_history_id"]
        record = (to_history_id,)
        if self.base_write(sql, record):
            return "ok"
        else:
            return "error"
