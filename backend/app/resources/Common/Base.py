from flask_restful import Resource
import psycopg2.errors
from db.connection import start_connection, close_connection


class Base(Resource):

    def base_get_one(self, sql, record):
        try:
            connection, cursor = start_connection()
            cursor.execute(sql, record)
            items = cursor.fetchone()
            close_connection(connection, cursor)
            return items
        except Exception as e:
            print(e)

    def base_get_all(self, sql):
        try:
            connection, cursor = start_connection()
            cursor.execute(sql)
            items = cursor.fetchall()
            close_connection(connection, cursor)
            return items
        except Exception as e:
            print(e)

    def base_get_limited_all(self, sql, record):
        try:
            connection, cursor = start_connection()
            cursor.execute(sql, record)
            items = cursor.fetchall()
            close_connection(connection, cursor)
            return items
        except Exception as e:
            print(e)

    def base_write(self, sql, record):
        try:
            connection, cursor = start_connection()
            cursor.execute(sql, record)
            close_connection(connection, cursor)
            return "ok"
        except Exception as e:
            print(e)
            return "error"

    def base_write_many(self, sql, record):
        try:
            connection, cursor = start_connection()
            cursor.executemany(sql, record)
            close_connection(connection, cursor)
            return "ok"
        except Exception as e:
            print(e)
            return "error"
