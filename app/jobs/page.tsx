"use client";

import React, { useCallback, useState, useEffect, useRef } from "react";
import { loadFull } from "tsparticles";
import type { Engine } from "@tsparticles/engine";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiCpu } from "react-icons/fi";

// Компонент для красивого отображения "пилюльки" (например, технология, навык)
const SkillPill = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        className="px-5 py-2 bg-black bg-opacity-30 rounded-full border border-purple-700/50 text-sm flex items-center gap-2 drop-shadow-md"
    >
      <FiStar className="text-purple-400" />
      <span>{children}</span>
    </motion.div>
);

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  headerImage?: string;
  bgGradient?: string;
  extraContent?: React.ReactNode;
}
const Section = ({
                   title,
                   subtitle,
                   children,
                   icon,
                   headerImage,
                   bgGradient = "bg-gradient-to-r from-purple-900 to-purple-700",
                   extraContent,
                 }: SectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);

  return (
      <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-8 bg-black bg-opacity-80 backdrop-blur-lg rounded-3xl border border-purple-700/50 mt-10 shadow-2xl overflow-hidden"
      >
        {headerImage && (
            <div className="mb-4">
              <img
                  src={headerImage}
                  alt={`${title} header`}
                  className="w-full h-48 object-cover rounded-t-3xl"
              />
            </div>
        )}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
          <div className="p-4 bg-gray-800/50 rounded-full text-4xl">{icon}</div>
          <div>
            <h3 className={`text-3xl font-extrabold ${bgGradient} bg-clip-text text-transparent drop-shadow-lg`}>
              {title}
            </h3>
            {subtitle && <p className="mt-1 text-lg text-gray-300">{subtitle}</p>}
          </div>
        </div>
        <div>{children}</div>
        {extraContent && (
            <>
              <motion.button
                  onClick={() => setShowMore(!showMore)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 inline-flex items-center text-purple-300 font-semibold"
              >
                {showMore ? "Свернуть" : "Читать подробнее"}
              </motion.button>
              <AnimatePresence>
                {showMore && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 text-gray-200"
                    >
                      {extraContent}
                    </motion.div>
                )}
              </AnimatePresence>
            </>
        )}
      </motion.div>
  );
};

// Интерфейс вакансии – поля должны соответствовать тому, что возвращает бекенд
interface Vacancy {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  headerImage: string;
  bgGradient: string;
  requirements: string[]; // ожидаем массив строк
  techStack: string[];
}

// Компонент карточки вакансии, использующий Section для отображения деталей
const VacancyCard = ({ vacancy }: { vacancy: Vacancy }) => {
  return (
      <Section
          title={vacancy.title}
          subtitle={vacancy.subtitle}
          icon={<FiCpu />}
          headerImage={
              vacancy.headerImage ||
              "https://via.placeholder.com/800x200.png?text=Vacancy+Header"
          }
          bgGradient={vacancy.bgGradient || "bg-gradient-to-r from-purple-900 to-purple-700"}
          extraContent={
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-bold text-purple-300 mb-2">Описание</h4>
                <p className="text-gray-300">{vacancy.description}</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-purple-300 mb-2">Требования</h4>
                <ul className="list-disc ml-6 text-gray-300">
                  {vacancy.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                  ))}
                </ul>
                <h4 className="text-xl font-bold text-purple-300 mt-4 mb-2">Технологии</h4>
                <div className="flex flex-wrap gap-2">
                  {vacancy.techStack.map((tech, idx) => (
                      <SkillPill key={idx}>{tech}</SkillPill>
                  ))}
                </div>
              </div>
            </div>
          }
      >
        <p className="text-gray-300">
          Нажмите "Читать подробнее" для просмотра полного описания вакансии.
        </p>
      </Section>
  );
};

// Основной компонент страницы
const JobPage = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);

  // Получаем вакансии с бекенда при монтировании компонента
  useEffect(() => {
    fetch("https://vacansiesservice.riseoftheblacksun.eu/api/vacancies")
        .then((res) => res.json())
        .then((data) => {
          if (data?.vacancies) {
            const parsedVacancies = data.vacancies.map((vac: any) => ({
              ...vac,
              requirements:
                  typeof vac.requirements === "string"
                      ? JSON.parse(vac.requirements)
                      : vac.requirements,
              techStack:
                  typeof vac.techStack === "string"
                      ? JSON.parse(vac.techStack)
                      : vac.techStack,
            }));
            setVacancies(parsedVacancies);
          }
        })
        .catch((err) => console.error("Ошибка получения вакансий:", err))
        .finally(() => setLoading(false));
  }, []);

  return (
      <div className="min-h-screen relative overflow-hidden bg-black">
        <div className="relative z-20 max-w-7xl mx-auto px-6 py-24">
          {/* Верхняя панель с логотипом */}
          <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-16"
          >
            <motion.img
                src="https://cdn.discordapp.com/attachments/1343917666334674996/1345705129881374730/image.png?ex=67c58510&is=67c43390&hm=51a195d9bf3376a954710343a3428cdff99e3c0922c8477a2a868047751488bd&="
                alt="Логотип"
                className="w-auto max-w-full drop-shadow-2xl"
            />
          </motion.div>
          {loading ? (
              <p className="text-center text-gray-300">Загрузка вакансий...</p>
          ) : vacancies.length === 0 ? (
              // Красивый блок, если вакансий нет
              <div className="text-center p-12 bg-gray-800 bg-opacity-70 rounded-3xl border border-purple-700/50 shadow-2xl">
                <h2 className="text-3xl font-bold text-purple-300 mb-4">
                  Пока персонал не нужен!
                </h2>
                <p className="text-gray-300">
                  Следите за обновлениями – возможно, в ближайшее время у нас откроются новые возможности.
                </p>
              </div>
          ) : (
              <div className="space-y-8">
                {vacancies.map((vacancy) => (
                    <VacancyCard key={vacancy.id} vacancy={vacancy} />
                ))}
              </div>
          )}
          {/* Если вакансии есть, выводим кнопку для подачи заявки */}
          {vacancies.length > 0 && (
              <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="mt-16 p-8 bg-black bg-opacity-50 backdrop-blur-lg rounded-2xl border border-purple-700/50 shadow-xl text-center"
              >
                <button
                    onClick={() => {
                      // Логика открытия модального окна для отклика (если требуется)
                      console.log("Открываем форму отклика");
                    }}
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl font-extrabold text-2xl flex items-center justify-center gap-4 drop-shadow-lg"
                >
                  Откликнуться на вакансию 🚀
                </button>
              </motion.div>
          )}
        </div>
      </div>
  );
};

export default JobPage;
