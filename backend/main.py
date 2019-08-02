from db.setup_db import start_db_with_docker
import time
from app.app import app


if __name__ == "__main__":
    time.sleep(2)
    start_db_with_docker()
    app.run(host='0.0.0.0')

