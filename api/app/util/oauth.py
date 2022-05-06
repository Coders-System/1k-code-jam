from typing import List
from zenora.models.guild import Guild


def check_member_guild_join(guilds: List[Guild], guild_id: int) -> bool:
    for i in guilds:
        if i.id == guild_id:
            return True
