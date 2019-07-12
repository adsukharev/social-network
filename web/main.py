from app.app import app
import app.views
from db.setup_db import start_db

from flask import Flask
if __name__ == '__main__':
    app.run(host='0.0.0.0')
    start_db()


