from app.resources.Common.Base import Base
from flask import session
from app.resources.Rating import Rating
from app.resources.Chat.Chats import Chats
from flask_jwt_extended import jwt_required
from .Notification import Notification


class Likes(Base):

    @jwt_required
    def post(self, to_like_id):
        checker = self.__check_avatar()
        if checker != 'ok':
            return checker
        if self.__add_like(to_like_id) == "error":
            return "add_like error"
        # increase like in rating
        rating = Rating()
        res = rating.inc_like(to_like_id)
        # Notification.send_notification(to_like_id, 'like')
        return res

    def __add_like(self, to_like_id):
        from_like_id = session['user_id']
        sql = '''INSERT INTO likes (from_like_fk, to_like_fk)
                             VALUES (%s, %s);'''
        record = (from_like_id, to_like_id)
        res = self.base_write(sql, record)
        if res == "error":
            return res
        chat = Chats()
        res = chat.manage_chat(from_like_id, to_like_id)
        return res

    @jwt_required
    def delete(self, to_like_id):
        checker = self.__check_avatar()
        if checker != 'ok':
            return checker
        if self.__delete_like(to_like_id) == "error":
            return "delete like error"
        rating = Rating()
        rating.decrease_like(to_like_id)
        chat_obj = Chats()
        from_like_id = session['user_id']
        res = chat_obj.manage_chat_to_delete(from_like_id, to_like_id)
        # Notification.send_notification(to_like_id, 'like')
        return res

    def __delete_like(self, to_like_id):
        sql = """DELETE from likes
                 WHERE from_like_fk = %s AND to_like_fk = %s;"""
        from_like_id = session['user_id']
        record = (from_like_id, to_like_id)
        res = self.base_write(sql, record)
        return res

    def __check_avatar(self):
        user_id = session['user_id']
        sql = '''SELECT avatar FROM users
                 WHERE user_id = %s
                ;'''
        record = (user_id,)
        user = self.base_get_one(sql, record)
        if not user['avatar']:
            return "You can't like or dislike because you don't have avatar"
        return 'ok'
