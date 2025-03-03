"use client";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowRight, FiHexagon } from "react-icons/fi";
import { useTheme } from "next-themes";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

// Данные для блоков
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
  },
  {
    title: "Кастомизация",
    description: "Тысячи скинов и уникальных предметов",
    image: "https://riseoftheblacksun.eu/promo_2.webp",
  },
];

const showcaseItems = [
  {
    title: "Мир Пустоши",
    image: "/test.jpg",
    description: "Исследуй разрушенные города и заброшенные замки.",
  },
  {
    title: "Огненные глубины",
    image: "/som.jpg",
    description: "Погрузись в лавовые пещеры и найди древние сокровища.",
  },
  {
    title: "Ледяные просторы",
    image: "/ice.jpg",
    description: "Прокладывай путь через снежные бури и ледяные лабиринты.",
  },
  {
    title: "Таинственные джунгли",
    image: "/jungle.webp",
    description: "Открой секреты древних цивилизаций и загадочные руины.",
  },
];

const testimonials = [
  {
    name: "saintedlittle",
    quote: "Эта платформа перевернула мой мир! Невероятные приключения и динамичный геймплей.",
    avatar: "/600.png",
  },
  {
    name: "Veterok",
    quote: "Никогда не думал, что Minecraft может быть таким захватывающим! Рекомендую всем.",
    avatar: "/601.png",
  },
  {
    name: "Xyloz",
    quote: "Каждый блок здесь — произведение искусства. Огромное спасибо разработчикам!",
    avatar: "/602.png",
  },
];

const faqItems = [
  {
    question: "Как начать играть?",
    answer: "Просто нажмите кнопку 'Начать путешествие' в главном меню и следуйте инструкциям.",
  },
  {
    question: "Можно ли играть бесплатно?",
    answer: "Да, базовый доступ бесплатный, но есть премиум-опции для расширенного опыта.",
  },
  {
    question: "Какие платформы поддерживаются?",
    answer: "Наш сервер оптимизирован для ПК. Поддержка телефонов - в разработке.",
  },
];

const partners = [
  {
    name: "Единая Россия",
    logo: "https://upload.wikimedia.org/wikipedia/ru/thumb/d/d5/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%BF%D0%B0%D1%80%D1%82%D0%B8%D0%B8_%22%D0%95%D0%B4%D0%B8%D0%BD%D0%B0%D1%8F_%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F%22.svg/1614px-%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%BF%D0%B0%D1%80%D1%82%D0%B8%D0%B8_%22%D0%95%D0%B4%D0%B8%D0%BD%D0%B0%D1%8F_%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F%22.svg.png",
  },
  {
    name: "NSDAP",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/NSDAP-Logo.svg/2048px-NSDAP-Logo.svg.png",
  },
  {
    name: "ОУН",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/OUN-B-01.svg/800px-OUN-B-01.svg.png",
  },
];

// ******************************************************************
// Компонент для сверхсложных, мега частиц, которые будут везде
// @ts-ignore
const megaParticlesOptions: ISourceOptions = {
  background: { color: { value: "#000000" } },
  fpsLimit: 60,
  particles: {
    // @ts-ignore
    number: { value: 300, density: { enable: true, // @ts-ignore
        area: 800 } },
    color: { value: ["#FF00FF", "#00FFFF", "#FFFF00", "#FFAA00", "#FF5500"] },
    shape: {
      type: ["circle", "star", "polygon"],
      // @ts-ignore
      polygon: { sides: 6 }
    },
    opacity: {
      value: { min: 0.2, max: 0.8 },
      // @ts-ignore
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0.2, sync: false },
    },
    size: {
      value: { min: 1, max: 4 },
      // @ts-ignore
      random: true,
      anim: { enable: true, speed: 2, size_min: 0.5, sync: false },
    },
    rotate: {
      value: { min: 0, max: 360 },
      random: true,
      animation: { enable: true, speed: 3, sync: false },
    },
    move: {
      enable: true,
      speed: { min: 1, max: 3 },
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" },
    },
    links: {
      enable: true,
      distance: 100,
      color: "#ffffff",
      opacity: 0.2,
      width: 1,
    },
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: { enable: true, mode: ["grab", "repulse"] },
      onClick: { enable: true, mode: "push" },
      // @ts-ignore
      resize: true,
    },
    modes: {
      grab: { distance: 200, links: { opacity: 0.5 } },
      repulse: { distance: 150, duration: 0.4 },
      push: { quantity: 5 },
    },
  },
  detectRetina: true,
};

