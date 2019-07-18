from flask import Blueprint
from flask_restful import Api
from .resources.Users import Users
from .resources.UserId import UserId

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# Route
api.add_resource(Users, '/users')
api.add_resource(UserId, '/users/<user_id>')
