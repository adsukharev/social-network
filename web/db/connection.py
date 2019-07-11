import psycopg2
import sys
sys.path.append('../')
from app.config import Database

# sys.path.append('/path/to/application/app/folder')
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