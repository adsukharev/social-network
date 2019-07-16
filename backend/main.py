from db.setup_db import start_db_with_docker
from flask import Flask
from app.config import Config


def create_app():

    app = Flask(__name__)
    app.config.from_object(Config)
    from app.app import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')
    return app


if __name__ == "__main__":
    start_db_with_docker()
    app = create_app()
    app.run(host='0.0.0.0')

