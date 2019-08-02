import psycopg2
import psycopg2.extras
from .database_config import Database


def start_connection():
    try:
        connection = psycopg2.connect(dbname=Database.DB_NAME,
                                      host=Database.DB_HOST,
                                      user=Database.DB_USER,
                                      password=Database.DB_PASS)
        cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        return connection, cursor

    except Exception as e:
        print(e)
        return 0


def close_connection(connection, cursor):
    try:
        connection.commit()
        cursor.close()
        connection.close()
    except Exception as e:
        print(e)
