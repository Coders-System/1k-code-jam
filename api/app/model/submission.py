from ..util.validators import PROJECT_NAME_MAX_LENGTH, TECH_STACK_MAX_LENGTH
from ..ext import db
import time


class Submission(db.Model):
    __tablename__ = "submissions"

    user_id = db.Column(db.String(20), db.ForeignKey("users.id"), primary_key=True)
    project_name = db.Column(
        db.String(PROJECT_NAME_MAX_LENGTH), nullable=False, unique=True
    )
    tech_stack = db.Column(db.String(TECH_STACK_MAX_LENGTH), nullable=False)
    description = db.Column(db.Text, nullable=False)
    video_link = db.Column(db.Text, nullable=False)
    code_link = db.Column(db.Text, nullable=False)
    submitted_at = db.Column(db.BigInteger, default=time.time, nullable=False)

    def to_json(self):
        return {
            "user_id": self.user_id,
            "project_name": self.project_name,
            "tech_stack": self.tech_stack.split(","),
            "video_link": self.video_link,
            "code_link": self.code_link,
            "submitted_at": self.submitted_at,
        }
