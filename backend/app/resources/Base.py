from flask_restful import Resource
import psycopg2
from db.connection import start_connection, close_connection


class Base(Resource):

    def base_get_one(self, sql, record):
        try:
            connection, cursor = start_connection()
            cursor.execute(sql, record)
            items = cursor.fetchone()
            close_connection(connection, cursor)
            return items

        except (Exception, psycopg2.Error):
            print("Base_getOne", psycopg2.Error)

    def base_get_all(self, sql):
        try:
            connection, cursor = start_connection()
            cursor.execute(sql)
            items = cursor.fetchall()
            close_connection(connection, cursor)
            return items

        except (Exception, psycopg2.Error):
            print("Base_get_all",psycopg2.Error)

    def base_get_limited_all(self, sql, record):
        try:
            connection, cursor = start_connection()
            cursor.execute(sql, record)
            items = cursor.fetchone()
            close_connection(connection, cursor)
            return items

        except (Exception, psycopg2.Error):
            print(psycopg2.Error)

    def base_post(self, sql, record):
        try:
            connection, cursor = start_connection()
            cursor.execute(sql, record)
            close_connection(connection, cursor)
            return 1

        except (Exception, psycopg2.Error):
            print(psycopg2.Error)
            return 0

    def base_put(self, sql, record):
        try:
            connection, cursor = start_connection()
            cursor.execute(sql, record)
            close_connection(connection, cursor)
            return 1

        except (Exception, psycopg2.Error):
            print(psycopg2.Error)
            return 0

    def base_delete(self, sql, record):
        try:
            connection, cursor = start_connection()
            cursor.execute(sql, record)
            close_connection(connection, cursor)
            return 1

        except (Exception, psycopg2.Error):
            print(psycopg2.Error)
            return 0