from functools import wraps
from flask import g, request, abort
from typing import List, Optional
from zenora.models.guild import Guild
from ..config import AppConfig
from ..model import User
from jose import JWTError, jwt


def login_required(f):
    """Decorator for implementing route-based authentication"""

    @wraps(f)
    def inner(*args, **kwargs):
        auth_cookie = request.cookies.get("auth")
        if not auth_cookie:
            # No JWT token
            abort(401)

        try:
            decoded_jwt = jwt.decode(
                auth_cookie, AppConfig.SECRET_KEY, algorithms=["HS256"]
            )
        except JWTError:
            # Invalid JWT token
            abort(401)

        user: Optional[User] = User.query.filter_by(id=decoded_jwt["user_id"]).first()
        if not user:
            # User does not exist
            abort(401)

        # Setting the user object in request context
        g.user = user
        return f(*args, **kwargs)

    return inner


def check_member_guild_join(guilds: List[Guild], guild_id: int) -> bool:
    for i in guilds:
        if i.id == guild_id:
            return True
