from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from .controller import app_controller
from .config import AppConfig
from .model import *
from .ext import db

migrate = Migrate()


def create_app():
    app = Flask(__name__)
    app.config.from_object(AppConfig)
    app.register_blueprint(app_controller)

    CORS(app, supports_credentials=True)
    db.init_app(app)
    migrate.init_app(app, db)

    return app
