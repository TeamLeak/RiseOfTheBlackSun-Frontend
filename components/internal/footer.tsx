"use client";
import { motion } from "framer-motion";
import { FiYoutube, FiGithub, FiMail, FiAlertTriangle } from "react-icons/fi";
import { RiDiscordFill, RiSwordFill } from "react-icons/ri";
import { TbCube, TbPrison } from "react-icons/tb";
import React from "react";

export const Footer = () => {
  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <footer className="w-full bg-[#080808] border-t-2 border-[#1a1a1a] relative overflow-hidden">
      {/* Анимированные пиксельные частицы */}
      <div className="absolute inset-0 z-0 opacity-15">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0, 0.5, 0],
              transition: {
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              },
            }}
            className="absolute w-[2px] h-[2px] bg-[#4CAF50]"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* Центральный блок с логотипом */}
        <motion.div
          animate="float"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          variants={floatingVariants}
        />

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {/* Левый блок - Контакты */}
          <div className="space-y-6 bg-[#0a0a0a]/90 p-6 border-2 border-[#1a1a1a] backdrop-blur-sm">
            <motion.h2
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-minecraft text-[#6aee87] mb-6"
              initial={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.2 }}
            >
              ПРИСОЕДИНЯЙСЯ
            </motion.h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#8a8a8a] hover:text-[#6aee87] transition-colors">
                <FiMail className="w-5 h-5"/>
                <span className="font-minecraft">
                  support@riseoftheblacksun.eu
                </span>
              </div>

              <div className="flex gap-4 mt-4">
                <SocialIcon icon={<RiDiscordFill className="w-6 h-6"/>} url="https://discord.gg/B5bCztAP4J"/>
                <SocialIcon icon={<FiYoutube className="w-6 h-6"/>} url="https://youtube.com"/>
                <SocialIcon icon={<FiGithub className="w-6 h-6"/>} url="https://github.com/saintedlittle"/>
              </div>
            </div>
          </div>

          {/* Центральный логотип (заполнитель для grid) */}
          <div className="hidden md:block"/>

          {/* Правый блок - Навигация */}
          <div className="grid grid-cols-2 gap-8 bg-[#0a0a0a]/90 p-6 border-2 border-[#1a1a1a] backdrop-blur-sm">
            <div className="space-y-4">
              <motion.h3
                className="text-xl font-minecraft text-[#6aee87] flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <RiSwordFill className="text-[#4CAF50]" />
                ИГРА
              </motion.h3>
              <div className="space-y-3">
                <LinkItem icon={<TbCube />} link={"/servers"} text="Режимы" />
                <LinkItem
                  icon={<FiAlertTriangle />}
                  link={"/documents"}
                  text="Правила"
                />
                <LinkItem icon={<TbPrison />} link={"/punishments"} text="Наказания" />
              </div>
            </div>

            <div className="space-y-4">
              <motion.h3
                className="text-xl font-minecraft text-[#6aee87] flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-[#4CAF50]">✦</span>
                ИНФО
              </motion.h3>
              <div className="space-y-3">
                <LinkItem icon="⚔️" link={"/store"} text="Магазин" />
                <LinkItem icon="🛡️" link={"/feedback"} text="Поддержка" />
                <LinkItem icon="📜" link={"/documents"} text="Документы" />
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя панель */}
        <motion.div
          animate={{ opacity: 1 }}
          className="mt-16 pt-6 border-t-2 border-[#1a1a1a] flex flex-col md:flex-row justify-between gap-4"
          initial={{ opacity: 0 }}
        >
          <div className="text-[#5a5f65] text-xs font-minecraft space-y-1">
            <p>ОГРНИП 1234567890123 · ИП Фёдоров Д.В.</p>
            <p className="text-[#6a6a6a]">
              RISE OF THE BLACK SUN не связан с Mojang AB. Коммерческая
              деятельность соответствует политике Mojang AB
            </p>
          </div>

          <div className="flex items-center gap-2 text-[#5a5f65] font-minecraft">
            <motion.div
              animate={{ scale: 1 }}
              className="w-3 h-3 bg-[#4CAF50] animate-pulse"
              initial={{ scale: 0 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <span>2024 — Все права защищены.</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, url }: { icon: React.ReactNode; url?: string }) => {
  const Wrapper = url ? "a" : "div";

  return (
    <Wrapper
      href={url}
      rel={url ? "noopener noreferrer" : undefined}
      target={url ? "_blank" : undefined}
    >
      <motion.div
        className="p-3 border-2 border-[#1a1a1a] bg-[#0f0f0f] cursor-pointer hover:border-[#4CAF50] transition-all"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="text-[#6aee87] hover:text-[#8affa8] transition-colors">
          {icon}
        </div>
      </motion.div>
    </Wrapper>
  );
};

const LinkItem = ({
  text,
  icon,
  link,
}: {
  text: string;
  icon: React.ReactNode;
  link: string;
}) => (
  <motion.div whileHover={{ x: 5 }}>
    <a
      className="flex items-center gap-2 text-[#8a8a8a] hover:text-[#6aee87] font-minecraft group"
      href={link}
    >
      <span className="text-[#4CAF50] transition-transform group-hover:scale-125">
        {icon}
      </span>
      {text}
    </a>
  </motion.div>
);
