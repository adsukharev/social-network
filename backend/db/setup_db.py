from .connection import start_connection
from .models import Models
import time

def start_db_with_docker():
    dbstatus = True
    while dbstatus:
        try:
            start_db()
            dbstatus = False
        except:
            print("Waiting for connection to Postgres Container")
            time.sleep(2)


def start_db():
        connection, cursor = start_connection()
        # add tables
        cursor.execute(Models.tags)
        cursor.execute(Models.users)
        cursor.execute(Models.users_tags)
        cursor.execute(Models.history)
        cursor.execute(Models.likes)
        cursor.execute(Models.rating)
        cursor.execute(Models.messages)
        cursor.execute(Models.chats)
        cursor.execute(Models.chat_users)
        cursor.execute(Models.chat_messages)

        connection.commit()
        print("Tables created successfully in PostgreSQL ")
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")


# def insert_data():
#     print('Insertions started')
#     connection, cursor = start_connection()
#     cursor.execute(Models.insert_user1, Models.record_insert_user1)
#     cursor.execute(Models.insert_user2, Models.record_insert_user2)
#     cursor.execute(Models.insert_tag1, Models.record_insert_tags1)
#     cursor.execute(Models.insert_tag2, Models.record_insert_tags2)
#     cursor.execute(Models.insert_tag3, Models.record_insert_tags3)
#     cursor.execute(Models.insert_common, Models.record_insert_common1)
#     cursor.execute(Models.insert_common2,  Models.record_insert_common2)
#     connection.commit()
#     count = cursor.rowcount
#     print(count, ": inserted  successfully in PostgreSQL ")
#     cursor.close()
#     connection.close()
