export const DISCORD_INVITE_URL = "";

export interface Prize {
  position: number;
  prizeIcon: string;
  prizeText: string;
}

export const prizes: Prize[] = [
  {
    position: 1,
    prizeIcon: "discord.png",
    prizeText: "Discord Nitro",
  },
  {
    position: 2,
    prizeIcon: "discord.png",
    prizeText: "Discord Nitro",
  },
  {
    position: 3,
    prizeIcon: "discord.png",
    prizeText: "Discord Nitro",
  },
];

export const rules: string[] = ["rule 1", "rule 1", "rule 1", "rule 1"];
