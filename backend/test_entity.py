import hashlib
import psycopg2
import psycopg2.extras
from flask import session
from app.app import app
from db.database_config import Database
from db.connection import start_connection, close_connection
from app.resources.Common.UsersCommon import UsersCommon
from app.resources.Profile.Likes import Likes
from app.resources.Profile.History import History
from app.resources.Profile.Tags import Tags
from app.resources.Rating import Rating
# from app.resources.Users.UserId import UserId


password = UsersCommon.to_hash('123Wertyq')
users = [
    {
        'email': "test1@mail.ru",
        'login': 'test1',
        'password': password,
        'user_name': 'Oleg',
        'age': 28,
        'sex': 'male',
        'preferences': 'getero',
        'avatar': ['pic1.png'],
        'latitude': 55.7116423,
        'longitude': 37.738213,
        'status': '1',
        'tags': ['sport', 'computer', 'pool'],
        'sumlikes': 5
    },
    {
        'email': "test2@mail.ru",
        'login': 'test2',
        'password': password,
        'user_name': 'Slava',
        'age': 36,
        'sex': 'male',
        'preferences': 'getero',
        'avatar': ['pic2.png'],
        'latitude': 55.7116423,
        'longitude': 37.738213,
        'status': '1',
        'tags': ['sport', 'chess', 'pascal'],
        'sumlikes': 7
    },
    {
        'email': "test3@mail.ru",
        'login': 'test3',
        'password': password,
        'user_name': 'Kolya',
        'age': 25,
        'sex': 'male',
        'preferences': 'gomo',
        'avatar': ['pic3.png'],
        'latitude': 55.7116423,
        'longitude': 37.738213,
        'status': '1',
        'tags': ['gays', 'yoga', 'makeup'],
        'sumlikes': 2
    },
    {
        'email': "test4@mail.ru",
        'login': 'test4',
        'password': password,
        'user_name': 'Dima',
        'age': 18,
        'sex': 'male',
        'preferences': 'gomo',
        'avatar': ['pic4.png'],
        'latitude': 55.7116423,
        'longitude': 37.738213,
        'status': '1',
        'tags': ['chess', 'yoga', 'pascal'],
        'sumlikes': 14
    },
    {
        'email': "test5@mail.ru",
        'login': 'test5',
        'password': password,
        'user_name': 'Vasya',
        'age': 22,
        'sex': 'male',
        'preferences': 'bisexual',
        'avatar': ['pic5.png'],
        'latitude': 55.7116423,
        'longitude': 37.738213,
        'status': '1',
        'tags': ['computer', 'trip', 'yoga'],
        'sumlikes': 4
    },
    {
        'email': "test6@mail.ru",
        'login': 'test6',
        'password': password,
        'user_name': 'Petr',
        'age': 33,
        'sex': 'male',
        'preferences': 'bisexual',
        'avatar': ['pic6.png'],
        'latitude': 55.7116423,
        'longitude': 37.738213,
        'status': '1',
        'tags': ['sport', 'chess', 'pascal'],
        'sumlikes': 10
    },
    {
        'email': "test7@mail.ru",
        'login': 'test7',
        'password': password,
        'user_name': 'Olesya',
        'age': 25,
        'sex': 'female',
        'preferences': 'getero',
        'avatar': ['pic7.png'],
        'latitude': 55.7116423,
        'longitude': 37.738213,
        'status': '1',
        'tags': ['trip', 'makeup', 'computer'],
        'sumlikes': 7
    },
    {
        'email': "test8@mail.ru",
        'login': 'test8',
        'password': password,
        'user_name': 'Katya',
        'age': 18,
        'sex': 'female',
        'preferences': 'getero',
        'avatar': ['pic8.png'],
        'latitude': 55.7116423,
        'longitude': 37.738213,
        'status': '1',
        'tags': ['sport', 'makeup', 'pool'],
        'sumlikes': 3
    },
    {
        'email': "test9@mail.ru",
        'login': 'test9',
        'password': password,
        'user_name': 'Lena',
        'age': 21,
        'sex': 'female',
        'preferences': 'gomo',
        'avatar': ['pic9.png'],
        'latitude': 55.7116423,
        'longitude': 37.738213,
        'status': '1',
        'tags': ['gays', 'pool', 'computer'],
        'sumlikes': 11
    },
    {
        'email': "test10@mail.ru",
        'login': 'test10',
        'password': password,
        'user_name': 'Masha',
        'age': 26,
        'sex': 'female',
        'preferences': 'gomo',
        'avatar': ['pic10.png'],
        'latitude': 55.7116423,
        'longitude': 37.738213,
        'status': '1',
        'tags': ['pascal', 'yoga', 'sport'],
        'sumlikes': 0
    },
    {
        'email': "test11@mail.ru",
        'login': 'test11',
        'password': password,
        'user_name': 'Oksana',
        'age': 30,
        'sex': 'female',
        'preferences': 'bisexual',
        'avatar': ['pic11.png'],
        'latitude': 55.7116423,
        'longitude': 37.738213,
        'status': '1',
        'tags': ['trip', 'yoga', 'pool'],
        'sumlikes': 6
    },
    {
        'email': "test12@mail.ru",
        'login': 'test12',
        'password': password,
        'user_name': 'Nastya',
        'age': 24,
        'sex': 'female',
        'preferences': 'bisexual',
        'avatar': ['pic12.png'],
        'latitude': 55.7116423,
        'longitude': 37.738213,
        'status': '1',
        'tags': ['makeup', 'computer', 'chess'],
        'sumlikes': 13
    }

]


def create_user(user):
    sql = """INSERT INTO   users (email, login, password, user_name, age, sex,
                                    preferences, avatar, latitude, longitude, status)
                     VALUES (%s, %s, %s , %s, %s, %s, %s, %s , %s, %s, %s)
                    ;"""
    record = (user['email'], user['login'], user['password'], user['user_name'], user['age'], user['sex'],
              user['preferences'], user['avatar'], user['latitude'], user['longitude'], user['status'])
    cursor.execute(sql, record)
    connection.commit()


def create_rating(user_id):
    rating = Rating()
    rating.create_user(user_id)


def create_like(sumlikes, user_id):
    rating = Rating()
    for i in range(sumlikes):
        rating.inc_like(user_id)


def create_history(user_id):
    history = History()
    history.post(user_id)


def create_tags(user, user_id):
    tags = Tags()
    tags.manage_tags(user['tags'], user_id)


i = 0
connection, cursor = start_connection()
try:
    for user in users:
        i += 1
        create_user(user)
        create_rating(i)
        create_tags(user, i)
        create_like(user['sumlikes'], i)


except Exception as e:
    print(e)
finally:
    close_connection(connection, cursor)
