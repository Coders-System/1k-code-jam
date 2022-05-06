from flask import Blueprint
from datetime import datetime
from ..config import AppConfig

router = Blueprint("submission", __name__, url_prefix="/submissions")


@router.get("/time")
def get_remaining_time():
    """Returns the remaining milliseconds till submission deadline"""
    return {
        "remaining": int(
            (AppConfig.SUBMIT_DATE - datetime.now()).total_seconds() * 1000
        )
    }
