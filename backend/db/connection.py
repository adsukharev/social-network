import psycopg2
from .database_config import Database

def start_connection():
    try:
        connection = psycopg2.connect(dbname=Database.DB_NAME,
                                      host=Database.DB_HOST,
                                      user=Database.DB_USER,
                                      password=Database.DB_PASS)
        cursor = connection.cursor()
        return connection, cursor

    except (Exception, psycopg2.Error):
        return 0