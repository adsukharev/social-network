# from web.app.app import app
# import views
# from db.setup_db import start_db

from flask import Flask
#

class Config:
    DEBUG = True

app = Flask(__name__)
app.config.from_object(Config)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
    # start_db()


