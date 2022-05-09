from typing import List
from flask import g, abort
from ..model import Submission, User
from ..ext import db


class SubmissionService:
    @staticmethod
    def handle_submission(
        project_name: str,
        tech_stack: List[str],
        description: str,
        video_link: str,
        code_link: str,
    ) -> str:
        """Submits a user's project"""
        user: User = g.user
        if user.submitted:
            abort(403)

        stringed_tech_stack = ",".join(tech_stack)
        new_submission = Submission(
            user_id=user.id,
            project_name=project_name,
            tech_stack=stringed_tech_stack,
            description=description,
            video_link=video_link,
            code_link=code_link,
        )
        user.submitted = True

        db.session.add(new_submission)
        db.session.commit()

        return "ok"
