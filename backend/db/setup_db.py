import psycopg2
from .connection import start_connection
from .models import Models

def start_db():
    try:
        connection, cursor = start_connection()

        cursor.execute(Models.users)
        connection.commit()
        print("Tables created successfully in PostgreSQL ")

        # # cur.execute("SELECT * FROM test")
        # # items = cur.fetchall()
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")

    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)
