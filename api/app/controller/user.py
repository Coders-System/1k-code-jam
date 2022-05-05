from flask import Blueprint

router = Blueprint("users", __name__, url_prefix="/users")


@router.post("/callback")
def oauth_callback():
    return "mog33"
