from zenora.models.user import OwnUser
from zenora.exceptions import APIError
from zenora import APIClient
from flask import abort
from ..model import User
from ..util.oauth import check_member_guild_join
from ..ext import discord_client, db
from ..config import OauthConfig


class UserService:
    @staticmethod
    def authenticate_oauth(code: str) -> OwnUser:
        """Authenticates a user attempting to log in using Oauth"""
        try:
            oauth_resp = discord_client.oauth.get_access_token(
                code, redirect_uri=OauthConfig.REDIRECT_URI
            )
        except APIError:
            # Aborting because of invalid token
            abort(400)

        user_client = APIClient(
            oauth_resp.access_token, bearer=True, validate_token=False
        )
        user_info = user_client.users.get_current_user()
        user_guilds = user_client.users.get_my_guilds()

        # Check if the user is a member of The Sustem
        is_user_member = check_member_guild_join(user_guilds, int(OauthConfig.GUILD_ID))

        if not is_user_member:
            # Aborting because the user is not a member
            abort(403)

        return user_info

    @staticmethod
    def register_user(user_info: OwnUser) -> User:
        """Registers a new user on the app"""
        new_user = User(
            id=str(user_info.id),
            username=user_info.username,
            discriminator=user_info.discriminator,
            email=user_info.email,
        )
        db.session.add(new_user)
        db.session.commit()

        return new_user
