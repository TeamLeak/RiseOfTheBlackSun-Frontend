"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
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

const EssentialsSection = () => (
  <div className="space-y-8">
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-6 bg-[#1a1a1a] rounded-xl">
        <h4 className="text-[#4CAF50] font-semibold mb-4 flex items-center gap-2">
          <FiCheckCircle /> Обязательные условия
        </h4>
        <ul className="space-y-4">
          <RequirementItem
            icon="🌐"
            text="Минимум 5 Мбит/с, стабильный пинг"
            title="Интернет-соединение"
          />
          <RequirementItem
            icon="🔐"
            text="Java Edition 1.12.2 - 1.20.x"
            title="Лицензия Minecraft"
          />
          <RequirementItem
            icon="💿"
            text="Intel i5 / 8GB RAM / SSD"
            title="Системные требования"
          />
        </ul>
      </div>

      <div className="p-6 bg-[#1a1a1a] rounded-xl">
        <h4 className="text-[#4CAF50] font-semibold mb-4 flex items-center gap-2">
          <FiAlertTriangle /> Рекомендации
        </h4>
        <ul className="space-y-4">
          <RequirementItem
            icon="🎛️"
            text="Используйте OptiFine или Sodium"
            title="Оптимизация"
          />
          <RequirementItem
            icon="🎧"
            text="Подключите гарнитуру"
            title="Голосовой чат"
          />
          <RequirementItem
            icon="🛡️"
            text="Двухфакторная аутентификация"
            title="Безопасность"
          />
        </ul>
      </div>
    </div>

    <div className="p-6 bg-gradient-to-r from-[#1a1a1a] to-[#4CAF50]/10 rounded-xl border-2 border-[#4CAF50]/20">
      <p className="text-[#8a8a8a] text-sm">
        <span className="text-[#4CAF50]">IP-адрес сервера</span> обновляется
        автоматически в нашем Discord-сообществе. Для доступа к
        экспериментальным сборкам требуется специальная роль.
      </p>
    </div>
  </div>
);

const OptimizationSection = () => (
  <div className="space-y-8">
    <div className="grid md:grid-cols-3 gap-6">
      <OptimizationCard
        content="Обновите драйвера GPU."
        icon={<FiCommand className="text-3xl" />}
        title="Драйвера"
      />
      <OptimizationCard
        content="Sodium, Lithium, LazyDFU, Krypton"
        icon={<FiDownloadCloud className="text-3xl" />}
        title="Моды"
      />
      <OptimizationCard
        content="ATLauncher или PrismLauncher"
        icon={<FiServer className="text-3xl" />}
        title="Лаунчеры"
      />
    </div>

    <div className="p-6 bg-[#1a1a1a] rounded-xl">
      <h4 className="text-[#4CAF50] font-semibold mb-4">Производительность</h4>
      <div className="grid gap-4 md:grid-cols-2">
        <PerformanceMetric progress={70} title="Рендеринг" value="16 чанков" />
        <PerformanceMetric progress={85} title="Память" value="8 ГБ выделено" />
      </div>
    </div>
  </div>
);

const EcosystemSection = () => (
  <div className="space-y-8">
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-6 bg-[#1a1a1a] rounded-xl">
        <h4 className="text-[#4CAF50] font-semibold mb-4">Интеграции</h4>
        <ul className="space-y-4">
          <IntegrationItem
            features={["Синхронизация ролей", "Голосовые каналы"]}
            platform="Discord"
            status="Online"
          />
          <IntegrationItem
            features={["Уведомления", "Статистика"]}
            platform="Telegram"
            status="Beta"
          />
          <IntegrationItem
            features={["Мониторинг", "Управление"]}
            platform="Web"
            status="Live"
          />
        </ul>
      </div>

      <div className="p-6 bg-[#1a1a1a] rounded-xl">
        <h4 className="text-[#4CAF50] font-semibold mb-4">Разработка</h4>
        <div className="space-y-4">
          <RoadmapItem
            eta="Q3 2024"
            progress={45}
            title="Собственный лаунчер"
          />
          <RoadmapItem
            eta="Q4 2024"
            progress={20}
            title="Мобильное приложение"
          />
          <RoadmapItem eta="Q2 2024" progress={80} title="API система" />
        </div>
      </div>
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

const sections = [
  {
    key: "essentials",
    title: "Основные требования",
    icon: <TbHexagon3D className="text-2xl" />,
    content: <EssentialsSection />,
  },
  {
    key: "optimization",
    title: "Оптимизация",
    icon: <IoHardwareChipOutline className="text-2xl" />,
    content: <OptimizationSection />,
  },
  {
    key: "ecosystem",
    title: "Экосистема",
    icon: <PiPlantFill className="text-2xl" />,
    content: <EcosystemSection />,
  },
];

export default function PlayPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

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
          <p className="text-[#8a8a8a] text-xl max-w-2xl mx-auto" style={{ paddingTop: 10 }}>
            Полная интеграция с проектом RISE OF THE BLACK SUN
          </p>
        </motion.div>

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

          {/* Контент */}
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
