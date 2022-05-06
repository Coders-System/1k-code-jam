from flask_sqlalchemy import SQLAlchemy
from zenora import APIClient
from .config import OauthConfig

db = SQLAlchemy()
discord_client = APIClient(
    OauthConfig.CLIENT_TOKEN, client_secret=OauthConfig.CLIENT_SECRET
)
