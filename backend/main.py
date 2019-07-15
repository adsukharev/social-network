from db.setup_db import start_db
from flask import Flask


def create_app():
    app = Flask(__name__)

    from app.app import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    start_db()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host='0.0.0.0')
