from app.resources.Common.Base import Base
from .ChatSocket import ChatSocket


class ChatId(Base):

    def get(self, chat_id):

        sql = """   SELECT m.creation_date, m.text, u.login as author
                    FROM messages as m
                    JOIN chat_messages cm USING (message_id)
                    JOIN users u ON u.user_id = m.author
                    WHERE cm.chat_id = %s
                    ;"""
        record = (chat_id,)
        messages = self.base_get_limited_all(sql, record)
        # todo: socket connect after sign in
        # ChatSocket.on_join(chat_id)
        return messages
