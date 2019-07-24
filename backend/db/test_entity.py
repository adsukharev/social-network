import hashlib
import psycopg2
import psycopg2.extras
from database_config import Database


def start_connection():
    try:
        connection = psycopg2.connect(dbname=Database.DB_NAME,
                                      host=Database.DB_HOST,
                                      user=Database.DB_USER,
                                      password=Database.DB_PASS)
        cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        return connection, cursor

    except (Exception, psycopg2.Error):
        print(psycopg2.Error)
        return 0

def close_connection(connection, cursor):
    try:
        connection.commit()
        cursor.close()
        connection.close()
    except (Exception, psycopg2.Error):
        print(psycopg2.Error)

def to_hash(request_password):
    hash_object = hashlib.sha256(request_password.encode())
    token = hash_object.hexdigest()
    return token



test_user = """INSERT INTO users (email, login, password, user_name, token, status)
         VALUES ('mr.andrey.sd@gmail.com', 'testLogin', %s ,'Oleg', %s, '1');"""
password = to_hash('123Wertyq')
token = to_hash("asdsri38hd")
record = (password, token)

connection, cursor = start_connection()
cursor.execute(test_user, record)
print("Test user created")

close_connection(connection, cursor)

