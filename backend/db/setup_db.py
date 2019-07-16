from .connection import start_connection
from .models import Models
import time

def start_db_with_docker():
    dbstatus = True
    while dbstatus:
        try:
            start_db()
            dbstatus = False
            insert_data()
        except:
            print("Waiting for connection to Postgres Container")
            time.sleep(2)


def start_db():

        connection, cursor = start_connection()

        cursor.execute(Models.tags)
        cursor.execute(Models.users)
        cursor.execute(Models.users_tags)
        connection.commit()
        print("Tables created successfully in PostgreSQL ")
        # # cur.execute("SELECT * FROM test")
        # # items = cur.fetchall()
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")


def insert_data():
    print('Insertions started')
    connection, cursor = start_connection()
    SQL = "INSERT INTO users (login) VALUES (%s);"  # Note: no quotes
    data = ("O'Reilly",)
    cursor.execute(SQL, data)
    # cursor.execute(Models.insert_user1, Models.record_insert_user1)
    connection.commit()
    count = cursor.rowcount
    print(count, ": inserted  successfully in PostgreSQL ")
    cursor.close()
    connection.close()
    # delete
    # cursor.execute(Models.insert_user2)
    # cursor.execute(Models.insert_tag1)
    # cursor.execute(Models.insert_tag2)
    # cursor.execute(Models.insert_tag3)
    # cursor.execute(Models.insert_common)
    # cursor.execute(Models.insert_common2)
