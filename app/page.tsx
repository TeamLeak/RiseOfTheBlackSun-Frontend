"use client";
import React from "react";
import { BsServer } from "react-icons/bs";
import { CgServer } from "react-icons/cg";
import { GoServer } from "react-icons/go";

import HeroSection from "@/components/home/HeroSection";
import ServerCard from "@/components/home/ServerCard";
import { siteConfig } from "@/config/site";

const Home: React.FC = () => {
  return (
    <div className="scroll-hidden">
      <HeroSection />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mt-16">Сервера {siteConfig.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <ServerCard
            badge="НОВОЕ"
            buttonText="Подробнее"
            description="Это основной сервер, с которого и началось создание проекта.
            Именно этот сервер и положил начало всему, что мы имеем сейчас.
            Поддерживает версию: 1-20-4. Лицензия не обязательна!"
            icon={CgServer}
            iconColor={"#FFFFFF"}
            ipAddress={siteConfig.servers.vanilla}
            title="Vanilla+"
          />
          <ServerCard
            hideCopyIP
            badge="В РАЗРАБОТКЕ"
            buttonText="Подробнее"
            description="Это дополнительный сервер, посвященный тематике RPG.
            Этот сервер - это RPG-песочница в Minecraft, сделанная без модов.
            Этот сервер - так же как и Vanilla+ создан первыми разработчиками."
            icon={GoServer}
            iconColor={"#FFFFFF"}
            ipAddress={siteConfig.servers.vanilla}
            title="RPG"
          />
          <ServerCard
            hideCopyIP
            badge="В РАЗРАБОТКЕ"
            buttonText="Подробнее"
            description="Это дополнительный сервер, посвященный тематике Roleplay.
            Это Roleplay режим в Minecraft, ориентируется на тех игроков, которые хотят полное взаимодействие с другими игроками.
            "
            icon={BsServer}
            iconColor={"#FFFFFF"}
            ipAddress={siteConfig.servers.vanilla}
            title="Role Play"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
