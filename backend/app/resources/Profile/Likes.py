from app.resources.Common.Base import Base
from flask import request, session
from app.resources.Rating import Rating
from app.resources.Email import Email

class Likes(Base):

    def post(self):
        to_like_id = request.json["to_like_id"]
        if self.__add_like(to_like_id) == "error":
            return "add_like error"
        # increase like in rating
        rating = Rating()
        if rating.inc_like(to_like_id) == "error":
            return "increase like in rating error"
        email = Email()
        res = email.manage_notification(to_like_id, "liked")
        return res

    def __add_like(self, to_like_id):
        from_like_id = session['user_id']
        sql = '''INSERT INTO likes (from_like_fk, to_like_fk)
                             VALUES (%s, %s);'''
        record = (from_like_id, to_like_id)
        res = self.base_write(sql, record)
        return res


    def delete(self):
        sql = """DELETE from likes
                 WHERE from_like_fk = %s AND to_like_fk = %s"""
        to_like_id = request.json["to_dislike_id"]
        from_like_id = session['user_id']
        record = (from_like_id, to_like_id)
        res = self.base_write(sql, record)
        return res

