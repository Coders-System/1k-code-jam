from flask import Flask
from .controller import app_controller
from .model import *
from .ext import db


def create_app():
    app = Flask(__name__)
    app.register_blueprint(app_controller)
    db.init_app(app)

    return app
