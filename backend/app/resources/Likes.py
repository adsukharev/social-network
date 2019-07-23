from app.resources.Common.Base import Base
from flask import request, session


class Likes(Base):

    def post(self):
        from_like_id = session['user_id']
        to_like_id = request.json["to_like_id"]
        sql = '''INSERT INTO likes (from_like_fk, to_like_fk)
                     VALUES (%s, %s);'''
        record = (from_like_id, to_like_id)
        if self.base_write(sql, record):
            return "ok"
        return "error"

    def delete(self):
        sql = """DELETE from likes
                     WHERE from_like_fk = %s AND to_like_fk = %s"""
        to_like_id = request.json["to_dislike_id"]
        from_like_id = session['user_id']
        record = (from_like_id, to_like_id)
        if self.base_write(sql, record):
            return "ok"
        return "error"