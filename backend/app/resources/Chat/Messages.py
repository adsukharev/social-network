from app.resources.Common.Base import Base
from flask import session
from time import gmtime, strftime


class Messages(Base):

    creation_date = ''

    # def __init__(self):
    #     self.creation_date = strftime("%Y-%m-%d %H:%M:%S", gmtime())

    def handle_message(self, message):
        text = message['text']
        chat_id = message['chat_id']
        author = session['user_id']
        self.creation_date = message['creation_date']
        if not self.__add_message(text, author):
            return 'error'
        message_id = self.__get_message_id(author)
        if not self.__add_chat_messages(chat_id, message_id):
            return 'error'
        return 'ok'

    def __add_chat_messages(self, chat_id, message_id):
        sql = '''   INSERT INTO chat_messages (chat_id, message_id)
                    VALUES (%s, %s);'''
        record = (chat_id, message_id)
        res = self.base_write(sql, record)
        return res

    def __add_message(self, text, author):
        sql = '''   INSERT INTO messages (creation_date, text, author)
                    VALUES (%s, %s, %s);'''
        record = (self.creation_date, text, author)
        res = self.base_write(sql, record)
        return res

    def __get_message_id(self, author):
        sql = "SELECT message_id FROM messages WHERE creation_date = %s AND author = %s;"
        record = (self.creation_date, author)
        message_id = self.base_get_one(sql, record)
        return message_id['message_id']
