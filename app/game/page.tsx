"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  FiServer,
  FiDownloadCloud,
  FiCommand,
  FiCheckCircle,
  FiAlertTriangle,
  FiRadio,
} from "react-icons/fi";
import { IoHardwareChipOutline, IoSparkles } from "react-icons/io5";
import { PiPlantFill } from "react-icons/pi";
import { TbHexagon3D } from "react-icons/tb";

import { title } from "@/components/primitives";
import { GlowingGrid } from "@/components/grid";
import { siteConfig } from "@/config/site";

// ===== Типы данных с сервера =====

interface EssentialsItem {
  icon: string;
  title: string;
  text: string;
}

interface EssentialsData {
  requirements: {
    title: string;
    items: EssentialsItem[];
  };
  recommendations: {
    title: string;
    items: EssentialsItem[];
  };
  footer: string;
}

interface OptimizationCardData {
  icon: string; // ключ для определения иконки
  title: string;
  content: string;
}

interface PerformanceData {
  title: string;
  value: string;
  progress: number;
}

interface OptimizationData {
  title: string;
  cards: OptimizationCardData[];
  performance: PerformanceData[];
}

interface IntegrationData {
  platform: string;
  status: string;
  features: string[];
}

interface RoadmapData {
  title: string;
  progress: number;
  eta: string;
}

interface EcosystemData {
  title: string;
  integrations: IntegrationData[];
  roadmap: RoadmapData[];
}

interface LauncherData {
  title: string;
  version: string;
  downloadUrl: string;
  features: string[];
}

interface ServerData {
  essentials: EssentialsData;
  optimization: OptimizationData;
  ecosystem: EcosystemData;
  launcher: LauncherData;
}

// ===== Функция-заглушка запроса с сервера =====
const fetchServerData = async (): Promise<ServerData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        essentials: siteConfig.server.essentials,
        optimization: siteConfig.server.optimization,
        ecosystem: siteConfig.server.ecosystem,
        launcher: {
          title: "Лаунчер",
          version: "1.0.0",
          downloadUrl: siteConfig.api.launcher,
          features: ["Автообновление", "Оптимизация", "Моды"],
        },
      });
    }, 1000);
  });
};

// ===== Маппинг иконок для карточек оптимизации =====
const optimizationIconMapping: { [key: string]: React.ReactNode } = {
  command: <FiCommand className="text-3xl" />,
  download: <FiDownloadCloud className="text-3xl" />,
  server: <FiServer className="text-3xl" />,
};

// ===== Компоненты =====

const EssentialsSection = ({ data }: { data: EssentialsData }) => (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Обязательные условия */}
        <div className="p-6 bg-[#1a1a1a] rounded-xl">
          <h4 className="text-[#4CAF50] font-semibold mb-4 flex items-center gap-2">
            <FiCheckCircle /> {data.requirements.title}
          </h4>
          <ul className="space-y-4">
            {data.requirements.items.map((item) => (
                <RequirementItem
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    text={item.text}
                />
            ))}
          </ul>
        </div>

        {/* Рекомендации */}
        <div className="p-6 bg-[#1a1a1a] rounded-xl">
          <h4 className="text-[#4CAF50] font-semibold mb-4 flex items-center gap-2">
            <FiAlertTriangle /> {data.recommendations.title}
          </h4>
          <ul className="space-y-4">
            {data.recommendations.items.map((item) => (
                <RequirementItem
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    text={item.text}
                />
            ))}
          </ul>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-[#1a1a1a] to-[#4CAF50]/10 rounded-xl border-2 border-[#4CAF50]/20">
        <p className="text-[#8a8a8a] text-sm">{data.footer}</p>
      </div>
    </div>
);

const OptimizationSection = ({ data }: { data: OptimizationData }) => (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        {data.cards.map((card) => (
            <OptimizationCard
                key={card.title}
                icon={optimizationIconMapping[card.icon]}
                title={card.title}
                content={card.content}
            />
        ))}
      </div>

      <div className="p-6 bg-[#1a1a1a] rounded-xl">
        <h4 className="text-[#4CAF50] font-semibold mb-4">Производительность</h4>
        <div className="grid gap-4 md:grid-cols-2">
          {data.performance.map((metric) => (
              <PerformanceMetric
                  key={metric.title}
                  title={metric.title}
                  value={metric.value}
                  progress={metric.progress}
              />
          ))}
        </div>
      </div>
    </div>
);

