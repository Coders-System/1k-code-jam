from ..util.validators import PROJECT_NAME_MAX_LENGTH, TECH_STACK_MAX_LENGTH
from ..ext import db
import time


class Vote(db.Model):
    __tablename__ = "votes"

    user_id = db.Column(db.String(20), db.ForeignKey("users.id"), primary_key=True)
    project_name = db.Column(db.String(PROJECT_NAME_MAX_LENGTH), nullable=False)
    voted_at = db.Column(db.BigInteger, default=time.time, nullable=False)

    def to_json(self):
        return {
            "user_id": self.user_id,
            "project_name": self.project_name,
        }
