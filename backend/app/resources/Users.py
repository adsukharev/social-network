from .Base import Base


class Users(Base):

    def get(self):
        sql = "SELECT * FROM users;"
        users = self.base_get(sql)
        return users


    def post(self):
        sql = "SELECT * FROM users;"
        self.base_get(sql)