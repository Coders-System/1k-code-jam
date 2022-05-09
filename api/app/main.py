from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from .controller import app_controller
from .config import AppConfig
from .model import *
from .ext import db
from werkzeug.exceptions import HTTPException


migrate = Migrate()


def handle_http_exception(e: HTTPException):
    return {
        "error": e.description,
        "msg": "L + ratio",
    }, e.code


def create_app():
    app = Flask(__name__)
    app.config.from_object(AppConfig)
    app.register_blueprint(app_controller)
    app.register_error_handler(HTTPException, handle_http_exception)

    CORS(app, supports_credentials=True)
    db.init_app(app)
    migrate.init_app(app, db)

    return app