const MegaParticles = () => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  return init ? (
      <Particles id="megaparticles" className="absolute inset-0" options={megaParticlesOptions} />
  ) : null;
};

// ******************************************************************
// HERO SECTION с градиентным текстом, мега частицами и эффектной картинкой
const HeroSection = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Плавающие геометрические фигуры для дополнительного эффекта
  const shapes = Array(12)
      .fill(null)
      .map((_, i) => ({
        id: i,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          rotate: Math.random() * 360,
          scale: 0.5 + Math.random(),
        },
      }));

  return (
      <section ref={containerRef} className="relative overflow-hidden min-h-screen bg-black">
        {/* Мега частицы */}
        <MegaParticles />
        {/* Плавающие геометрические фигуры */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {shapes.map((shape) => (
              <motion.div
                  key={shape.id}
                  className="absolute w-24 h-24 border-2 border-gray-700/30 rounded-3xl"
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

        {/* Основной контент */}
        <div className="relative z-30 container mx-auto px-4 lg:px-8 max-w-7xl min-h-screen flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Текстовый блок с анимированным градиентом */}
            <div className="space-y-8 relative">
              <div className="absolute -top-20 -left-20 w-96 h-96 bg-black/30 rounded-full blur-[100px]" />
              <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl sm:text-6xl md:text-8xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              >
                Новая эра
                <span className="block mt-4 text-3xl md:text-4xl font-semibold">
                Minecraft-приключений
              </span>
              </motion.h1>
              <motion.p
                  className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
              >
                Это платформа, где каждый блок — шедевр, а каждое приключение – космический взрыв эмоций.
              </motion.p>
              <motion.div
                  className="flex flex-wrap gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
              >
                <Button
                    className="group relative overflow-hidden bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/30 hover:border-gray-600/50 rounded-2xl p-px"
                    size="lg"
                    onPress={() => router.push("/play")}
                >
                  <span className="absolute inset-0 bg-gray-800/10 group-hover:bg-gray-800/20 transition-all" />
                  <div className="relative flex items-center gap-3 px-8 py-6 text-lg font-semibold text-gray-100">
                    <FiHexagon className="text-2xl animate-spin-slow" />
                    Начать путешествие
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </Button>
              </motion.div>
            </div>

            {/* Геро-изображение с градиентным наложением */}
            <motion.div
                className="relative hidden sm:block h-[500px] md:h-[600px] rounded-[4rem] overflow-hidden border border-gray-700/30 bg-gradient-to-br from-black/70 to-black/90 backdrop-blur-xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
            >
              <Image
                  fill
                  src="https://riseoftheblacksun.eu/big_image.png"
                  alt="Hologram"
                  className="object-cover mix-blend-screen"
              />
            </motion.div>
          </div>
        </div>
      </section>
  );
};

// ******************************************************************
// Блок 2: Уникальные возможности
const UniqueFeatures = () => (
    <section className="relative py-32 bg-black">
      <MegaParticles />
      <div className="relative z-30 container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.h2
            className="text-4xl font-bold text-gray-100 mb-16 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
          Уникальные возможности
        </motion.h2>
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const initialAnim = i % 2 === 0 ? { x: -100, opacity: 0 } : { x: 100, opacity: 0 };
            return (
                <motion.div
                    key={i}
                    className="relative h-96 bg-gradient-to-br from-black/50 to-black/70 border border-gray-700/30 rounded-3xl overflow-hidden group"
                    initial={initialAnim}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: i * 0.2 }}
                    viewport={{ once: true }}
                >
                  <Image
                      fill
                      src={feature.image}
                      alt={feature.title}
                      className="object-cover transform-gpu group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-gray-300 mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
            );
          })}
        </div>
      </div>
    </section>
);

