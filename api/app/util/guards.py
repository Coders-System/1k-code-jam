from functools import wraps
import logging
from flask import abort, g
from datetime import datetime, timezone
from ..config import AppConfig
from ..model import User


def before_submission_deadline(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if datetime.now().astimezone(timezone.utc) > AppConfig.SUBMIT_DATE:
            # Cannot submit after submission deadline
            user: User = g.user
            logging.warning(
                msg=f"{user.id} tried to submit after the submission deadline"
            )
            return abort(403)
        return f(*args, **kwargs)

    return decorated_function


def after_submission_deadline(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if datetime.now().astimezone(timezone.utc) < AppConfig.SUBMIT_DATE:
            # Cannot submit after submission deadline
            user: User = g.user
            logging.warning(msg=f"{user.id} tried to vote before submission ends")
            return abort(403)
        return f(*args, **kwargs)

    return decorated_function


def before_vote_deadline(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if datetime.now().astimezone(timezone.utc) > AppConfig.VOTE_END_DATE:
            # Cannot submit after submission deadline
            user: User = g.user
            logging.warning(msg=f"{user.id} tried to vote after the voting deadline")
            return abort(403)
        return f(*args, **kwargs)

    return decorated_function
