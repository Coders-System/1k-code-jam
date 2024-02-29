import logging
from flask import Blueprint, request, abort
from datetime import datetime, timezone

from sqlalchemy.sql.operators import op

from app.model.vote import Vote
from app.util.guards import after_submission_deadline, before_vote_deadline


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

# TODO refactor to service
from flask import g, abort
from ..model import User, Submission
from ..ext import db

router = Blueprint("vote", __name__, url_prefix="/vote")


def strip_user_id_from_submission(sub):
    s = sub.copy()
    s.pop("user_id", None)
    return s


def get_votable_submissions(user: User):
    return list(
        map(
            strip_user_id_from_submission,
            [
                s.to_json()
                for s in db.session.query(Submission)
                .filter(Submission.user_id != user.id)
                .all()
            ],
        )
    )


@router.get("/submissions")
@login_required
@after_submission_deadline
@before_vote_deadline
def get_submissions():
    """Returns the submissions that the user can vote on"""
    user: User = g.user
    return {"submissions": get_votable_submissions(user)}


@router.post("/submit")
@login_required
@after_submission_deadline
@before_vote_deadline
def submit_vote():
    user: User = g.user
    if user.voted:
        logging.warning(msg=f"{user.id} tried to vote again!")
        abort(403)

    if "name" not in request.json:
        return abort(400)

    submission = (
        db.session.query(Submission)
        .filter(Submission.project_name == request.json["name"])
        .first()
    )

    if submission.user_id == user.id:
        logging.warning(msg=f"{user.id} tried to vote for thier own submission")
        return abort(403)

    new_vote = Vote(
        user_id=user.id,
        project_name=submission.project_name,
    )
    user.voted = True

    db.session.add(new_vote)
    db.session.commit()
    return {}


@router.get("/time")
@login_required
def get_remaining_time():
    """Returns the remaining milliseconds till voting deadline"""
    return {
        "remainingTime": int(
            (
                AppConfig.VOTE_END_DATE - datetime.now().astimezone(timezone.utc)
            ).total_seconds()
            * 1000
        ),
        "isVotingStarted": datetime.now().astimezone(timezone.utc)
        > AppConfig.SUBMIT_DATE,
    }
