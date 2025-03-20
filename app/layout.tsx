import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import React from "react";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/internal/navbar/navbar";
import { Footer } from "@/components/internal/footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/input.svg",
  },
  openGraph: {
    title: "Black Sun Project - Unique Minecraft Servers",
    description:
      "Join the Black Sun Project for a unique Minecraft experience. Explore our servers and become part of our community.",
    url: "https://riseoftheblacksun.eu/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  keywords: [
    "Minecraft",
    "Minecraft server",
    "Black Sun Project",
    "Custom Minecraft servers",
    "Minecraft community",
    "Unique Minecraft gameplay",
    "Join Minecraft server",
    "Minecraft multiplayer",
    "Best Minecraft server",
    "Rise of the Black Sun",
    "Black Sun",
    "Minecraft",
    "Minecraft server",
    "Black Sun Project",
    "custom Minecraft servers",
    "Minecraft community",
    "unique Minecraft gameplay",
    "multiplayer Minecraft",
    "best Minecraft servers",
    "Rise of the Black Sun",
    "custom gameplay",
    "PvP Minecraft",
    "PvE Minecraft",
    "modded Minecraft",
    "Minecraft factions",
    "Minecraft survival",
    "creative Minecraft",
    "Black Sun gaming",
    "Minecraft adventures",
    "gaming servers",
    "Minecraft clans",
    "mini-games Minecraft",
    "hardcore Minecraft",
    "Minecraft building",
    "Minecraft economy",
    "Minecraft plugins",
    "Minecraft mods",
    "Java Edition servers",
    "cracked Minecraft servers",
    "Minecraft events",
    "server list",
    "Minecraft tournaments",
    "Minecraft roleplay",
    "Minecraft challenges",
    "Minecraft parkour",
    "Minecraft skyblock",
    "Minecraft kitpvp",
    "Minecraft hardcore survival",
    "Minecraft towny",
    "Minecraft SMP",
    "join Minecraft server",
    "game Minecraft online",
    "online Minecraft community",
    "top Minecraft servers",
    "Minecraft game modes",
    "custom Minecraft maps",
    "Minecraft dungeons",
    "modded Minecraft adventures",
    "free Minecraft servers",
    "premium Minecraft servers",
    "Minecraft building contests",
    "creative mode challenges",
    "adventure maps Minecraft",
    "Minecraft treasure hunts",
    "Minecraft crafting",
    "Minecraft survival games",
    "Minecraft mob battles",
    "Minecraft quests",
    "Minecraft villages",
    "Minecraft castle builds",
    "unique Minecraft designs",
    "online Minecraft players",
    "popular Minecraft servers",
    "Minecraft fantasy worlds",
    "custom Minecraft plugins",
    "top-rated Minecraft servers",
    "Minecraft server hosting",
    "Minecraft server reviews",
    "Minecraft minigame servers",
    "Minecraft RPG servers",
    "role-playing Minecraft",
    "competitive Minecraft",
    "Minecraft exploration",
    "Minecraft skywars",
    "Minecraft bedwars",
    "Minecraft speedruns",
    "immersive Minecraft worlds",
    "Minecraft worldbuilding",
    "creative Minecraft servers",
    "hardcore survival servers",
    "unique server features",
    "fun Minecraft events",
    "Minecraft economy servers",
    "Minecraft virtual marketplace",
    "Minecraft mods community",
    "custom survival challenges",
    "multiplayer adventure maps",
    "PvP tournaments",
    "Minecraft enchantments",
    "automated farms Minecraft",
    "redstone engineering",
    "command block creations",
    "parkour challenges",
    "Minecraft roller coasters",
    "fantasy RPG Minecraft",
    "custom weapons Minecraft",
    "Minecraft resource packs",
    "Minecraft shaders",
    "Minecraft open world",
    "Minecraft sandbox",
    "community-based servers",
    "modded survival",
    "Minecraft battle royale",
    "top multiplayer experiences",
    "team-based gameplay",
    "PvE boss fights",
    "Minecraft arenas",
    "Minecraft creative builds",
    "large-scale Minecraft projects",
    "city-building Minecraft",
    "Minecraft lore servers",
    "factions PvP",
    "massive Minecraft battles",
    "skyblock challenges",
    "unique Minecraft mods",
    "Minecraft automation",
    "mini-game challenges",
    "survival island Minecraft",
    "custom biomes Minecraft",
    "Minecraft exploration servers",
    "fantasy builds",
    "Minecraft medieval worlds",
    "Minecraft sky villages",
    "community Minecraft events",
    "rare Minecraft items",
    "Minecraft easter eggs",
    "community-driven servers",
    "competitive gameplay",
    "modding Minecraft",
    "Minecraft automation farms",
    "adventure and exploration",
    "immersive roleplay",
    "Minecraft hardcore adventures",
    "grief-protected servers",
    "creative competitions",
    "Minecraft megastructures",
    "unique Minecraft maps",
    "themed Minecraft servers",
    "cooperative gameplay",
    "collaborative builds",
    "redstone puzzle maps",
    "Minecraft boss raids",
    "ultra-hardcore Minecraft",
    "Minecraft mega builds",
    "speedrun-friendly servers",
    "themed PvP battles",
    "customizable Minecraft servers",
    "Minecraft plugin development",
    "roleplay storylines",
    "themed adventure worlds",
    "Minecraft educational maps",
    "large-scale Minecraft builds",
    "modded Minecraft PvE",
    "scripted Minecraft adventures",
    "enhanced Minecraft plugins",
    "dynamic Minecraft servers",
    "advanced redstone mechanics",
    "Minecraft cooperative missions",
    "exploration Minecraft maps",
    "ultimate survival challenges",
    "Java Edition modding",
    "community-based projects",
    "open-world survival",
    "Minecraft aesthetic builds",
    "Minecraft custom dungeons",
    "Minecraft lore-rich servers",
    "long-term survival servers",
    "mini-games tournaments",
    "Minecraft automated gameplay",
    "Minecraft town builders",
    "team strategy Minecraft",
    "massive multiplayer servers",
    "next-generation Minecraft servers",
    "Minecraft creative challenges",
    "Minecraft custom plugins",
    "PvE survival experiences",
    "Minecraft resource collection",
    "unique community projects",
    "massive server events",
    "Java-exclusive servers",
    "custom lore servers",
    "Minecraft treasure maps",
    "Minecraft puzzle servers",
    "advanced Minecraft mechanics",
    "modded adventure packs",
    "multiplayer community hubs",
    "Minecraft collaborative survival",
    "Minecraft competitive modes",
    "immersive adventure servers",
    "Minecraft world exploration",
    "Minecraft automation projects",
    "Minecraft engineering builds",
    "player-driven economies",
    "advanced modded servers",
    "Minecraft server innovations",
    "redstone challenges",
    "interactive Minecraft maps",
    "Minecraft guild systems",
    "massive Minecraft builds",
    "community-hosted tournaments",
    "Minecraft battle challenges",
    "Minecraft monster raids",
    "epic survival maps",
    "custom Minecraft biomes",
    "Minecraft building innovations",
    "Minecraft RPG experiences",
    "player-created content",
    "modded questlines",
    "unique server plugins",
    "Minecraft skill-based challenges",
    "innovative Minecraft gameplay",
    "Minecraft base-building",
    "multi-world Minecraft servers",
    "Minecraft skill trees",
    "Minecraft power-ups",
    "community-run events",
    "competitive leaderboards",
    "Minecraft fortress defense",
    "high-difficulty Minecraft maps",
    "custom combat systems",
    "Minecraft challenge maps",
    "Minecraft boss battles",
    "enhanced survival servers",
    "modded hardcore gameplay",
    "complex Minecraft maps",
    "PvP battle arenas",
    "massive multiplayer Minecraft",
    "creative Minecraft competitions",
    "modded mechanics servers",
    "server economy simulations",
    "unique adventure worlds",
    "immersive story-based servers",
    "custom mobs Minecraft",
    "Minecraft high-skill servers",
    "exclusive Minecraft features",
    "scripted custom maps",
    "player-driven Minecraft servers",
    "Minecraft kingdom servers",
    "unique custom enchantments",
    "PvP strategy games",
    "epic questlines Minecraft",
    "hardcore resource management",
    "Minecraft trading servers",
    "custom world generators",
    "massive cooperative builds",
    "community challenges",
    "modpacks with storylines",
    "Minecraft technical servers",
    "themed Minecraft adventures",
    "roleplay-based gameplay",
    "advanced combat mechanics",
    "Minecraft raid bosses",
    "themed resource packs",
    "custom item systems",
    "immersive sandbox gameplay",
    "multiplayer exploration",
    "Minecraft base defenses",
    "dynamic Minecraft mods",
    "large-scale community builds",
    "top Minecraft innovations",
    "Minecraft crafting challenges",
    "community Minecraft kingdoms",
    "next-gen survival mechanics",
    "Minecraft super challenges",
    "exploration-based Minecraft",
    "themed server challenges",
    "multiplayer modding adventures",
    "Java exclusive adventures",
    "Minecraft roleplaying events",
    "custom adventure servers",
    "survival building servers",
    "rare item hunts",
    "themed Minecraft quests",
    "exploration-based servers",
    "community-driven RPG servers",
    "redstone engineering contests",
    "intense Minecraft dungeons",
    "Minecraft farming servers",
    "player-hosted servers",
    "epic community builds",
    "PvP survival mechanics",
    "team-building Minecraft events",
    "adventure-themed modpacks",
    "unique gameplay modes",
    "immersive quest adventures",
    "multi-map survival experiences",
    "Minecraft resource wars",
    "advanced technical builds",
    "next-gen modded servers",
    "collaborative RPG worlds",
    "epic Minecraft roleplay",
    "Minecraft adventure crafting",
    "massive multiplayer builds",
    "unique survival islands",
    "Minecraft fantasy roleplay",
    "community-driven survival",
    "Java Edition exclusive servers",
    "modded mechanics gameplay",
    "immersive sandbox adventures",
    "PvP dungeon crawlers",
    "Minecraft engineering contests",
    "rare enchantments Minecraft",
    "dynamic multiplayer maps",
    "custom loot systems",
    "Minecraft collaborative builds",
    "epic survival kingdoms",
    "Minecraft futuristic servers",
    "custom redstone creations",
    "complex adventure systems",
    "hardcore creative challenges",
    "advanced roleplay servers",
    "Minecraft exploration quests",
    "customized gameplay mechanics",
    "PvP survival tournaments",
    "community crafting servers",
    "Minecraft virtual cities",
    "massive RPG adventures",
    "themed multiplayer events",
    "interactive server features",
    "Minecraft technical challenges",
    "custom-built minigames",
    "Minecraft epic stories",
    "immersive fantasy worlds",
    "Minecraft speedrun challenges",
    "team-based survival maps",
    "dynamic custom plugins",
    "Minecraft guild adventures",
    "custom weapon crafting",
    "player-driven roleplay",
    "high-skill Minecraft servers",
    "unique exploration maps",
    "multiplayer arena challenges",
    "custom lore adventure packs",
    "Minecraft epic dungeons",
    "innovative gameplay modes",
    "massive multiplayer roleplay",
    "Minecraft automated systems",
    "modded quest-based servers",
    "immersive fantasy adventures",
    "Java survival mechanics",
    "unique biomes exploration",
    "PvP epic battles",
    "custom factions servers",
    "player-run Minecraft events",
    "themed lore-driven servers",
    "Minecraft base engineering",
    "redstone automation servers",
    "community challenge events",
    "unique server modding",
    "PvE survival servers",
    "dynamic combat Minecraft",
    "immersive building challenges",
    "custom exploration servers",
    "community roleplay hubs",
    "unique PvP arenas",
    "epic Minecraft lore",
    "interactive adventure quests",
    "massive sandbox builds",
    "multiplayer fantasy events",
    "innovative crafting systems",
    "hardcore building challenges",
    "custom Minecraft dungeons",
    "roleplay kingdoms Minecraft",
    "Minecraft epic crafting",
    "dynamic multiplayer gameplay",
    "survival-themed servers",
    "exploration-based builds",
    "advanced redstone maps",
    "multiplayer resource systems",
    "immersive crafting adventures",
    "community-driven exploration",
    "unique Minecraft mobs",
    "themed building competitions",
    "Minecraft RPG crafting",
    "interactive building contests",
    "custom RPG mechanics",
    "themed survival servers",
    "Minecraft team challenges",
    "massive redstone builds",
    "themed resource management",
    "hardcore PvE mechanics",
    "community-based questlines",
    "interactive Minecraft lore",
    "unique roleplay maps",
    "epic multiplayer adventures",
    "immersive exploration worlds",
    "dynamic survival systems",
    "custom-built adventure packs",
    "team-driven Minecraft gameplay",
    "futuristic Minecraft worlds",
    "high-difficulty PvE builds",
    "interactive multiplayer events",
    "immersive crafting maps",
    "complex resource management",
    "advanced Minecraft builds",
    "hardcore exploration quests",
    "massive community hubs",
    "customized multiplayer servers",
    "themed redstone projects",
    "unique story-driven gameplay",
    "epic fantasy servers",
    "high-skill survival maps",
    "multiplayer city builders",
    "immersive redstone mechanics",
    "team-based PvP challenges",
    "exploration-based RPG servers",
    "unique engineering systems",
    "custom world-building servers",
    "advanced roleplay mechanics",
    "immersive kingdom builds",
    "community crafting challenges",
    "Minecraft themed towns",
    "epic survival engineering",
    "PvE dynamic gameplay",
    "immersive multiplayer storylines",
    "high-tech Minecraft mods",
    "massive player-driven servers",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
