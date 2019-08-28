from flask import current_app, session
import os
import base64
from werkzeug.utils import secure_filename
from app.resources.Common.Base import Base
from flask_jwt_extended import jwt_required


class Images(Base):

    files = ''
    user_id = ''

    def handle_images(self, request_files, user_id):
        self.user_id = user_id
        self.files = request_files
        if not self.__check_image_exist():
            return "ok"
        image = self.files['avatar']
        if not self.__image_validation(image):
            return "image does not valid"
        # filename = self.__save_image_server(image)
        # if filename == "error":
        #     return filename
        new_image = self.__to_base64(image)
        res = self.__save_image_db(new_image)
        return res

    def __check_image_exist(self):
        if 'avatar' not in self.files:
            return 0
        image = self.files['avatar']
        if image.filename == '':
            return 0
        return 1

    @staticmethod
    def __image_validation(image):
        ALLOWED_EXTENSIONS = ['png', 'jpeg', 'jpg']
        filename = image.filename
        if filename.rsplit('.', 1)[1].lower() not in ALLOWED_EXTENSIONS:
            return 0
        return 1

    @staticmethod
    def __save_image_server(image):

        try:
            filename = secure_filename(image.filename)
            upload_folder = current_app.config.get("UPLOAD_FOLDER")
            image.save(os.path.join(upload_folder, filename))
            path = upload_folder + '/' + filename
            return filename
        except:
            return "error"

    def __to_base64(self, image):
        data = 'data:image/'
        image_64_encoded = (base64.b64encode(image.read())).decode("utf-8")
        extention = image.filename.rsplit('.', 1)[1].lower() + ';base64,'
        new_image = data + extention + image_64_encoded
        return new_image

    def __save_image_db(self, image):
        sql = "UPDATE users SET avatar = array_append(avatar, %s) WHERE user_id = %s;"
        record = (image, self.user_id)
        res = self.base_write(sql, record)
        return res

    # def __save_image_db(self, filename):
    #     # image_64_encoded = base64.b64encode(image.read())
    #     # extention = image.filename.rsplit('.', 1)[1].lower()
    #     # print(extention)
    #     # sql = "UPDATE users SET avatar = %s WHERE user_id =%s"
    #     sql = "UPDATE users SET avatar = array_append(avatar, %s) WHERE user_id = %s;"
    #     record = (filename, self.user_id)
    #     res = self.base_write(sql, record)
    #     return res

    @staticmethod
    def get_image_base64(path):
        # todo:path
        path = '/usr/src/backend/app/user_images/life.jpg'
        with open(path, "rb") as f:
            image_read = f.read()
            image_64_encode = base64.encodebytes(image_read)
        return image_64_encode

    # @jwt_required
    def delete(self, image_id):
        user_id = session['user_id']
        sql = "UPDATE users SET avatar = array_remove(avatar, avatar[%s]) WHERE user_id = %s;"
        record = (image_id, user_id)
        res = self.base_write(sql, record)
        return res
