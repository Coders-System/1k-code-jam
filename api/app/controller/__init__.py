from flask import Blueprint
from . import user

app_controller = Blueprint("main")
app_controller.register_blueprint(user.router)
