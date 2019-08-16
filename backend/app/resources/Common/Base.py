from flask_restful import Resource
import psycopg2.errors
from db.connection import start_connection, close_connection


class Base(Resource):

    @staticmethod
    def base_get_one(sql, record):
        try:
            connection, cursor = start_connection()
            cursor.execute(sql, record)
            items = cursor.fetchone()
            close_connection(connection, cursor)
            return items
        except Exception as e:
            print(e)

    @staticmethod
    def base_get_all(sql):
        try:
            connection, cursor = start_connection()
            cursor.execute(sql)
            items = cursor.fetchall()
            close_connection(connection, cursor)
            return items
        except Exception as e:
            print(e)

    @staticmethod
    def base_get_limited_all(sql, record):
        try:
            connection, cursor = start_connection()
            cursor.execute(sql, record)
            items = cursor.fetchall()
            close_connection(connection, cursor)
            return items
        except Exception as e:
            print(e)

    @staticmethod
    def base_write(sql, record):
        try:
            connection, cursor = start_connection()
            cursor.execute(sql, record)
            close_connection(connection, cursor)
            return "ok"
        except Exception as e:
            print(e)
            return "error"

    @staticmethod
    def base_write_many(sql, record):
        try:
            connection, cursor = start_connection()
            cursor.executemany(sql, record)
            close_connection(connection, cursor)
            return "ok"
        except Exception as e:
            print(e)
            return "error"
