from .Base import Base


class UsersCommon(Base):

    @staticmethod
    def to_hash(request_password):
        import hashlib
        hash_object = hashlib.sha256(request_password.encode())
        token = hash_object.hexdigest()
        return token
    #
    # def get_user(self):
    #     sql = "SELECT * from users;"