// ******************************************************************
// Блок 3: Исследуй новые миры
const ExploringWorlds = () => (
    <section className="relative py-32 bg-black">
      <MegaParticles />
      <div className="relative z-30 container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.h2
            className="text-4xl font-bold text-gray-100 mb-16 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
          Исследуй новые миры
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {showcaseItems.map((item, i) => (
              <motion.div
                  key={i}
                  className="relative h-80 rounded-3xl overflow-hidden border border-gray-700/30 group"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.5 }}
              >
                <Image fill src={item.image} alt={item.title} className="object-cover" />
                <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-6 bg-black bg-opacity-50 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <h3 className="text-2xl font-bold text-gray-300">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
);

// ******************************************************************
// Блок 4: Отзывы игроков
const PlayerTestimonials = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
      <section className="relative py-32 bg-black">
        <MegaParticles />
        <div className="relative z-30 container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.h2
              className="text-4xl font-bold text-gray-100 mb-16 text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
          >
            Отзывы игроков
          </motion.h2>
          <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
          >
            {testimonials.map((test, i) => (
                <motion.div
                    key={i}
                    className="relative bg-gray-900 border border-gray-700/30 rounded-3xl p-6 flex flex-col items-center text-center"
                    variants={itemVariants}
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <Image src={test.avatar} alt={test.name} width={96} height={96} className="object-cover" />
                  </div>
                  <p className="text-gray-300 mb-4">&ldquo;{test.quote}&rdquo;</p>
                  <h3 className="text-2xl font-bold text-gray-100">{test.name}</h3>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
  );
};

// ******************************************************************
// Блок 5: Наша команда
const OurTeam = () => (
    <section className="relative py-32 bg-black">
      <MegaParticles />
      <div className="relative z-30 container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.h2
            className="text-4xl font-bold text-gray-100 mb-16 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
          Наша команда
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {developers.map((dev, i) => (
              <div
                  key={i}
                  className="relative h-96 bg-gradient-to-br from-black/50 to-black/70 border border-gray-700/30 rounded-3xl overflow-hidden group"
              >
                <Image
                    fill
                    src={dev.avatar}
                    alt={dev.name}
                    className="object-cover grayscale group-hover:grayscale-0 transition-all"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-gray-300">{dev.name}</h3>
                  <p className="text-gray-500">{dev.role}</p>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gray-800/30 rounded-full flex items-center justify-center border border-gray-700/30">
                    <FiHexagon className="animate-spin-slow" />
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
);

// ******************************************************************
// Блок 7: Часто задаваемые вопросы (FAQ)
const FAQSection = () => (
    <section className="relative py-32 bg-black">
      <MegaParticles />
      <div className="relative z-30 container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.h2
            className="text-4xl font-bold text-gray-100 mb-16 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
          Часто задаваемые вопросы
        </motion.h2>
        <div className="space-y-6">
          {faqItems.map((item, i) => (
              <motion.div
                  key={i}
                  className="p-6 bg-gray-900 border border-gray-700/30 rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
              >
                <h3 className="text-xl font-bold text-gray-100">{item.question}</h3>
                <p className="text-gray-400 mt-2">{item.answer}</p>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
);

// ******************************************************************
// Блок 8: Наши партнёры
const PartnersSection = () => (
    <section className="relative py-32 bg-black">
      <MegaParticles />
      <div className="relative z-30 container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.h2
            className="text-4xl font-bold text-gray-100 mb-16 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
          Наши партнёры
        </motion.h2>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {partners.map((partner, i) => (
              <motion.div
                  key={i}
                  className="p-4 border border-gray-700/30 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
              >
                <Image src={partner.logo} alt={partner.name} width={120} height={60} className="object-contain" />
              </motion.div>
          ))}
        </div>
      </div>
    </section>
);

// ******************************************************************
const CombinedPage = () => (
    <>
      <HeroSection />
      <UniqueFeatures />
      <ExploringWorlds />
      <PlayerTestimonials />
      <FAQSection />
      <PartnersSection />
      <OurTeam />
    </>
);

export default CombinedPage;
