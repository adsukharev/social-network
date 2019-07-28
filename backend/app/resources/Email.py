from app.resources.Common.Base import Base
from flask_mail import Mail, Message
from flask import session, current_app

class Email:

    def manage_notification(self, user_id, action):
        sql = "SELECT email, user_name FROM users WHERE user_id = %s;"
        record = (user_id,)
        base = Base()
        user = base.base_get_one(sql, record)
        res = self.__send_email_notification(user['email'], user['user_name'], action)
        return res

    def __send_email_notification(self, email, name, action):
        from_who = session['login']
        mail = Mail(current_app)
        html = """  <h3>Hello {}!<h3>
                    <p>Your profile has been {} by {}</p>
                """.format(name, action, from_who)
        msg = Message(
            subject="Matcha Notification",
            sender=current_app.config.get("MAIL_USERNAME"),
            recipients=[email],
            html=html
        )
        try:
            mail.send(msg)
            return "ok"
        except Exception as error:
            print(error)
            return "error"

    def send_email_confirmation(self, email, login, name, token):
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
            return "We have sent an email confirmation"
        except Exception as error:
            print(error)
            return "error"