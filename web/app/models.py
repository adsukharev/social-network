import psycopg2

con = psycopg2.connect('dbname='testdb' user='postgres' host='localhost' password='my_password')
cur = con.cursor()
cur.execute("CREATE TABLE test(id serial PRIMARY KEY, name varchar, email varchar)")
cur.execute("SELECT * FROM test")
items = cur.fetchall()
con.commit()
cur.close()
con.close()