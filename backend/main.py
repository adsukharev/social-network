from db.setup_db import start_db_with_docker
import time
from app.app import app

# def create_app():
#     app = Flask(__name__)
#     app.config.from_object(Config)
#     from app.app import api_bp
#     app.register_blueprint(api_bp, url_prefix='/api')
#     return app


if __name__ == "__main__":
    time.sleep(2)
    start_db_with_docker()
    app.run(host='0.0.0.0')

