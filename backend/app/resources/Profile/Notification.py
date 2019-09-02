from app.resources.Chat.ChatSocket import ChatSocket
from flask import session


class Notification:

    @staticmethod
    def send_notification(partner_id, typeNotif):
        socket = ChatSocket()
        data = {
            'type': typeNotif,
            'author': session['login'],
            'partner_id': partner_id
        }
        socket.manage_notification(data)