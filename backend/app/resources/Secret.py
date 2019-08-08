from app.resources.Common.Base import Base
from flask_jwt_extended import jwt_required


class SecretResource(Base):
    @jwt_required
    def get(self):
        return {
            'answer': "42"
        }
