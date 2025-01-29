import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Button, Snippet } from "@heroui/react";
import { motion, useInView, useMotionValue } from "framer-motion";
import Image from "next/image";
import { FiZap, FiArrowRight, FiCode, FiStar } from "react-icons/fi";

import { siteConfig } from "@/config/site";

const developers = [
  {
    name: "saintedlittle",
    role: "Главный разработчик",
    avatar: "/developers/saintedlittle.jpg",
  },
  {
    name: ".nika",
    role: "Дизайнер миров",
    avatar: "/developers/nika.jpg",
  },
  {
    name: "f0x1y",
    role: "Системный архитектор",
    avatar: "/developers/fox1y.jpg",
  },
];

const features = [
  {
    title: "Уникальные миры",
    description: "Эпические ландшафты с динамической генерацией",
    image: "/promo_3.webp",
  },
  {
    title: "Командные сражения",
    description: "PvP и PvE режимы с системой кланов",
    image: "/promo_1.webp",
    reversed: true,
  },
  {
    title: "Кастомизация",
    description: "Тысячи скинов и уникальных предметов",
    image: "/promo_2.webp",
  },
];

const HeroSection = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  const motionValueX = useMotionValue(0);
  const motionValueY = useMotionValue(0);
  const motionValueScale = useMotionValue(1);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = x - rect.width / 2;
    const centerY = y - rect.height / 2;

    motionValueX.set(centerX / 20);
    motionValueY.set(centerY / 20);
    motionValueScale.set(1.05);
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15 + 0.3,
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950"
      onMouseMove={handleMouseMove}
    >
      {/* Hero Section */}
      <motion.div className="h-screen flex items-center justify-center sticky top-0 py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Text Content */}
            <div className="relative z-10 space-y-6 lg:w-1/2">
              <motion.div
                animate={isInView ? "visible" : "hidden"}
                className="space-y-6"
                initial="hidden"
              >
                <motion.div custom={0} variants={fadeInVariants}>
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight">
                    Новое измерение
                    <span className="block mt-3 text-3xl md:text-5xl font-semibold text-white">
                      Minecraft-приключений
                    </span>
                  </h1>
                </motion.div>

                <motion.p
                  className="text-lg md:text-xl text-gray-300 leading-relaxed"
                  custom={1}
                  variants={fadeInVariants}
                >
                  {siteConfig.description} Присоединяйся к сообществу, где
                  каждый блок - история.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 items-start"
                  custom={2}
                  variants={fadeInVariants}
                >
                  <Button
                    className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white shadow-2xl"
                    endContent={<FiArrowRight className="text-xl" />}
                    size="lg"
                    onPress={() => router.push("/play")}
                  >
                    Начать играть
                  </Button>
                  <Snippet
                    hideCopyButton
                    className="bg-white/10 border-white/20 h-[46px]"
                    color="secondary"
                    radius="lg"
                    symbol=""
                  >
                    <span className="font-mono text-cyan-400">
                      {siteConfig.ipaddress}
                    </span>
                  </Snippet>
                </motion.div>
              </motion.div>
            </div>

            {/* 3D Image */}
            <motion.div
              className="hidden lg:block lg:w-1/3 relative h-[400px] cursor-grab active:cursor-grabbing"
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Main 3D Container */}
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden transform-style-preserve-3d">
                {/* Base Shadow */}
                <div className="absolute inset-0 rounded-[3rem] shadow-[0_25px_50px_-12px_rgba(34,211,238,0.3)]" />

                {/* Gradient Layers */}
                <div className="absolute inset-0 border-4 border-white/5 rounded-[3rem] transform-style-preserve-3d">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/30 rounded-[3rem]">
                    {/* Main Image */}
                    <motion.div
                      className="absolute inset-0 overflow-hidden rounded-[3rem]"
                      transition={{ type: "spring", stiffness: 300 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Image
                        fill
                        alt="Minecraft World"
                        className="object-cover transform-gpu scale-110"
                        quality={100}
                        src={siteConfig.big_image}
                        style={{
                          transform: "translateZ(50px) scale(1.2)",
                          transformStyle: "preserve-3d",
                        }}
                      />
                    </motion.div>

                    {/* Edge Glow */}
                    <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_0_30px_10px_rgba(34,211,238,0.2)]" />
                  </div>
                </div>

                {/* Floating Particles */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -40],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0],
                      }}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] bg-cyan-500/20 rounded-full blur-[150px]"
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />
          <motion.div
            animate={{
              x: ["-20%", "20%", "-20%"],
              scale: [0.8, 1.2, 0.8],
            }}
            className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/15 rounded-full blur-[100px]"
            transition={{
              duration: 12,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-20 space-y-24">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`flex flex-col ${feature.reversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true, margin: "-20%" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="lg:w-1/2 relative h-64 lg:h-[500px] w-full rounded-3xl overflow-hidden border-2 border-cyan-500/20 cursor-pointer shadow-2xl"
              whileHover={{
                scale: 1.05,
                y: -15,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <Image
                fill
                alt={feature.title}
                className="object-cover hover:scale-110 transition-transform duration-500"
                src={feature.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
              <div className="absolute inset-0 pulse-border" />
            </motion.div>

            <div className="lg:w-1/2 space-y-4">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                {feature.description}
              </p>
              <Button
                className="mt-4 text-cyan-400 hover:bg-white/5 hover:scale-105 transform transition-all"
                endContent={<FiArrowRight />}
                variant="flat"
              >
                Подробнее
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Cards Section */}
      <div className="py-20 bg-gradient-to-b from-gray-900/50 to-gray-950/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            viewport={{ once: true }}
            whileInView="visible"
          >
            {[
              {
                title: "Динамические события",
                icon: <FiZap className="text-4xl" />,
                description: "Ежедневные ивенты с уникальными наградами",
              },
              {
                title: "Кастомизация",
                icon: <FiCode className="text-4xl" />,
                description: "Собственные плагины и модификации",
              },
              {
                title: "Рейтинги",
                icon: <FiStar className="text-4xl" />,
                description: "Система достижений и таблицы лидеров",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all group relative overflow-hidden"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 20px 50px rgba(8, 145, 178, 0.3)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-cyan-400 mb-6 relative z-10">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 relative z-10">
                  {card.title}
                </h3>
                <p className="text-gray-300 relative z-10">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Developers Section */}
      <div className="py-20 container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Наша команда
          </h2>
          <p className="text-xl text-gray-300">
            Профессионалы, создающие ваш идеальный мир
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {developers.map((dev, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="relative w-48 h-48 rounded-full mb-6 overflow-hidden border-4 border-cyan-500/30 hover:border-cyan-400/50 transition-all shadow-2xl"
                whileHover={{
                  scale: 1.08,
                  rotate: Math.random() * 10 - 5,
                  boxShadow: "0 0 50px rgba(8,145,178,0.5)",
                }}
              >
                <Image
                  fill
                  alt={dev.name}
                  className="object-cover hover:scale-110 transition-transform"
                  src={dev.avatar}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">{dev.name}</h3>
              <p className="text-gray-400">{dev.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
