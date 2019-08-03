from flask import Blueprint, Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_socketio import SocketIO
from .config import Config, mail_settings

from app.resources.Users.Users import Users
from app.resources.Users.UserId import UserId
from app.resources.Users.UserLogin import UserLogin
from app.resources.Profile.History import History
from app.resources.Profile.Likes import Likes
from app.resources.Profile.Tags import Tags
from app.resources.Profile.Images import Images
from .resources.loginPage.SignUp import SignUp
from .resources.loginPage.SignIn import SignIn
from .resources.Rating import Rating
from .resources.Search import Search
from .resources.Profile.Fake import Fake
from .resources.Chat import Chat
from .resources.Secret import SecretResource

#api
api_bp = Blueprint('api', __name__)
api = Api(api_bp)

#app
app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(api_bp, url_prefix='/api')
app.config.update(mail_settings)
# app.secret_key = b'dude this is a terrible key'
CORS(app)
# app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)
socketio = SocketIO(app)

# Route
api.add_resource(SignUp, '/sign_up')
api.add_resource(SignIn, '/sign_in')
api.add_resource(Users, '/users')
api.add_resource(UserId, '/users/<user_id>')
api.add_resource(UserLogin, '/user_login/<login>')
api.add_resource(History, '/history/<to_history_id>')
api.add_resource(Likes, '/likes/<to_like_id>')
api.add_resource(Images, '/images/<image_id>')
api.add_resource(Rating, '/rating')
api.add_resource(Tags, '/tags')
api.add_resource(Search, '/search')
api.add_resource(Fake, '/fake/<user_id>')

api.add_resource(SecretResource, '/secret')

# chat
socketio.on_namespace(Chat('/chat'))
