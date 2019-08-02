from app.resources.Common.Base import Base


class Fake(Base):

    def post(self, user_id):
        sql = "UPDATE users SET fake = '1' WHERE user_id =%s"
        record = (user_id,)
        res = self.base_write(sql, record)
        if res == 'ok':
            self.__blocked_logout()
        return res

    def __blocked_logout(self):
        pass
