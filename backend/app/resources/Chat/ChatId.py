from app.resources.Common.Base import Base
from flask_jwt_extended import jwt_required
from flask import session


class ChatId(Base):

    @jwt_required
    def get(self, chat_id):

        messages = self.__get_messages(chat_id)
        partner_id = self.__get_partner_id(chat_id)
        data = {
            'messages': messages,
            'partner_id': partner_id
        }
        return data

    def __get_messages(self, chat_id):
        sql = """   SELECT m.creation_date, m.text, u.login as author
                            FROM messages as m
                            JOIN chat_messages cm USING (message_id)
                            JOIN users u ON u.user_id = m.author
                            WHERE cm.chat_id = %s
                            ;"""
        record = (chat_id,)
        messages = self.base_get_limited_all(sql, record)
        return messages

    def __get_partner_id(self, chat_id):
        sql = """   SELECT user_id
                    FROM chat_users
                    WHERE chat_id = %s
                                    ;"""
        record = (chat_id,)
        users_id = self.base_get_limited_all(sql, record)
        if session['user_id'] != users_id[0]['user_id']:
            return users_id[0]['user_id']
        return users_id[1]['user_id']
