export const DISCORD_INVITE_URL = "https://discord.gg/3chuca3EMh";
export const API_ENDPOINT = "http://localhost:5000";
export const SERVER_LOGO =
  "https://cdn.discordapp.com/icons/783359069993435146/a_2088b7d950f4f75068559107738f69e3.gif?size=128";

export interface Prize {
  position: number;
  prizeIcon: string;
  prizeText: string;
}

export const prizes: Prize[] = [
  {
    position: 1,
    prizeIcon: "discord.svg",
    prizeText: "Vultr VPS (2 months)",
  },
  {
    position: 2,
    prizeIcon: "discord.svg",
    prizeText: "2 x Discord Nitro Classic",
  },
];

export const rules: string[] = [
  "No development/coding may start before the actual date and time of the Code Jam.",
  "Your project must be solo, you cannot have a teammate.",
  "You are allowed to use third party tools and libraries, but try your best to write most of the code.",
  "Should you use any open source tools or libraries, you must attribute them.",
  "Your project must be open sourced on GitHub so that we can review it.",
  "If you do not win a prize, please do not be salty or rage. We all lose sometimes.",
  "Be respectful to other participants and to staff.",
  "Enjoy the code jam :)",
];
