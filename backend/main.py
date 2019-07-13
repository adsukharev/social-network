from db.setup_db import start_db
import app.views
from app.app import app

if __name__ == '__main__':
    app.run(host='0.0.0.0')
    start_db()


