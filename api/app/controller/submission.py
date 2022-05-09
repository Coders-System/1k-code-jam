from flask import Blueprint, request, abort
from datetime import datetime, timezone

from ..service import SubmissionService
from ..util.validators import (
    check_body,
    validate_description,
    validate_link,
    validate_project_name,
    validate_tech_stack,
)
from ..util.oauth import login_required
from ..config import AppConfig

router = Blueprint("submission", __name__, url_prefix="/submissions")


@router.get("/time")
@login_required
def get_remaining_time():
    """Returns the remaining milliseconds till submission deadline"""
    return {
        "remaining": int(
            (
                AppConfig.SUBMIT_DATE - datetime.now().astimezone(timezone.utc)
            ).total_seconds()
            * 1000
        )
    }


@router.post("/submit")
@login_required
def submit_project():
    if datetime.now().astimezone(timezone.utc) > AppConfig.SUBMIT_DATE:
        # Cannot submit after submission deadline
        abort(403)

    body = check_body(request.json)
    project_name = validate_project_name(body["project_name"])
    tech_stack = validate_tech_stack(body["tech_stack"])
    description = validate_description(body["description"])
    video_link = validate_link(body["video_link"])
    code_link = validate_link(body["code_link"])

    status = SubmissionService.handle_submission(
        project_name, tech_stack, description, video_link, code_link
    )
    return {"status": status}
