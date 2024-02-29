from urllib.parse import quote
from dotenv import load_dotenv
from datetime import datetime, timezone
import os

load_dotenv()


class AppConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]
    SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URI"]
    # SUBMIT_DATE = datetime(2022, 5, 14, hour=15).astimezone(timezone.utc)
    SUBMIT_DATE = datetime(2024, 2, 1, hour=15).astimezone(timezone.utc)
    VOTE_END_DATE = datetime(2024, 4, 2, hour=15).astimezone(timezone.utc)


class OauthConfig:
    CLIENT_ID = os.environ["BOT_CLIENT_ID"]
    CLIENT_SECRET = os.environ["BOT_CLIENT_SECRET"]
    CLIENT_TOKEN = os.environ["BOT_TOKEN"]
    SCOPES = ["email", "identify", "guilds"]
    REDIRECT_URI = os.environ["OAUTH_REDIRECT_URI"]
    GUILD_ID = os.environ["GUILD_ID"]

    @classmethod
    def get_oauth_url(cls):
        return "https://discord.com/api/oauth2/authorize?client_id={}&redirect_uri={}&response_type=code&scope={}".format(
            cls.CLIENT_ID, quote(cls.REDIRECT_URI), "%20".join(cls.SCOPES)
        )
