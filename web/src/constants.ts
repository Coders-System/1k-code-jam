export const DISCORD_INVITE_URL = "";
export const API_ENDPOINT = "http://localhost:5000";

export interface Prize {
  position: number;
  prizeIcon: string;
  prizeText: string;
}

export const prizes: Prize[] = [
  {
    position: 1,
    prizeIcon: "discord.svg",
    prizeText: "Discord Nitro",
  },
  {
    position: 2,
    prizeIcon: "discord.svg",
    prizeText: "Discord Nitro",
  },
  {
    position: 3,
    prizeIcon: "discord.svg",
    prizeText: "Discord Nitro",
  },
];

export const rules: string[] = ["rule 1", "rule 1", "rule 1", "rule 1"];
