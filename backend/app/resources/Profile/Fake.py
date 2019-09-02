from app.resources.Common.Base import Base
from flask_jwt_extended import jwt_required
from .Notification import Notification


class Fake(Base):

    @jwt_required
    def post(self, user_id):
        sql = "UPDATE users SET fake = '1' WHERE user_id =%s"
        record = (user_id,)
        res = self.base_write(sql, record)
        # Notification.send_notification(user_id, 'fake')
        return res
