from flask import Blueprint
from . import user, submission

app_controller = Blueprint("main", __name__)
app_controller.register_blueprint(user.router)
app_controller.register_blueprint(submission.router)
