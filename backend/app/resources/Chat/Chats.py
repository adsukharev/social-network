from app.resources.Common.Base import Base
from flask import session
from flask_jwt_extended import jwt_required


class Chats(Base):
    from_like = ''
    to_like = ''

    @jwt_required
    def get(self):
        user_id = session['user_id']
        sql = """   SELECT c.chat_name, c.chat_id
                    FROM chats as c
                    JOIN chat_users cu USING (chat_id)
                    WHERE cu.user_id = %s
                    ;"""
        record = (user_id,)
        chats = self.base_get_limited_all(sql, record)
        return chats

    def manage_chat(self, from_like_id, to_like_id):
        self.from_like = from_like_id
        self.to_like = to_like_id
        user = self.__check_likes_to_create_chat()
        if not user:
            return "ok"
        chatid = self.__create_chat(user['login'])
        if chatid == 'error':
            return chatid
        res = self.__add_row_to_chat_users_db(chatid)
        return res

    def __add_row_to_chat_users_db(self, chatid):
        sql = '''INSERT INTO chat_users (chat_id, user_id)
                 VALUES (%s, %s);'''
        record_from = (chatid, self.from_like)
        record_to = (chatid, self.to_like)
        if not self.base_write(sql, record_from):
            return 'error'
        if not self.base_write(sql, record_to):
            return 'error'
        return 'ok'

    def __create_chat(self, login2):
        login1 = session['login']
        chat_name = login1 + '+' + login2
        sql = '''INSERT INTO chats (chat_name)
                 VALUES (%s);'''
        record = (chat_name,)
        if not self.base_write(sql, record):
            return 'error'
        chat = self.__get_chatId(chat_name)
        if not chat:
            return 'error'
        return chat['chat_id']

    def __get_chatId(self, chat_name):
        sql = "SELECT chat_id FROM chats WHERE chat_name = %s;"
        record = (chat_name,)
        chat = self.base_get_one(sql, record)
        return chat

    def __check_likes_to_create_chat(self):
        to_like_inverse = self.from_like
        from_like_inverse = self.to_like
        sql = """   SELECT login
                    FROM users u
                    JOIN likes l ON l.from_like_fk = u.user_id
                    WHERE from_like_fk = %s AND to_like_fk = %s
                    ;"""
        record = (from_like_inverse, to_like_inverse)
        user = self.base_get_one(sql, record)
        return user

    def manage_chat_to_delete(self, from_like_id, to_like_id):
        self.from_like = from_like_id
        self.to_like = to_like_id
        chat_id = self.__check_chat_if_exists()
        if not chat_id:
            return False
        res = self.__delete_chat(chat_id)
        return res

    def __check_chat_if_exists(self):
        sql = """   SELECT chat_id
                    FROM chat_users cu
                    WHERE user_id = %s or user_id = %s
                    GROUP BY chat_id
                    HAVING count(user_id) > 1;
                    ;"""
        record = (self.from_like, self.to_like)
        chat = self.base_get_one(sql, record)
        if not chat:
            return False
        return chat['chat_id']

    def __delete_chat(self, chat_id):
        sql = """   DELETE from chats
                    WHERE chat_id = %s;"""
        record = (chat_id,)
        res = self.base_write(sql, record)
        return res