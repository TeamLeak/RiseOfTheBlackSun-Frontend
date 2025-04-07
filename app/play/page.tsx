//@ts-nocheck @ts-ignore
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiServer,
  FiDownloadCloud,
  FiCommand,
  FiCheckCircle,
  FiAlertTriangle,
  FiRadio,
  FiBookOpen,
} from "react-icons/fi";
import { IoHardwareChipOutline, IoSparkles } from "react-icons/io5";
import { PiPlantFill } from "react-icons/pi";
import { TbHexagon3D } from "react-icons/tb";
import { Link } from "react-router-dom";

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
  releaseNotes: string;
  guideUrl: string;
}

interface ServerData {
  essentials: EssentialsData;
  optimization: OptimizationData;
  ecosystem: EcosystemData;
  launcher: LauncherData;
}

// ===== Функция-заглушка для запроса данных =====
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
          releaseNotes: "Новые функции и улучшения",
          guideUrl: siteConfig.api.guide,
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

// ===== Компоненты секций =====

const RequirementItem = ({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) => (
  <li
    className="flex items-start gap-3 p-4 bg-black/50 rounded-lg border border-gray-700 transition-all duration-300 hover:bg-black/60"
    aria-label={title}
  >
    <span className="text-2xl">{icon}</span>
    <div>
      <h5 className="text-white font-medium">{title}</h5>
      <p className="text-sm text-white/70">{text}</p>
    </div>
  </li>
);

const EssentialsSection = ({ data }: { data: EssentialsData }) => (
  <div className="space-y-8">
    <div className="grid md:grid-cols-2 gap-6">
      {/* Обязательные требования */}
      <div className="p-6 bg-black/70 rounded-xl shadow-lg backdrop-blur-md border border-gray-700">
        <h4 className="text-red-500 font-semibold mb-2 flex items-center gap-2">
          <FiCheckCircle /> {data.requirements.title}
        </h4>
        <hr className="border-t border-gray-700 my-4" />
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
      <div className="p-6 bg-black/70 rounded-xl shadow-lg backdrop-blur-md border border-gray-700">
        <h4 className="text-red-500 font-semibold mb-2 flex items-center gap-2">
          <FiAlertTriangle /> {data.recommendations.title}
        </h4>
        <hr className="border-t border-gray-700 my-4" />
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
    <div className="p-6 bg-[linear-gradient(135deg,transparent,rgba(239,68,68,0.15))] rounded-xl border border-red-500/20 backdrop-blur-md">
      <p className="text-white/70 text-sm">{data.footer}</p>
    </div>
  </div>
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
    className="p-6 bg-black/70 rounded-xl h-full shadow-md border border-gray-700 transition-all duration-300 hover:shadow-xl cursor-pointer"
    whileHover={{ y: -4 }}
  >
    <div className="text-red-500 mb-3">{icon}</div>
    <h5 className="text-lg font-semibold text-white mb-2">{title}</h5>
    <hr className="border-t border-gray-700 my-3" />
    <p className="text-white/70">{content}</p>
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
  <div className="p-4 bg-black/50 rounded-lg shadow-inner border border-gray-700">
    <div className="flex justify-between mb-2">
      <span className="text-white/70">{title}</span>
      <span className="text-red-500">{value}</span>
    </div>
    <div className="h-2 bg-black/70 rounded-full">
      <div
        className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
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
    <div className="p-6 bg-black/70 rounded-xl shadow-lg backdrop-blur-md border border-gray-700">
      <h4 className="text-red-500 font-semibold mb-2">Производительность</h4>
      <hr className="border-t border-gray-700 my-4" />
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

const IntegrationItem = ({
  platform,
  status,
  features,
}: {
  platform: string;
  status: string;
  features: string[];
}) => (
  <div className="p-4 bg-black/50 rounded-lg shadow-inner backdrop-blur-md border border-gray-700">
    <div className="flex justify-between items-center mb-3">
      <h5 className="text-white font-medium">{platform}</h5>
      <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-500">
        {status}
      </span>
    </div>
    <hr className="border-t border-gray-700 my-3" />
    <ul className="space-y-1">
      {features.map((feature) => (
        <li key={feature} className="text-sm text-white/70 flex items-center gap-2">
          <FiRadio className="text-red-500 text-xs" />
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
  <div className="p-4 bg-black/50 rounded-lg shadow-inner backdrop-blur-md border border-gray-700">
    <div className="flex justify-between items-center mb-3">
      <h5 className="text-white font-medium">{title}</h5>
      <span className="text-sm text-white/70">{eta}</span>
    </div>
    <hr className="border-t border-gray-700 my-3" />
    <div className="h-2 bg-black/70 rounded-full">
      <div
        className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

const EcosystemSection = ({ data }: { data: EcosystemData }) => (
  <div className="space-y-8">
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-6 bg-black/70 rounded-xl shadow-lg backdrop-blur-md border border-gray-700">
        <h4 className="text-red-500 font-semibold mb-2">
          {data.title} – Интеграции
        </h4>
        <hr className="border-t border-gray-700 my-4" />
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
      <div className="p-6 bg-black/70 rounded-xl shadow-lg backdrop-blur-md border border-gray-700">
        <h4 className="text-red-500 font-semibold mb-2">Разработка</h4>
        <hr className="border-t border-gray-700 my-4" />
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

const LauncherSection = ({ data }: { data: LauncherData }) => (
  <div className="p-6 bg-black/70 rounded-xl shadow-2xl mb-8 backdrop-blur-md border border-gray-700">
    <h4 className="text-red-500 font-semibold mb-2">{data.title}</h4>
    <p className="text-white mb-2">Версия: {data.version}</p>
    <hr className="border-t border-gray-700 my-4" />
    <div className="flex flex-wrap gap-2 mb-4">
      {data.features.map((feature) => (
        <span
          key={feature}
          className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-sm"
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
        className="px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-600 transition"
      >
        Скачать лаунчер
      </a>
    </div>
  </div>
);

// ===== Новый виджет с информацией о гайде =====
const GuideWidget = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8 p-6 bg-black/80 rounded-xl shadow-2xl backdrop-blur-md border border-gray-700 flex items-center gap-4"
  >
    <FiBookOpen className="text-3xl text-red-500" />
    <div>
      <h4 className="text-white font-bold text-xl">
        Ознакомьтесь с механиками сервера
      </h4>
      <p className="text-white/70 text-sm">
        На нашем сайте{" "}
        <a
          href="https://guide.riseoftheblacksun.eu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 hover:underline"
        >
          guide.riseoftheblacksun.eu
        </a>{" "}
        вы можете ознакомиться с механиками, статистикой и новыми обновлениями.
      </p>
    </div>
  </motion.div>
);

// ===== Компонент для запуска анимации уведомления =====
const LaunchAlert = () => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="mt-16 p-6 bg-black/70 rounded-2xl border-2 border-red-500/30 backdrop-blur-lg shadow-2xl"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 bg-red-500/10 rounded-lg">
        <IoSparkles className="text-2xl text-red-500" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white">Эксклюзивный лаунчер</h3>
        <p className="text-white/70 mt-1">
          Автоматические обновления, встроенный магазин и уникальные функции уже в разработке.
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-dashed border-red-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ loop: Infinity, ease: "linear", duration: 1 }}
        />
      </div>
    );
  }

  // Массив разделов с улучшенной навигацией
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
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <GlowingGrid />
      <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1
            className={`${title()} text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent`}
          >
            Руководство игрока
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto pt-3">
            Полная интеграция с проектом RISE OF THE BLACK SUN
          </p>
        </motion.div>

        {/* Виджет с информацией о гайде */}
        <GuideWidget />

        {/* Секция лаунчера */}
        {/* <LauncherSection data={serverData.launcher} /> */}

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Навигация */}
          <nav className="space-y-3">
            {sections.map((section) => (
              <motion.button
                key={section.key}
                onClick={() =>
                  setActiveSection(activeSection === section.key ? null : section.key)
                }
                aria-label={section.title}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full p-6 text-left rounded-xl transition-all duration-300 focus:outline-none cursor-pointer
                  ${
                    activeSection === section.key
                      ? "bg-red-500/10 border-2 border-red-500/40 backdrop-blur-lg shadow-lg"
                      : "bg-black/50 border-2 border-gray-700 hover:bg-black/60 shadow-sm"
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-black/70 rounded-lg text-red-500 border border-gray-700">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {section.title}
                  </h3>
                </div>
              </motion.button>
            ))}
          </nav>

          {/* Контент выбранного раздела */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              {activeSection && (
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="bg-black/90 p-8 rounded-2xl border-2 border-gray-700 backdrop-blur-xl shadow-2xl"
                >
                  {sections.find((s) => s.key === activeSection)?.content}
                </motion.div>
              )}
            </AnimatePresence>
            {!activeSection && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-12 bg-black/50 rounded-2xl border-2 border-dashed border-red-500/20"
              >
                <p className="text-white/70 text-lg">
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
