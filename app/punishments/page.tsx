//@ts-nocheck @ts-ignore
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiLoader, FiSearch } from "react-icons/fi";
import { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { siteConfig } from "@/config/site";

// Тип данных для наказания (поля в PascalCase)
type Punishment = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  Punisher: string;
  Punished: string;
  Reason: string;
  Duration: string;
  Type: "mute" | "ban" | "kick" | "warning";
  Date: string;
};

// @ts-ignore
const particlesOptions: ISourceOptions = {
  background: {
    color: "#000000",
  },
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        // @ts-ignore
        area: 800,
      },
    },
    color: {
      value: ["#EF4444", "#DC2626", "#F97316", "#F59E0B", "#7C3AED", "#3B82F6"],
    },
    opacity: {
      value: 0.2,
      // @ts-ignore
      random: true,
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
    },
    size: {
      value: 2,
      // @ts-ignore
      random: true,
      animation: {
        enable: true,
        speed: 2,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true,
      straight: false,
      outModes: "out",
      attract: {
        enable: true,
      },
    },
    links: {
      enable: true,
      color: "#EF4444",
      opacity: 0.1,
      distance: 150,
      width: 1,
    },
  },
};

// Функция форматирования даты
const formatDate = (dateStr: string) =>
    dateStr ? new Date(dateStr).toLocaleString("ru-RU") : "N/A";

const PunishmentsPage = () => {
  const [punishments, setPunishments] = useState<Punishment[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter] = useState<"all" | "mute" | "ban" | "kick" | "warning">("all");
  const [searchPunisher, setSearchPunisher] = useState("");
  const [searchPunished, setSearchPunished] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [particlesInit, setParticlesInit] = useState(false);

  // Инициализация tsparticles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // @ts-ignore
      await loadSlim(engine);
    }).then(() => setParticlesInit(true));
  }, []);

  // Отслеживание ширины экрана для мобильного режима
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Функция загрузки данных с сервера
  const fetchPunishments = async () => {
    setLoading(true);
    try {
      const response = await fetch(siteConfig.api.punishments);
      if (!response.ok) {
        console.error("Ошибка при получении данных с сервера");
        return;
      }
      const data: Punishment[] = await response.json();
      setPunishments(data);
    } catch (error) {
      console.error("Ошибка при запросе данных:", error);
    } finally {
      setLoading(false);
    }
  };

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    fetchPunishments().then(() => {});
  }, []);

  // Фильтрация данных с защитой
  const filteredPunishments = punishments.filter((p) => {
    const punisher = p.Punisher || "";
    const punished = p.Punished || "";
    const matchesType = filter === "all" ? true : p.Type === filter;
    const matchesPunisher = punisher.toLowerCase().includes(searchPunisher.toLowerCase());
    const matchesPunished = punished.toLowerCase().includes(searchPunished.toLowerCase());
    return matchesType && matchesPunisher && matchesPunished;
  });

  const TypeBadge = ({ type }: { type: Punishment["Type"] }) => {
    const colors = {
      mute: "bg-gradient-to-r from-blue-500 to-violet-600",
      ban: "bg-gradient-to-r from-red-500 to-red-600",
      kick: "bg-gradient-to-r from-amber-500 to-orange-600",
      warning: "bg-gradient-to-r from-green-500 to-emerald-600",
    };
    return (
      <motion.span 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${colors[type]} px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg backdrop-blur-sm`}
      >
        {type === "mute"
          ? "Мут"
          : type === "ban"
            ? "Бан"
            : type === "kick"
              ? "Кик"
              : "Предупреждение"}
      </motion.span>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {particlesInit && (
        <Particles id="tsparticles" options={particlesOptions} className="absolute inset-0 z-0" />
      )}

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient">
            История наказаний
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Система наказаний Rise of the Black Sun
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-4 mb-12"
        >
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 transition-all duration-300 group-hover:text-red-600 group-hover:scale-110" />
            <input
              className="w-full pl-12 pr-4 py-4 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-500/30"
              placeholder="Поиск по администратору..."
              value={searchPunisher}
              onChange={(e) => setSearchPunisher(e.target.value)}
            />
          </div>
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 transition-all duration-300 group-hover:text-red-600 group-hover:scale-110" />
            <input
              className="w-full pl-12 pr-4 py-4 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-500/30"
              placeholder="Поиск по игроку..."
              value={searchPunished}
              onChange={(e) => setSearchPunished(e.target.value)}
            />
          </div>
        </motion.div>

        {isMobile ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {filteredPunishments.map((p, index) => (
              <motion.div
                key={p.ID}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-red-500/10"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-red-500 text-sm font-medium">#{p.ID || "N/A"}</span>
                  <TypeBadge type={p.Type} />
                </div>
                <div className="space-y-3">
                  <div className="group">
                    <span className="text-white/70 group-hover:text-white/90 transition-colors">Админ: </span>
                    <span className="text-white font-medium group-hover:text-red-400 transition-colors">{p.Punisher || "N/A"}</span>
                  </div>
                  <div className="group">
                    <span className="text-white/70 group-hover:text-white/90 transition-colors">Игрок: </span>
                    <span className="text-white font-medium group-hover:text-red-400 transition-colors">{p.Punished || "N/A"}</span>
                  </div>
                  <div className="group">
                    <span className="text-white/70 group-hover:text-white/90 transition-colors">Причина: </span>
                    <span className="text-white font-medium group-hover:text-red-400 transition-colors">{p.Reason || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="group">
                      <span className="text-white/70 group-hover:text-white/90 transition-colors">Срок: </span>
                      <span className="text-white font-medium group-hover:text-red-400 transition-colors">{p.Duration || "N/A"}</span>
                    </div>
                    <span className="text-red-500 text-sm font-medium">{formatDate(p.Date)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-lg"
          >
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  {["#", "Админ", "Игрок", "Тип", "Причина", "Срок", "Дата"].map((header, idx) => (
                    <th key={idx} className="px-6 py-4 text-left text-white/70 text-sm font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredPunishments.map((p, index) => (
                  <motion.tr
                    key={p.ID}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="hover:bg-white/5 transition-colors duration-300 group"
                  >
                    <td className="px-6 py-4 text-white font-medium group-hover:text-red-400 transition-colors">{p.ID || "N/A"}</td>
                    <td className="px-6 py-4 text-white font-medium group-hover:text-red-400 transition-colors">{p.Punisher || "N/A"}</td>
                    <td className="px-6 py-4 text-white font-medium group-hover:text-red-400 transition-colors">{p.Punished || "N/A"}</td>
                    <td className="px-6 py-4">
                      <TypeBadge type={p.Type} />
                    </td>
                    <td className="px-6 py-4 text-white font-medium group-hover:text-red-400 transition-colors">{p.Reason || "N/A"}</td>
                    <td className="px-6 py-4 text-white font-medium group-hover:text-red-400 transition-colors">{p.Duration || "N/A"}</td>
                    <td className="px-6 py-4 text-red-500 text-sm font-medium">{formatDate(p.Date)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-8"
          >
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 1 }} 
              className="text-red-500 text-2xl"
            >
              <FiLoader />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PunishmentsPage;
