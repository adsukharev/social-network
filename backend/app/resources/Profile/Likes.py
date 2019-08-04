from app.resources.Common.Base import Base
from flask import session
from app.resources.Rating import Rating
from app.resources.Chat.Chat import Chat


class Likes(Base):

    def post(self, to_like_id):
        if self.__add_like(to_like_id) == "error":
            return "add_like error"
        # increase like in rating
        rating = Rating()
        res = rating.inc_like(to_like_id)
        return res

    def __add_like(self, to_like_id):
        from_like_id = session['user_id']
        sql = '''INSERT INTO likes (from_like_fk, to_like_fk)
                             VALUES (%s, %s);'''
        record = (from_like_id, to_like_id)
        res = self.base_write(sql, record)
        if res == "error":
            return res
        chat = Chat()
        res = chat.manage_chat(from_like_id, to_like_id)
        return res

    def delete(self, to_like_id):
        if self.__delete_like(to_like_id) == "error":
            return "delete like error"
        rating = Rating()
        res = rating.decrease_like(to_like_id)
        return res

    def __delete_like(self, to_like_id):
        sql = """DELETE from likes
                 WHERE from_like_fk = %s AND to_like_fk = %s"""
        from_like_id = session['user_id']
        record = (from_like_id, to_like_id)
        res = self.base_write(sql, record)
        return res

