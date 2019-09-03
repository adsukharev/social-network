from app.resources.Common.Base import Base
import psycopg2.errors
from flask_jwt_extended import jwt_required


class Tags(Base):

    @jwt_required
    def get(self):
        sql = """SELECT tag_name from tags;"""
        tags = self.base_get_all(sql)
        tags_array = []
        for tag in tags:
            tags_array.append(tag['tag_name'])
        return tags_array

    def manage_tags(self, tags, user_id):
        try:
            tags_set = self.__tags_in_set(tags)
            self.__add_tags_to_db_tags(tags_set)
            self.__delete_users_tags(user_id)
            tag_ids = self.__get_tag_id(tags_set)
            self.__add_tags_to_db_users_tags(tag_ids, user_id)
            return "ok"
        except Exception as error:
            print(error)

    def __tags_in_set(self, tags):
        record = []
        for item in tags:
            tumple = (item,)
            record.append(tumple)
        return record

    def __add_tags_to_db_tags(self, record):
        sql = '''
                INSERT INTO tags (tag_name)
                VALUES (%s)
                ;'''
        for item in record:
            try:
                self.base_write(sql, item)
            except (Exception, psycopg2.Error):
                print(psycopg2.Error)
        return "ok"

    def __delete_users_tags(self, user_id):
        try:
            sql = """DELETE from users_tags WHERE user_id =%s"""
            record = (user_id,)
            res = self.base_write(sql, record)
            return res
        except Exception as e:
            print(e, "error")

    def __get_tag_id(self, tags):
        tag_ids = []
        sql = """SELECT tag_id from tags WHERE tag_name = %s"""
        for tag in tags:
            tag_id = self.base_get_one(sql, tag)
            tag_ids.append(tag_id['tag_id'])
        return tag_ids

    def __add_tags_to_db_users_tags(self, tag_ids, user_id):
        sql = '''
                INSERT INTO users_tags (user_id, tag_id)
                VALUES (%s, %s)
                ;'''
        for tag in tag_ids:
            record = (user_id, tag)
            self.base_write(sql, record)
