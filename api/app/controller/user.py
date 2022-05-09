from flask import Blueprint, make_response, request, g
from datetime import datetime, timedelta

from ..util.oauth import login_required
from ..config import OauthConfig, AppConfig
from ..model import User
from ..service import UserService
from jose import jwt

import time

router = Blueprint("users", __name__, url_prefix="/users")


@router.get("/@me")
@login_required
def get_logged_in_user():
    """Returns the currently logged in user"""
    return g.user.to_json()


@router.get("/oauth/url")
def get_oauth_url():
    """Returns Oauth login URL"""
    return {"url": OauthConfig.get_oauth_url()}


@router.post("/oauth/callback")
def oauth_callback():
    """Handles Oauth callback"""
    code = request.json["code"]
    user_info = UserService.authenticate_oauth(code)

    existing_user = User.query.filter_by(id=str(user_info.id)).first()

    if not bool(existing_user):
        user = UserService.register_user(user_info)
    else:
        user = existing_user

    jwt_token = jwt.encode(
        {"user_id": user.id, "exp": time.time() + (1000 * 60 * 60 * 24 * 3)},
        AppConfig.SECRET_KEY,
        algorithm="HS256",
    )

    resp = make_response("Logged in")
    resp.set_cookie(
        "auth",
        jwt_token,
        httponly=True,
        expires=datetime.now() + timedelta(days=5),
        samesite="None",
        secure=True,
    )

    return resp


@router.post("/logout")
def logout_user():
    """Logs out a user by resetting the cookie"""
    resp = make_response("ok")
    resp.set_cookie("auth", "", expires=0, httponly=True, samesite="None", secure=True)
    return resp
