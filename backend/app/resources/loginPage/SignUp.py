from app.resources.Common.UsersCommon import UsersCommon
from flask import request, current_app
from flask_mail import Mail, Message


class SignUp(UsersCommon):

    # when user follow the link in email to activate account
    def get(self):
        token = request.args["token"]
        login = request.args["login"]
        record = (login,)
        if not self.__check_email_token(record, token):
            return "incorrect token"
        # todo:redirect to index.html
        self.__change_user_status(record)
        return "Activated"

    def post(self):
        email = request.json['email']
        login = request.json['login']
        name = request.json['user_name']
        password = self.to_hash(request.json['password'])
        token = self.to_hash((email+login))

        record = (email, login, password, name, token)
        sql = '''INSERT INTO users (email, login, password, user_name, token)
                 VALUES (%s, %s, %s, %s, %s);'''
        if self.base_write(sql, record):
            self.__send_email_confirmation(email, login, name, token)
            return "We have sent an email confirmation "
        return "Email or login already exist"

    def __send_email_confirmation(self, email, login, name, token):
        mail = Mail(current_app)
        #todo: change link to docker-machine
        link = "http://localhost:5000/api/sign_up?token={}&login={}".format(token, login)
        html = """  <h3>Hello {}!<h3>
                    <p>Thank you for joining our service.</p>
                    <p>Check your login: {}</p>
                    <p>To activate your account click the link below.</p>
                    <a href={}>Activate</a>
                """.format(name, login, link)
        msg = Message(
            subject = "Matcha Confirmation",
            sender=current_app.config.get("MAIL_USERNAME"),
            recipients=[email],
            html = html
        )
        try:
            mail.send(msg)
        except Exception as error:
            print(error)
            return "error"

    def __check_email_token(self, record, token):
        sql = '''SELECT token FROM users
                 WHERE login = %s
                ;'''
        token_dict = self.base_get_one(sql, record)
        if not token_dict:
            return 0
        if token_dict['token'] == token:
            return 1
        else:
            return 0

    def __change_user_status(self, record):
        sql = "UPDATE users SET status = '1' WHERE login =%s"
        self.base_write(sql, record)