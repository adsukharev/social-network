# import psycopg2
# from .connection import start_connection
#
# def start_db():
#     try:
#         connection, cursor = start_connection()
#         create_table_query = '''
#             CREATE TABLE IF NOT EXISTS users(
#             id              SERIAL          NOT NULL PRIMARY KEY,
#             email           VARCHAR(30)     NOT NULL,
#             login           VARCHAR(30)     NOT NULL,
#             pass            VARCHAR(30)     NOT NULL,
#             name            VARCHAR(30)     NOT NULL,
#             surname         VARCHAR(30)     NOT NULL,
#             age             SMALLINT,
#             sex             VARCHAR(5),
#             preferences     VARCHAR(18) DEFAULT 'bisexual',
#             avatar          VARCHAR(1024),
#             location        VARCHAR(30),
#             tags            VARCHAR(30),
#             token           VARCHAR(1024)   NOT NULL,
#             status        BOOLEAN         NOT NULL DEFAULT '0',
#             notification    BOOLEAN         NOT NULL DEFAULT '1'
#             );'''
#
#         cursor.execute(create_table_query)
#         connection.commit()
#         print("Table created successfully in PostgreSQL ")
#
#         # # cur.execute("SELECT * FROM test")
#         # # items = cur.fetchall()
#         cursor.close()
#         connection.close()
#         print("PostgreSQL connection is closed")
#
#     except (Exception, psycopg2.Error) as error:
#         print("Error while connecting to PostgreSQL", error)
#
#
