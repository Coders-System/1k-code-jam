from flask import abort
from typing import List

import re

PROJECT_NAME_MAX_LENGTH = 60
PROJECT_NAME_MIN_LENGTH = 3
TECH_STACK_MAX_LENGTH = 210  # Each tag can have 20 characters, and there can be 10 tags, and 10 commas to separate them
DESCRIPTION_MAX_LENGTH = 2000
DESCRIPTION_MIN_LENGTH = 100

SUBMISSION_BODY_FIELDS = {
    "project_name",
    "description",
    "tech_stack",
    "video_link",
    "code_link",
}
URL_REGEX = re.compile(
    "((http|https)://)(www.)?"
    + "[a-zA-Z0-9@:%._\\+~#?&//=]"
    + "{2,256}\\.[a-z]"
    + "{2,6}\\b([-a-zA-Z0-9@:%"
    + "._\\+~#?&//=]*)"
)  # Copied from StackOverflow


def check_body(body: dict):
    if not SUBMISSION_BODY_FIELDS <= body.keys():
        abort(400)
    return body


def validate_project_name(inp: str):
    if (
        len(inp) > PROJECT_NAME_MAX_LENGTH
        or len(inp) < PROJECT_NAME_MIN_LENGTH
        or not isinstance(inp, str)
    ):
        abort(400)
    return inp


def validate_tech_stack(inp: any | List[str]):
    if (not isinstance(inp, list)) or len(inp) > 10 or len(inp) < 1:
        abort(400)

    for i, v in enumerate(inp):
        if len(v) > 20 or "," in v or (not v.strip()):
            abort(400)
        inp[i] = v.lower()
    return inp


def validate_description(inp: str):
    if not isinstance(inp, str):
        abort(400)
    if len(inp) > DESCRIPTION_MAX_LENGTH or len(inp) < DESCRIPTION_MIN_LENGTH:
        abort(400)

    return inp


def validate_link(inp: str):
    if not inp.strip() or not isinstance(inp, str):
        abort(400)

    if re.search(URL_REGEX, inp):
        return inp
    else:
        abort(400)
