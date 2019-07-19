from flask import Blueprint
from flask_restful import Api
from .resources.Users import Users
from .resources.UserId import UserId
from .resources.History import History
from .resources.Likes import Likes


api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# Route
api.add_resource(Users, '/users')
api.add_resource(UserId, '/users/<user_id>')
api.add_resource(History, '/history')
api.add_resource(Likes, '/likes')