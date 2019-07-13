import os


class Database:
    DB_NAME = os.environ['POSTGRES_DB']
    DB_USER = os.environ['POSTGRES_USER']
    DB_PASS = os.environ['POSTGRES_PASSWORD']
    DB_HOST = 'postgres'
