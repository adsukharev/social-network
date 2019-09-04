from app.resources.Common.Base import Base
from flask_jwt_extended import jwt_required


class Rating(Base):

    @jwt_required
    def get(self):
        sql = '''   SELECT u.user_id, u.login, u.user_name, u.age, l.likes, r.sumLikes, array_agg(u.avatar[1]) as avatar
                    FROM users u
                    JOIN rating r ON r.user_fk = u.user_id
                    LEFT JOIN (
                      SELECT likes.to_like_fk, array_agg(u.login) as likes
                      FROM likes
                      JOIN  users u ON u.user_id = likes.from_like_fk
                      GROUP BY 1
                      ) l ON u.user_id = l.to_like_fk
                    WHERE u.fake = '0'
                    GROUP BY u.user_id, r.sumLikes,l.likes
                    ORDER BY r.sumlikes DESC    
                    ;'''
        rating = self.base_get_all(sql)
        return rating

    def create_user(self, user_id):
        sql = '''INSERT INTO rating (user_fk)
                 VALUES (%s);'''
        record = (user_id,)
        res = self.base_write(sql, record)
        return res

    def inc_like(self, to_like_id):
        sql = '''UPDATE rating SET sumLikes = sumLikes + 1 WHERE user_fk = %s;'''
        record = (to_like_id,)
        res = self.base_write(sql, record)
        return res

    def decrease_like(self, to_like_id):
        sql = '''UPDATE rating SET sumLikes = sumLikes - 1 WHERE user_fk = %s;'''
        record = (to_like_id,)
        res = self.base_write(sql, record)
        return res
