"use client"
import {useRef, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { Button, Snippet } from "@heroui/react";
import { motion, useInView, useTransform } from "framer-motion";
import Image from "next/image";
import { FiZap, FiArrowRight, FiCode, FiStar, FiHexagon } from "react-icons/fi";
import { useTheme } from "next-themes";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import {siteConfig} from "@/config/site";

const developers = [
  {
    name: "saintedlittle",
    role: "Главный разработчик",
    avatar: "https://riseoftheblacksun.eu/developers/saintedlittle.jpg",
  },
  {
    name: ".nika",
    role: "Дизайнер миров",
    avatar: "https://riseoftheblacksun.eu/developers/nika.jpg",
  },
  {
    name: "f0x1y",
    role: "Системный архитектор",
    avatar: "https://riseoftheblacksun.eu/developers/fox1y.jpg",
  },
];

const features = [
  {
    title: "Уникальные миры",
    description: "Эпические ландшафты с динамической генерацией",
    image: "https://riseoftheblacksun.eu/promo_3.webp",
  },
  {
    title: "Командные сражения",
    description: "PvP и PvE режимы с системой кланов",
    image: "https://riseoftheblacksun.eu/promo_1.webp",
    reversed: true,
  },
  {
    title: "Кастомизация",
    description: "Тысячи скинов и уникальных предметов",
    image: "https://riseoftheblacksun.eu/promo_2.webp",
  },
];

const HeroSection = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const [init, setInit] = useState(false);

  // Инициализация частиц
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions: ISourceOptions = {
    background: { color: { value: "transparent" } },
    particles: {
      number: { value: 80 },
      color: { value: "#06b6d4" },
      opacity: { value: { min: 0.1, max: 0.5 } },
      size: { value: { min: 1, max: 3 } },
      move: {
        enable: true,
        speed: { min: 0.5, max: 2 },
        direction: "none",
        random: true,
        straight: false,
      },
    },
  };

  // Анимированный градиентный фон
  const gradientMotion = {
    initial: { backgroundPosition: "0% 50%" },
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: { duration: 15, repeat: Infinity },
    },
  };

  // Геометрические формы
  const shapes = Array(12).fill(null).map((_, i) => ({
    id: i,
    style: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      rotate: Math.random() * 360,
      scale: 0.5 + Math.random(),
    },
  }));

  return (
      <section className="relative overflow-hidden min-h-screen">
        {/* Анимированный градиентный фон */}
        <motion.div
            className="absolute inset-0 z-0"
            initial="initial"
            animate="animate"
            variants={gradientMotion}
            style={{
              background: `
            linear-gradient(
              45deg,
              hsl(192, 100%, 15%),
              hsl(201, 100%, 25%),
              hsl(216, 100%, 35%),
              hsl(234, 100%, 45%)
          `,
              backgroundSize: "400% 400%",
            }}
        />

        {/* Плавающие геометрические формы */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {shapes.map((shape) => (
              <motion.div
                  key={shape.id}
                  className="absolute w-24 h-24 border-2 border-cyan-400/20 rounded-3xl"
                  initial={{ ...shape.style, opacity: 0 }}
                  animate={{
                    opacity: [0, 0.3, 0],
                    y: [0, -100],
                    x: [0, (Math.random() - 0.5) * 200],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
              />
          ))}
        </div>

        {/* Частицы */}
        {init && (
            <Particles
                id="tsparticles"
                className="absolute "
                options={particlesOptions}
            />
        )}

        {/* Основной контент */}
        <div className="relative z-30 container mx-auto px-4 lg:px-8 max-w-7xl min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Текстовый блок */}
            <div className="space-y-8 relative">
              <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />

              <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl md:text-8xl font-extrabold leading-tight"
              >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Новая эра
              </span>
                <span className="block mt-4 text-3xl md:text-4xl font-semibold text-cyan-200">
                Minecraft-приключений
              </span>
              </motion.h1>

              <motion.p
                  className="text-xl md:text-2xl text-cyan-100 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
              >
                Это целая платформа для развлечений, построенная на базе Minecraft. Присоединяйся к сообществу, где каждый блок - история.
              </motion.p>

              {/* Интерактивные кнопки */}
              <motion.div
                  className="flex flex-wrap gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
              >
                <Button
                    className="group relative overflow-hidden bg-gradient-to-r from-cyan-600/30 to-blue-700/30 backdrop-blur-xl border border-cyan-400/30 hover:border-cyan-400/50 rounded-2xl p-px"
                    size="lg"
                    onPress={() => router.push("/play")}
                >
                  <span className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all" />
                  <div className="relative flex items-center gap-3 px-8 py-6 text-lg font-semibold text-cyan-100">
                    <FiHexagon className="text-2xl animate-spin-slow" />
                    Начать путешествие
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </Button>

                <Snippet
                    hideCopyButton
                    className="bg-white/5 border border-cyan-400/20 hover:border-cyan-400/40 backdrop-blur-xl rounded-2xl overflow-hidden"
                    symbol=""
                >
                  <div className="flex items-center gap-3 px-6 py-4">
                    <div className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="font-mono text-cyan-400">
                    {siteConfig.ipaddress}
                  </span>
                  </div>
                </Snippet>
              </motion.div>
            </div>

            {/* 3D голограмма */}
            <motion.div
                className="relative h-[600px] rounded-[4rem] overflow-hidden border-2 border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-blue-600/20 backdrop-blur-xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
            >
              <Image
                  fill
                  src="https://riseoftheblacksun.eu/big_image.png"
                  alt="Hologram"
                  className="object-cover mix-blend-luminosity"
              />

            </motion.div>
          </div>
        </div>

        {/* Дополнительные секции */}
        <SectionParallaxCards />
        <MinecraftShowcase />
        <QuantumDeveloperCards />
      </section>
  );
};

// Дополнительные компоненты секций
const SectionParallaxCards = () => (
    <section className="relative py-32">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <h2 className="text-4xl font-bold text-cyan-200 mb-16 text-center">
          Уникальные возможности
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
              <motion.div
                  key={i}
                  className="relative h-96 bg-gradient-to-br from-cyan-500/10 to-blue-600/20 border border-cyan-400/20 rounded-3xl overflow-hidden group"
                  whileHover="hover"
                  initial="initial"
              >
                <Image
                    fill
                    src={feature.image}
                    alt={feature.title}
                    className="object-cover transform-gpu group-hover:scale-105 transition-transform"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-cyan-200">{feature.description}</p>
                </div>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
);

const QuantumDeveloperCards = () => {
  return (
      <section className="relative py-32">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <h2 className="text-4xl font-bold text-cyan-200 mb-16 text-center">
            Наша команда
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {developers.map((dev, i) => (
                <div
                    key={i}
                    className="relative h-96 bg-gradient-to-br from-cyan-500/10 to-blue-600/20 border border-cyan-400/20 rounded-3xl overflow-hidden group"
                >
                  <Image
                      fill
                      src={dev.avatar}
                      alt={dev.name}
                      className="object-cover grayscale group-hover:grayscale-0 transition-all"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-cyan-400">{dev.name}</h3>
                    <p className="text-cyan-300">{dev.role}</p>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-cyan-400/10 rounded-full flex items-center justify-center border border-cyan-400/20">
                      <FiHexagon className="animate-spin-slow" />
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};

const MinecraftShowcase = () => {
  const showcaseItems = [
    {
      title: "Мир Пустоши",
      image: "https://gameguru.ru/media/cache/82/f5/82f52afe5f6806601f2701fe7dc6f362.jpg",
      description: "Исследуй разрушенные города и заброшенные замки.",
    },
    {
      title: "Огненные глубины",
      image: "https://sun9-56.userapi.com/s/v1/ig2/aARlNXynMaa8-VijkoYAxhGrTZDz42eqRlSSoLYebuuSzK5cRHikiLuSYcnR6Tc-3ryBc3hQ-U_Bs7xnXeNxOORb.jpg?quality=95&as=32x22,48x34,72x50,108x76,160x112,240x168,360x252,480x336,540x378,640x448,720x504,1080x756,1280x896,1440x1008,2058x1440&from=bu&u=qGDJ4XS02GAAmp-2kjAD-IxR3NlQl2uTcnCG_CmLIZ0&cs=807x565",
      description: "Погрузись в лавовые пещеры и найди древние сокровища.",
    },
    {
      title: "Ледяные просторы",
      image: "https://vkplay.ru/hotbox/content_files/news/2022/06/07/51ea399e016a48efa00d636171e83d7e.jpg",
      description: "Прокладывай путь через снежные бури и ледяные лабиринты.",
    },
    {
      title: "Таинственные джунгли",
      image: "https://www.gamepur.com/wp-content/uploads/2022/06/12125822/Minecraft-Legends.jpg",
      description: "Открой секреты древних цивилизаций и загадочные руины.",
    },
  ];
  return (
      <section className="relative py-32 bg-gradient-to-b ">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <h2 className="text-4xl font-bold text-cyan-200 mb-16 text-center">
            Исследуй новые миры
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {showcaseItems.map((item, i) => (
                <motion.div
                    key={i}
                    className="relative h-80 rounded-3xl overflow-hidden border border-cyan-400/20"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5 }}
                >
                  <Image fill src={item.image} alt={item.title} className="object-cover" />
                  <motion.div
                      className="absolute inset-0 flex flex-col justify-end p-6 bg-black bg-opacity-50"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-cyan-400">{item.title}</h3>
                    <p className="text-cyan-200">{item.description}</p>
                  </motion.div>
                </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default HeroSection;
