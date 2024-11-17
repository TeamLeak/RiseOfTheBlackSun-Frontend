"use client";
import React, { useEffect, useState } from "react";
import { BsServer } from "react-icons/bs";
import { CgServer } from "react-icons/cg";
import { GoServer } from "react-icons/go";

import HeroSection from "@/components/home/HeroSection";
import ServerCard from "@/components/home/ServerCard";
import { siteConfig } from "@/config/site";
import ErrorModal from "@/components/home/ErrorModal";

const iconMap: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  CgServer,
  GoServer,
  BsServer,
};

interface ServerData {
  badge: string;
  buttonText: string;
  description: string;
  icon: string;
  iconColor: string;
  ipAddress: string;
  title: string;
  hideCopyIP?: boolean;
}

const Home: React.FC = () => {
  const [servers, setServers] = useState<ServerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isErrorModalOpen, setErrorModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        setLoading(true);
        const response = await fetch(siteConfig.servers_fetch_url);

        if (!response.ok) {
          setErrorModalOpen(true); // Открываем модальное окно при ошибке
        }
        const data: ServerData[] = await response.json();

        setServers(data);
      } catch (error) {
        setErrorModalOpen(true); // Открываем модальное окно при ошибке
      } finally {
        setLoading(false);
      }
    };

    fetchServers().then(() => {});
  }, []);

  return (
    <div className="scroll-hidden">
      <HeroSection />

      {/* Отображение контейнера только при отсутствии ошибки */}
      {!isErrorModalOpen && !loading && servers.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold mt-16">
            Сервера {siteConfig.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {servers.map((server, index) => (
              <ServerCard
                key={index}
                badge={server.badge}
                buttonText={server.buttonText}
                description={server.description}
                hideCopyIP={server.hideCopyIP}
                icon={iconMap[server.icon]}
                iconColor={server.iconColor}
                ipAddress={server.ipAddress}
                title={server.title}
              />
            ))}
          </div>
        </div>
      )}

      {/* Анимация загрузки */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500" />
        </div>
      )}

      {/* Модальное окно ошибки */}
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setErrorModalOpen(false)}
      />
    </div>
  );
};

export default Home;
