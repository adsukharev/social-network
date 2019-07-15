from flask_restful import Resource
import psycopg2
from db.connection import start_connection


class Base(Resource):
    def base_get(self, sql):
        try:
            connection, cursor = start_connection()
            cursor = connection.cursor()
            cursor.execute(sql)
            items = cursor.fetchall()
            connection.commit()
            cursor.close()
            connection.close()
            return items

        except (Exception, psycopg2.Error):
            print(psycopg2.Error)
            exit()

    def base_post(self, sql):
        try:
            connection, cursor = start_connection()
            cursor = connection.cursor()
            cursor.execute(sql)
            users = cursor.fetchall()
            connection.commit()
            cursor.close()
            connection.close()
            return users

        except (Exception, psycopg2.Error):
            print(psycopg2.Error)
            exit()