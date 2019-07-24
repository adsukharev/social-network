from flask import Blueprint, Flask
from flask_restful import Api
# from .config import Config
from .config import Config, mail_settings

from .resources.Users import Users
from .resources.UserId import UserId
from .resources.History import History
from .resources.Likes import Likes
from .resources.loginPage.SignUp import SignUp
from .resources.loginPage.SignIn import SignIn

#api
api_bp = Blueprint('api', __name__)
api = Api(api_bp)

#app
app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(api_bp, url_prefix='/api')
app.config.update(mail_settings)
# app.secret_key = b'dude this is a terrible key'

# Route
api.add_resource(SignUp, '/sign_up')
api.add_resource(SignIn, '/sign_in')
api.add_resource(Users, '/users')
api.add_resource(UserId, '/users/<user_id>')
api.add_resource(History, '/history')
api.add_resource(Likes, '/likes')