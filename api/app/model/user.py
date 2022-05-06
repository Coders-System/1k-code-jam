from ..ext import db


class User(db.Model):
    id = db.Column(db.String(20), primary_key=True)
    username = db.Column(db.String(32))
    discriminator = db.Column(db.String(4))
    email = db.Column(db.String(255), unique=True)
    submitted = db.Column(db.Boolean, default=False)

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "discriminator": self.discriminator,
        }
