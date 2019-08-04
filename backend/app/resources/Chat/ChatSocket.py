from flask_socketio import Namespace, emit, send, join_room, leave_room, close_room, rooms, disconnect
from flask import session, request


class ChatSocket(Namespace):

    def on_connect(self):
        print("connected: ", request.sid)
        # data = {'data': 'connected'}
        # emit('connection_response', data)

    def on_disconnect(self):
        print('diconnect', request.sid)

    def on_join(self, data):
        username = data['user_name']
        room = data['room']
        join_room(room)
        print("join: ", room)
        send(username + ' has entered the chat.', room=room)

    def on_leave(self, data):
        username = data['username']
        room = data['room']
        leave_room(room)
        print("leave: ", room)
        send(username + ' has left the chat.', room=room)

    def on_message(self, data):
        print("message: ", data)
        room = data['room']
        print(rooms())
        emit('my_response', data, room=room)
