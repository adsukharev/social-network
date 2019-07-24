import os


class Config:
    DEBUG = True
    # SECRET_KEY = os.environ['SECRET_KEY']
    # JWT_SECRET_KEY = 'dude this is a very terrible key'

mail_settings = {
        "MAIL_SERVER": 'smtp.gmail.com',
        "MAIL_PORT": 465,
        "MAIL_USE_TLS": False,
        "MAIL_USE_SSL": True,
        "MAIL_USERNAME": os.environ['EMAIL_USER'],
        "MAIL_PASSWORD": os.environ['EMAIL_PASSWORD']
}