const EcosystemSection = ({ data }: { data: EcosystemData }) => (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-[#1a1a1a] rounded-xl">
          <h4 className="text-[#4CAF50] font-semibold mb-4">
            {data.title} – Интеграции
          </h4>
          <ul className="space-y-4">
            {data.integrations.map((integration) => (
                <IntegrationItem
                    key={integration.platform}
                    platform={integration.platform}
                    status={integration.status}
                    features={integration.features}
                />
            ))}
          </ul>
        </div>

        <div className="p-6 bg-[#1a1a1a] rounded-xl">
          <h4 className="text-[#4CAF50] font-semibold mb-4">Разработка</h4>
          <div className="space-y-4">
            {data.roadmap.map((item) => (
                <RoadmapItem
                    key={item.title}
                    title={item.title}
                    progress={item.progress}
                    eta={item.eta}
                />
            ))}
          </div>
        </div>
      </div>
    </div>
);

// Блок с лаунчером вынесен отдельно (например, выше разделов)
const LauncherSection = ({ data }: { data: LauncherData }) => {
  return (
    <div className="p-6 bg-[#1a1a1a] rounded-xl mb-8">
      <h4 className="text-[#4CAF50] font-semibold mb-4">{data.title}</h4>
      <p className="text-[#e0e0e0] mb-2">Версия: {data.version}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {data.features.map((feature) => (
          <span
            key={feature}
            className="px-3 py-1 bg-[#4CAF50]/10 text-[#4CAF50] rounded-full text-sm"
          >
            {feature}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <a
          href={data.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#4CAF50] text-[#0a0a0a] rounded-lg hover:bg-[#43A047] transition"
        >
          Скачать лаунчер
        </a>
      </div>
    </div>
  );
};

const RequirementItem = ({
                           icon,
                           title,
                           text,
                         }: {
  icon: string;
  title: string;
  text: string;
}) => (
    <li className="flex items-start gap-3 p-3 bg-[#121212] rounded-lg">
      <span className="text-2xl">{icon}</span>
      <div>
        <h5 className="text-[#e0e0e0] font-medium">{title}</h5>
        <p className="text-sm text-[#8a8a8a]">{text}</p>
      </div>
    </li>
);

const OptimizationCard = ({
                            icon,
                            title,
                            content,
                          }: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) => (
    <motion.div
        className="p-6 bg-[#1a1a1a] rounded-xl h-full"
        whileHover={{ y: -3 }}
    >
      <div className="text-[#4CAF50] mb-3">{icon}</div>
      <h5 className="text-lg font-semibold text-[#e0e0e0] mb-2">{title}</h5>
      <p>{content}</p>
    </motion.div>
);

const PerformanceMetric = ({
                             title,
                             value,
                             progress,
                           }: {
  title: string;
  value: string;
  progress: number;
}) => (
    <div className="p-4 bg-[#121212] rounded-lg">
      <div className="flex justify-between mb-2">
        <span className="text-[#8a8a8a]">{title}</span>
        <span className="text-[#4CAF50]">{value}</span>
      </div>
      <div className="h-2 bg-[#1a1a1a] rounded-full">
        <div
            className="h-full bg-gradient-to-r from-[#4CAF50] to-[#6aee87] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
        />
      </div>
    </div>
);

const IntegrationItem = ({
                           platform,
                           status,
                           features,
                         }: {
  platform: string;
  status: string;
  features: string[];
}) => (
    <div className="p-4 bg-[#121212] rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h5 className="text-[#e0e0e0] font-medium">{platform}</h5>
        <span
            className={`text-xs px-2 py-1 rounded-full ${
                status === "Online"
                    ? "bg-[#4CAF50]/20 text-[#4CAF50]"
                    : status === "Beta"
                        ? "bg-[#FFC107]/20 text-[#FFC107]"
                        : "bg-[#2196F3]/20 text-[#2196F3]"
            }`}
        >
        {status}
      </span>
      </div>
      <ul className="space-y-1">
        {features.map((feature) => (
            <li
                key={feature}
                className="text-sm text-[#8a8a8a] flex items-center gap-2"
            >
              <FiRadio className="text-[#4CAF50] text-xs" />
              {feature}
            </li>
        ))}
      </ul>
    </div>
);

const RoadmapItem = ({
                       title,
                       progress,
                       eta,
                     }: {
  title: string;
  progress: number;
  eta: string;
}) => (
    <div className="p-4 bg-[#121212] rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h5 className="text-[#e0e0e0] font-medium">{title}</h5>
        <span className="text-sm text-[#8a8a8a]">{eta}</span>
      </div>
      <div className="h-2 bg-[#1a1a1a] rounded-full">
        <div
            className="h-full bg-gradient-to-r from-[#4CAF50] to-[#6aee87] rounded-full"
            style={{ width: `${progress}%` }}
        />
      </div>
    </div>
);

const LaunchAlert = () => (
    <motion.div
        animate={{ scale: 1, opacity: 1 }}
        className="mt-16 p-6 bg-[#1a1a1a] rounded-2xl border-2 border-[#4CAF50]/30 backdrop-blur-lg"
        initial={{ scale: 0.95, opacity: 0 }}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[#4CAF50]/10 rounded-lg">
          <IoSparkles className="text-2xl text-[#4CAF50]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#e0e0e0]">
            Эксклюзивный лаунчер
          </h3>
          <p className="text-[#8a8a8a] mt-1">
            Автоматические обновления, встроенный магазин и уникальные функции уже
            в разработке. Доступно для Windows, Linux и macOS.
          </p>
        </div>
      </div>
    </motion.div>
);

// ===== Основной компонент страницы =====
export default function PlayPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServerData().then((data) => {
      setServerData(data);
      setLoading(false);
    });
  }, []);

  if (loading || !serverData) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <motion.div
              className="w-16 h-16 border-4 border-dashed border-[#4CAF50] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ loop: Infinity, ease: "linear", duration: 1 }}
          />
        </div>
    );
  }

  // Массив разделов на основе полученных данных
  const sections = [
    {
      key: "essentials",
      title: serverData.essentials.requirements.title,
      icon: <TbHexagon3D className="text-2xl" />,
      content: <EssentialsSection data={serverData.essentials} />,
    },
    {
      key: "optimization",
      title: serverData.optimization.title,
      icon: <IoHardwareChipOutline className="text-2xl" />,
      content: <OptimizationSection data={serverData.optimization} />,
    },
    {
      key: "ecosystem",
      title: serverData.ecosystem.title,
      icon: <PiPlantFill className="text-2xl" />,
      content: <EcosystemSection data={serverData.ecosystem} />,
    },
  ];

  return (
      <div className="min-h-screen bg-[#0a0a0a] relative overflow-x-hidden">
        <GlowingGrid />

        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
          >
            <h1
                className={`${title()} text-5xl font-bold mb-4 bg-gradient-to-r from-[#4CAF50] to-[#6aee87] bg-clip-text text-transparent`}
            >
              Руководство игрока
            </h1>
            <p
                className="text-[#8a8a8a] text-xl max-w-2xl mx-auto"
                style={{ paddingTop: 10 }}
            >
              Полная интеграция с проектом RISE OF THE BLACK SUN
            </p>
          </motion.div>

          {/* Блок лаунчера вынесен отдельно */}
          <LauncherSection data={serverData.launcher} />

          <div className="grid lg:grid-cols-[300px_1fr] gap-8">
            {/* Навигация */}
            <div className="space-y-2">
              {sections.map((section) => (
                  <motion.div
                      key={section.key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                  >
                    <button
                        className={`w-full p-6 text-left rounded-xl transition-all duration-300 ${
                            activeSection === section.key
                                ? "bg-[#4CAF50]/10 border-2 border-[#4CAF50]/30 backdrop-blur-lg"
                                : "bg-[#121212] hover:bg-[#1a1a1a] border-2 border-[#1a1a1a]"
                        }`}
                        onClick={() =>
                            setActiveSection(
                                activeSection === section.key ? null : section.key,
                            )
                        }
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-[#1a1a1a] rounded-lg text-[#4CAF50]">
                          {section.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-[#e0e0e0]">
                          {section.title}
                        </h3>
                      </div>
                    </button>
                  </motion.div>
              ))}
            </div>

            {/* Контент выбранного раздела */}
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                {activeSection && (
                    <motion.div
                        key={activeSection}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-[#121212]/90 p-8 rounded-2xl border-2 border-[#1a1a1a] backdrop-blur-xl shadow-2xl"
                        exit={{ opacity: 0, x: -50 }}
                        initial={{ opacity: 0, x: 50 }}
                    >
                      {sections.find((s) => s.key === activeSection)?.content}
                    </motion.div>
                )}
              </AnimatePresence>

              {!activeSection && (
                  <motion.div
                      animate={{ opacity: 1 }}
                      className="text-center p-12 bg-[#121212]/50 rounded-2xl border-2 border-dashed border-[#4CAF50]/20"
                      initial={{ opacity: 0 }}
                  >
                    <p className="text-[#8a8a8a] text-lg">
                      Выберите раздел для просмотра детальной информации
                    </p>
                  </motion.div>
              )}
            </div>
          </div>

          <LaunchAlert />
        </div>
      </div>
  );
}
