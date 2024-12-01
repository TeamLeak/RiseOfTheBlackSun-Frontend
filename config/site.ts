import { MdForum } from "react-icons/md";
import { BsMap, BsNewspaper } from "react-icons/bs";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Black Sun Project",
  description:
    "Это целая платформа для развлечений, построенная на базе Minecraft.",
  ipaddress: "gg.riseoftheblacksun.eu",
  big_image: "https://www.tynker.com/minecraft/imgs/editor/character-pic.png",
  servers_fetch_url: "https://riseoftheblacksun.eu/api/getservers.php",
  navItems: [],
  navMenuItems: [
    {
      name: "Форум",
      href: "/forum",
      icon: {
        type: MdForum,
        className: "text-amber-700",
        size: 22,
      },
    },
    {
      name: "Карта",
      href: "/map",
      icon: {
        type: BsMap,
        className: "text-warning",
        size: 20,
      },
    },
    {
      name: "Новости",
      href: "/blog",
      icon: {
        type: BsNewspaper,
        className: "text-blue-500",
        size: 20,
      },
    },
  ],
  links: {
    github: "https://github.com/saintedlittle",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/hdaezg8kxr",
    sponsor: "https://vk.com/asykyy",
    onlinemap: "http://riseoftheblacksun.eu/map",
    forum: "https://t.me/+J87i02XAM9Q1YzI6",
    telegram: "https://t.me/riseoftheblacksun_chat",
  },
  servers: {
    vanilla: "gg.riseoftheblacksun.eu",
  },
};
