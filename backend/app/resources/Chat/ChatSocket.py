from flask_socketio import Namespace, emit, send, join_room, leave_room, close_room, rooms, disconnect
from flask import session, request
# from time import gmtime, strftime
from app.resources.Common.Base import Base
from .Messages import Messages


class ChatSocket(Namespace, Base):
    self_room = ''

    def on_connect(self):
        try:
            if session.get('user_id'):
                user_id = session['user_id']
                print('user_id connect: ', user_id)
                sql = "UPDATE users SET room = %s, online = 'online' WHERE user_id = %s;"
                self.self_room = request.sid
                record = (self.self_room, user_id)
                self.base_write(sql, record)
                print("connected: ", request.sid)
            else:
                print("else connect", session)
        except Exception as e:
            print(e)

    def on_connect_logged_user(self, user_id):
        try:
            session['user_id'] = user_id
            print('user_id connect: ', user_id)
            sql = "UPDATE users SET room = %s, online = 'online' WHERE user_id = %s;"
            self.self_room = request.sid
            record = (self.self_room, user_id)
            self.base_write(sql, record)
            print("connected: ", request.sid)

        except Exception as e:
            print(e)

    def on_disconnect(self):
        try:

            # online = strftime("%Y-%m-%d %H:%M:%S", gmtime())
            # sql = "UPDATE users SET online = %s WHERE user_id = %s;"
            # record = (online, user_id)
            # res = self.base_write(sql, record)
            print('disconnected', request.sid, session)
        except Exception as e:
            print("disconnect: ", e)

    # def on_disconnect_session(self):
    #     try:
    #         print('start disconnect', request.sid, session)
    #         user_id = session['user_id']
    #         session['login'] = ''
    #         session['user_id'] = ''
    #         online = strftime("%Y-%m-%d %H:%M:%S", gmtime())
    #         sql = "UPDATE users SET online = %s WHERE user_id = %s;"
    #         record = (online, user_id)
    #         res = self.base_write(sql, record)
    #         print('disconnected', request.sid, session)
    #     except Exception as e:
    #         print("disconnect: ", e)

    def on_join(self, room):
        join_room(room)
        print(rooms())
        print('self', self.self_room)
        # self.on_leave(room)
        print("join: ", room)
        print(rooms())

    # def on_leave(self, joined_room):
    #     for room in rooms():
    #         if room != joined_room and len(room) < 10:
    #             leave_room(room)

    def on_message(self, data):
        message_obj = Messages()
        res = message_obj.handle_message(data)
        if res == 'error':
            return res
        room = data['chat_id']
        data['type'] = 'message'
        self.on_manage_notification(data)
        print("sent to room:", room)
        emit('receive_message', data, room=room)

    def on_manage_notification(self, data):

        partner_room = self.__get_partner_room(data['partner_id'])
        if partner_room is None:
            return
        message = self.__create_notification(data)
        emit('notification', message, room=partner_room)

    def __create_notification(self, data):
        if data['type'] == 'message':
            return data['author'] + ': ' + data['text']
        elif data['type'] == 'like':
            return data['author'] + ' liked you'
        elif data['type'] == 'dislike':
            return data['author'] + ' disliked you'
        elif data['type'] == 'history':
            return data['author'] + ' has visited your profile'
        elif data['type'] == 'fake':
            return 'You are blocked'

    def __get_partner_room(self, partner_id):
        sql = """SELECT room
                FROM users
                WHERE user_id = %s;"""
        record = (partner_id,)
        room_obj = self.base_get_one(sql, record)
        return room_obj['room']
