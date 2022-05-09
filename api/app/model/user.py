from ..ext import db
import time


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.String(20), primary_key=True)
    username = db.Column(db.String(32), nullable=False)
    discriminator = db.Column(db.String(4), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    submitted = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.BigInteger, default=time.time, nullable=False)
    submission = db.relationship("Submission", backref="users")

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "discriminator": self.discriminator,
            "email": self.email,
            "created_at": self.created_at,
            "submitted": self.submitted,
        }
