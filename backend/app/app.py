from flask import Blueprint, Flask, render_template
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_socketio import SocketIO
from .config import Config, mail_settings
import os

from app.resources.Common.Base import Base
from app.resources.Users.Users import Users
from app.resources.Users.UserId import UserId
from app.resources.Users.UserLogin import UserLogin
from app.resources.Profile.History import History
from app.resources.Profile.Likes import Likes
from app.resources.Profile.Tags import Tags
from app.resources.Profile.Images import Images
from .resources.loginPage.SignUp import SignUp
from .resources.loginPage.SignIn import SignIn
from .resources.loginPage.LogOut import LogOut
from .resources.loginPage.OAuthFB import OAuthFB
from .resources.Rating import Rating
from .resources.Search import Search
from .resources.Profile.Fake import Fake
from app.resources.Chat.Chats import Chats
from app.resources.Chat.ChatId import ChatId
from app.resources.Chat.ChatSocket import ChatSocket
from .resources.Secret import SecretResource

#api
api_bp = Blueprint('api', __name__)
api = Api(api_bp)

#app
template_dir = os.path.abspath('front_test')
app = Flask(__name__, template_folder=template_dir)
app.config.from_object(Config)
app.register_blueprint(api_bp, url_prefix='/api')
app.config.update(mail_settings)
CORS(app, resources={r"/*": {"origins": "*"}}, headers=['Content-Type'], expose_headers=['Access-Control-Allow-Origin'], supports_credentials=True)
jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins='*', cors_credentials=True)

# Route
api.add_resource(SignUp, '/signup')
api.add_resource(SignIn, '/signin')
api.add_resource(LogOut, '/logout')
api.add_resource(OAuthFB, '/oauth')
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
api.add_resource(Chats, '/chats')
api.add_resource(ChatId, '/chats/<chat_id>')

api.add_resource(SecretResource, '/secret')

# chat
socketio.on_namespace(ChatSocket('/api/socket'))

# token revoke
@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    sql = "SELECT token FROM token_revokes WHERE token = %s;"
    record = (jti,)
    token = Base.base_get_one(sql, record)
    if not token:
        return False
    return True


# @app.route('/chat')
# def socket():
#     return render_template('socket.html')
#
#
# @app.route('/chats')
# def chats():
#     return render_template('chats.html')
#
#
# @app.route('/')
# def login():
#     return render_template('login.html')
