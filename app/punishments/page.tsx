"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiLoader, FiSearch } from "react-icons/fi";
import { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import Particles, { initParticlesEngine } from "@tsparticles/react";

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
      value: 50,
      density: {
        enable: true,
        // @ts-ignore
        area: 800,
      },
    },
    color: {
      value: ["#ff0000", "#ff5a5a", "#ff8a8a", "#ffbdbd"],
    },
    opacity: {
      value: 0.5,
      // @ts-ignore
      random: true,
    },
    size: {
      value: 1.5,
      // @ts-ignore
      random: true,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      outModes: "out",
    },
    links: {
      enable: true,
      color: "#ff0000",
      opacity: 0.2,
      distance: 150,
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
      const response = await fetch("https://punishmentsservice.riseoftheblacksun.eu/punishments");
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
      mute: "bg-purple-600",
      ban: "bg-red-600",
      kick: "bg-orange-600",
      warning: "bg-yellow-600",
    };
    return (
        <span className={`${colors[type]} px-2 py-1 rounded-full text-xs font-semibold`}>
        {type === "mute"
            ? "Мут"
            : type === "ban"
                ? "Бан"
                : type === "kick"
                    ? "Кик"
                    : "Предупреждение"}
      </span>
    );
  };

  return (
      <div className="min-h-screen relative overflow-hidden">
        {particlesInit && (
            <Particles id="tsparticles" options={particlesOptions} className="absolute inset-0 z-0" />
        )}

        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
          <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"
          >
            История наказаний
          </motion.h2>

          <div className="flex flex-col gap-4 mb-8">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
              <input
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-red-400/30 bg-black/50 backdrop-blur-sm text-red-200 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Поиск по администратору..."
                  value={searchPunisher}
                  onChange={(e) => setSearchPunisher(e.target.value)}
              />
            </div>
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
              <input
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-red-400/30 bg-black/50 backdrop-blur-sm text-red-200 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Поиск по игроку..."
                  value={searchPunished}
                  onChange={(e) => setSearchPunished(e.target.value)}
              />
            </div>
          </div>

          {isMobile ? (
              <div className="space-y-4">
                {filteredPunishments.map((p) => (
                    <motion.div
                        key={p.ID}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-xl border border-red-400/30 bg-black/50 backdrop-blur-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-red-400 text-sm">#{p.ID || "N/A"}</span>
                        <TypeBadge type={p.Type} />
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-red-300">Админ: </span>
                          <span className="text-red-100">{p.Punisher || "N/A"}</span>
                        </div>
                        <div>
                          <span className="text-red-300">Игрок: </span>
                          <span className="text-red-100">{p.Punished || "N/A"}</span>
                        </div>
                        <div>
                          <span className="text-red-300">Причина: </span>
                          <span className="text-red-100">{p.Reason || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <span className="text-red-300">Срок: </span>
                            <span className="text-red-100">{p.Duration || "N/A"}</span>
                          </div>
                          <span className="text-red-400 text-sm">{formatDate(p.Date)}</span>
                        </div>
                      </div>
                    </motion.div>
                ))}
              </div>
          ) : (
              <div className="rounded-xl border border-red-400/30 bg-black/50 backdrop-blur-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-red-900/20">
                  <tr>
                    {["#", "Админ", "Игрок", "Тип", "Причина", "Срок", "Дата"].map((header, idx) => (
                        <th key={idx} className="px-4 py-3 text-left text-red-300 text-sm font-medium">
                          {header}
                        </th>
                    ))}
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-red-400/30">
                  {filteredPunishments.map((p) => (
                      <motion.tr
                          key={p.ID}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-red-900/10 transition-colors"
                      >
                        <td className="px-4 py-3 text-red-200">{p.ID || "N/A"}</td>
                        <td className="px-4 py-3 text-red-200">{p.Punisher || "N/A"}</td>
                        <td className="px-4 py-3 text-red-200">{p.Punished || "N/A"}</td>
                        <td className="px-4 py-3">
                          <TypeBadge type={p.Type} />
                        </td>
                        <td className="px-4 py-3 text-red-200">{p.Reason || "N/A"}</td>
                        <td className="px-4 py-3 text-red-200">{p.Duration || "N/A"}</td>
                        <td className="px-4 py-3 text-red-400 text-sm">{formatDate(p.Date)}</td>
                      </motion.tr>
                  ))}
                  </tbody>
                </table>
              </div>
          )}

          {loading && (
              <div className="flex justify-center mt-8">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="text-red-500 text-2xl">
                  <FiLoader />
                </motion.div>
              </div>
          )}
        </div>
      </div>
  );
};

export default PunishmentsPage;
