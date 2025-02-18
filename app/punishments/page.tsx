"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";

// Тип данных для наказания
type Punishment = {
  id: number;
  punisher: string;
  punished: string;
  reason: string;
  duration: string;
  type: "mute" | "ban" | "kick" | "warning";
  date: string;
};

// Функция генерации случайных данных (эмуляция получения данных с сервера)
const generateDummyPunishments = (startId: number, count: number): Punishment[] => {
  const types: Punishment["type"][] = ["mute", "ban", "kick", "warning"];
  const reasons = [
    "Нарушение правил чата",
    "Использование читов",
    "Неспортивное поведение",
    "Саботаж в командной игре",
    "Мошенничество",
    "Подстрекательство к конфликту",
  ];
  const durations = ["1 час", "24 часа", "7 дней", "Перманентно", "Предупреждение"];
  let result: Punishment[] = [];
  for (let i = 0; i < count; i++) {
    const id = startId + i;
    const type = types[Math.floor(Math.random() * types.length)];
    // Генерируем случайную дату за последние 115 дней
    const randomTimestamp =
        Date.now() - Math.floor(Math.random() * 115 * 24 * 60 * 60 * 1000);
    const date = new Date(randomTimestamp).toLocaleDateString("ru-RU");
    result.push({
      id,
      punisher: `Администратор${Math.floor(Math.random() * 10) + 1}`,
      punished: `Игрок${Math.floor(Math.random() * 1000) + 1}`,
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      duration: durations[Math.floor(Math.random() * durations.length)],
      type,
      date,
    });
  }
  return result;
};

const PunishmentsPage = () => {
  const [punishments, setPunishments] = useState<Punishment[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "mute" | "ban" | "kick" | "warning">("all");
  const [searchPunisher, setSearchPunisher] = useState("");
  const [searchPunished, setSearchPunished] = useState("");
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Функция подгрузки данных
  const loadMore = useCallback(() => {
    setLoading(true);
    // Эмуляция запроса на сервер с задержкой
    setTimeout(() => {
      setPunishments((prev) => [
        ...prev,
        ...generateDummyPunishments(prev.length + 1, 20),
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  // Первоначальная загрузка
  useEffect(() => {
    loadMore();
  }, [loadMore]);

  // Используем IntersectionObserver для бесконечной прокрутки
  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }
  }, [loading, loadMore]);

  // Фильтрация данных: по типу наказания, по "Кто наказал" и по "Кто был наказан"
  const filteredPunishments = punishments.filter((p) => {
    const matchesType = filter === "all" ? true : p.type === filter;
    const matchesPunisher = p.punisher.toLowerCase().includes(searchPunisher.toLowerCase());
    const matchesPunished = p.punished.toLowerCase().includes(searchPunished.toLowerCase());
    return matchesType && matchesPunisher && matchesPunished;
  });

  return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 text-red-400 text-center">
          Список наказаний
        </h2>

        {/* Фильтры по типу наказания */}
        <div className="flex justify-center mb-4 space-x-4">
          {(["all", "mute", "ban", "kick", "warning"] as const).map((type) => (
              <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-full border transition-colors duration-300 ${
                      filter === type
                          ? "bg-red-600 text-white border-red-600 shadow-lg"
                          : "bg-[#400000] text-red-300 border-red-300 hover:bg-red-500 hover:text-white"
                  }`}
              >
                {type === "all"
                    ? "Все"
                    : type === "mute"
                        ? "Мут"
                        : type === "ban"
                            ? "Бан"
                            : type === "kick"
                                ? "Кик"
                                : "Предупреждение"}
              </button>
          ))}
        </div>

        {/* Поля поиска */}
        <div className="flex flex-col md:flex-row justify-center mb-6 gap-4">
          <input
              type="text"
              placeholder="Поиск по тому, кто наказал..."
              value={searchPunisher}
              onChange={(e) => setSearchPunisher(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-full border border-red-300 bg-[#400000] text-red-200 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          />
          <input
              type="text"
              placeholder="Поиск по тому, кто нарушил..."
              value={searchPunished}
              onChange={(e) => setSearchPunished(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-full border border-red-300 bg-[#400000] text-red-200 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          />
        </div>

        {/* Таблица */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse shadow-xl">
            <thead className="bg-[#400000] text-red-300 uppercase">
            <tr>
              <th className="px-4 py-3 border border-red-300">Номер</th>
              <th className="px-4 py-3 border border-red-300">Кто наказал</th>
              <th className="px-4 py-3 border border-red-300">Кто нарушил</th>
              <th className="px-4 py-3 border border-red-300">Тип наказания</th>
              <th className="px-4 py-3 border border-red-300">Причина</th>
              <th className="px-4 py-3 border border-red-300">Срок</th>
              <th className="px-4 py-3 border border-red-300">Дата</th>
            </tr>
            </thead>
            <tbody className="bg-[#200000] text-red-200">
            {filteredPunishments.map((p) => (
                <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-[#400000] transition-colors"
                >
                  <td className="px-4 py-2 border border-red-300">{p.id}</td>
                  <td className="px-4 py-2 border border-red-300">{p.punisher}</td>
                  <td className="px-4 py-2 border border-red-300">{p.punished}</td>
                  <td className="px-4 py-2 border border-red-300 uppercase">
                    {p.type === "mute"
                        ? "Мут"
                        : p.type === "ban"
                            ? "Бан"
                            : p.type === "kick"
                                ? "Кик"
                                : "Предупреждение"}
                  </td>
                  <td className="px-4 py-2 border border-red-300">{p.reason}</td>
                  <td className="px-4 py-2 border border-red-300">{p.duration}</td>
                  <td className="px-4 py-2 border border-red-300">{p.date}</td>
                </motion.tr>
            ))}
            </tbody>
          </table>
        </div>

        {/* Загрузчик для подгрузки следующей страницы */}
        <div ref={loadMoreRef} className="flex justify-center mt-4">
          {loading && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-3xl"
              >
                <FiLoader className="animate-spin" />
              </motion.div>
          )}
        </div>
      </div>
  );
};

export default PunishmentsPage;
