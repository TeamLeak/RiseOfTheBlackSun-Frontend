"use client";
import React from 'react';

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useAnimation
} from "framer-motion";
import { Button } from "@heroui/react";
import Image from "next/image";
import {
  FiArrowRight,
  FiChevronsDown,
  FiCompass,
  FiHexagon,
  FiShield,
  FiUsers,
  FiShoppingCart,
  FiBookOpen
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { siteConfig } from "@/config/site";

// JSON с ссылками и маршрутами
const LINKS = {
  images: {
    promo1: "https://riseoftheblacksun.eu/promo_1.webp",
    promo2: "https://riseoftheblacksun.eu/promo_2.webp",
    promo3: "https://riseoftheblacksun.eu/promo_3.webp"
  },
  routes: {
    play: "/play",
    worlds: "/play",
    register: "/register",
    store: "/store"
  },
  guides: siteConfig.api.guide + "/ru/home"
};

// Константы
const CURSOR_SIZE = 24;
const PARTICLE_COUNT = 50;

// Данные для секций
const worlds = [
  {
    id: 1,
    name: "ПУСТОШЬ",
    description: "Выжженные земли, полные опасностей и сокровищ",
    image: LINKS.images.promo1,
    color: "red"
  },
  {
    id: 2,
    name: "ТУНДРА",
    description: "Ледяной мир с древними руинами и мистическими артефактами",
    image: LINKS.images.promo2,
    color: "blue"
  },
  {
    id: 3,
    name: "ДЖУНГЛИ",
    description: "Буйная растительность скрывает тайны исчезнувших цивилизаций",
    image: LINKS.images.promo3,
    color: "green"
  }
];

const features = [
  {
    title: "PVP АРЕНЫ",
    description: "Сражайся с другими игроками на специальных аренах с уникальными режимами",
    icon: FiShield,
    color: "from-red-500 to-red-600"
  },
  {
    title: "КЛАНЫ",
    description: "Создай свой клан, захватывай территории и участвуй в масштабных войнах",
    icon: FiUsers,
    color: "from-amber-500 to-orange-600"
  },
  {
    title: "КВЕСТЫ",
    description: "Выполняй захватывающие квесты с разветвленными сюжетными линиями",
    icon: FiCompass,
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "ЭКОНОМИКА",
    description: "Торгуй ресурсами, создавай империю, управляй рынком",
    icon: FiHexagon,
    color: "from-blue-500 to-violet-600"
  }
];

// Типы для компонентов
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

// Градиентный текст
const GradientText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 ${className}`}>
    {children}
  </span>
);

// Компонент для секций с адаптивными отступами
const Section = ({ children, className = "", id }: SectionProps) => (
  <section 
    id={id}
    className={`min-h-screen w-full flex flex-col justify-center py-8 md:py-12 relative ${className}`}
  >
    <div className="container mx-auto px-4 sm:px-6 md:px-8">
      {children}
    </div>
  </section>
);

// Анимированный заголовок секции с уменьшенными отступами на мобильных устройствах
const SectionHeading = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12 md:mb-16 max-w-3xl">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col space-y-2"
    >
      {subtitle && (
        <span className="text-red-500 uppercase tracking-wider text-sm font-medium mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-4xl md:text-6xl font-bold text-white">{children}</h2>
    </motion.div>
  </div>
);

// Компонент для отображения статистики
const StatCard = ({ value, label }: { value: string; label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="flex flex-col"
  >
    <div className="text-3xl md:text-4xl font-bold mb-2">{value}</div>
    <div className="text-sm text-white/50 uppercase tracking-wider">{label}</div>
  </motion.div>
);

// Типы для частиц
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

// Компонент частиц с плавной анимацией
const ParticleBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `rgba(255, ${Math.random() * 100 + 50}, ${Math.random() * 100 + 50}, ${Math.random() * 0.5 + 0.2})`
        });
      }
      setParticles(newParticles);
    };

    createParticles();
    const animate = () => {
      setParticles(prev =>
        prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
          y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight
        }))
      );
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            x: particle.x,
            y: particle.y,
          }}
        />
      ))}
    </div>
  );
};

// Компонент для 3D эффекта карточки
const Card3D = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        rotateX: 0,
        rotateY: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ rotateX: 20, rotateY: 20, opacity: 0 }}
      animate={controls}
      className={`transform-gpu perspective-1000 ${className}`}
    >
      <div className="transform-gpu hover:rotate-x-2 hover:rotate-y-2 transition-transform duration-300">
        {children}
      </div>
    </motion.div>
  );
};

// Анимированный градиентный фон
const GradientBackground = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(circle at center, rgba(255, 59, 48, 0.15) 0%, transparent 70%)",
        y: backgroundY,
        opacity
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
  );
};

// Компонент для анимированного текста
const AnimatedText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      });
    }
  }, [inView, controls]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={controls} className={className}>
      {text}
    </motion.div>
  );
};

// Компонент для интерактивной карточки мира
const InteractiveWorldCard = ({ world, onSelect }: { world: typeof worlds[0]; onSelect: () => void }) => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      });
    }
  }, [inView, controls]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={controls}
      // Если не мобильное устройство, применяем hover-эффекты
      whileHover={!isMobile ? { scale: 1.05, rotate: isHovered ? 0 : 2 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
      onClick={onSelect}
    >
      <Image
        src={world.image}
        alt={world.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        // Если мобильное устройство – всегда показываем подписи, иначе реагируем на hover
        animate={isMobile ? { opacity: 1, y: 0 } : { opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        className="absolute inset-0 flex flex-col justify-end p-6"
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">{world.name}</h3>
        <p className="text-white/70">{world.description}</p>
        <motion.div
          initial={{ width: 0 }}
          animate={isMobile || isHovered ? { width: 64 } : { width: 0 }}
          className="h-1 bg-red-500 mt-4 rounded-full"
        />
      </motion.div>
    </motion.div>
  );
};

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="rounded-xl overflow-hidden"
  >
    <div className="p-8 border-l-2 border-white/10 hover:border-red-500 transition-colors bg-white/5 backdrop-blur-sm h-full">
      <div className={`w-12 h-12 rounded-md bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
        <feature.icon className="text-white text-xl" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
      <p className="text-white/70">{feature.description}</p>
    </div>
  </motion.div>
);

// Компонент для прокрутки вверх
const ScrollToTopButton = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setVisible(latest > 300);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 p-3 bg-red-500 text-white rounded-full shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.1 }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const HeroSection = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [selectedWorld, setSelectedWorld] = useState<typeof worlds[0] | null>(null);

  // Анимация курсора
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorSize = useMotionValue(CURSOR_SIZE);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const cursorBackground = useMotionTemplate`radial-gradient(${cursorSize}px circle at ${cursorX}px ${cursorY}px, rgba(255, 59, 48, 0.15), transparent 80%)`;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursorX.set(clientX);
      cursorY.set(clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, [cursorX, cursorY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const handleCursorEnter = (multiplier: number = 3) => {
    cursorSize.set(CURSOR_SIZE * multiplier);
  };

  const handleCursorLeave = () => {
    cursorSize.set(CURSOR_SIZE);
  };

  return (
    <>
      <ParticleBackground />
      <GradientBackground />

      {/* Кастомный курсор */}
      <motion.div className="fixed inset-0 pointer-events-none z-50" style={{ background: cursorBackground }} />

      {/* Анимация загрузки */}
      <AnimatePresence>
        {!isReady && (
          <motion.div 
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="w-16 h-16 rounded-full border-t-2 border-red-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модальное окно для мира */}
      <AnimatePresence>
        {selectedWorld && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl rounded-xl overflow-hidden"
            >
              <Image
                src={selectedWorld.image}
                alt={selectedWorld.name}
                width={1200}
                height={800}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="text-4xl font-bold mb-2 text-white">{selectedWorld.name}</h2>
                <p className="text-xl text-white/70 mb-4">{selectedWorld.description}</p>
                <div className="flex gap-4">
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md"
                    onPress={() => router.push(LINKS.routes.worlds)}
                  >
                    Подробнее
                  </Button>
                  <Button
                    className="bg-transparent border border-white/30 text-white px-6 py-3 rounded-md"
                    onPress={() => setSelectedWorld(null)}
                  >
                    Закрыть
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Основной контейнер */}
      <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
        {/* Фиксированная навигация */}
        <motion.div 
          className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-30 mix-blend-difference"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <span className="text-white font-medium tracking-wider text-xs uppercase">ROBS</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-8 text-white/70 text-sm">
              {["features", "worlds", "community"].map((section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section);
                  }}
                  className="hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, letterSpacing: "2px" }}
                  onMouseEnter={() => handleCursorEnter(3)}
                  onMouseLeave={handleCursorLeave}
                >
                  {section === "features"
                    ? "Особенности"
                    : section === "worlds"
                    ? "Миры"
                    : "Сообщество"}
                </motion.a>
              ))}
            </div>
            <Button
              className="bg-transparent border border-white/20 hover:border-white rounded-full px-6 text-sm h-10"
              onPress={() => router.push(LINKS.routes.play)}
              onMouseEnter={() => handleCursorEnter(3)}
              onMouseLeave={handleCursorLeave}
            >
              Начать игру
            </Button>
          </div>
        </motion.div>

        {/* Секция 1: Главный экран */}
        <Section id="hero">
          <motion.div
            className="max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              variants={itemVariants}
            />
            <motion.div 
              className="mt-8 md:mt-16 mb-8 md:mb-10 relative"
              variants={itemVariants}
            >
              <motion.div 
                className="text-8xl md:text-[12rem] font-bold text-white leading-none tracking-tight"
                onMouseEnter={() => handleCursorEnter(5)}
                onMouseLeave={handleCursorLeave}
              >
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                  >
                    RISE
                  </motion.div>
                </div>
                <div className="ml-12 md:ml-24 overflow-hidden">
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500"
                  >
                    BLACK
                  </motion.div>
                </div>
                <div className="ml-24 md:ml-48 overflow-hidden">
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
                  >
                    SUN
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            <div className="max-w-xl">
              <motion.p 
                className="text-xl text-white/70 leading-relaxed mb-12"
                variants={itemVariants}
                onMouseEnter={() => handleCursorEnter(2)}
                onMouseLeave={handleCursorLeave}
              >
                Исследуй постапокалиптический мир, создавай свою историю и сражайся за выживание
                в нашем MMO-RPG сервере Minecraft
              </motion.p>
              <motion.div 
                className="flex items-center gap-6"
                variants={itemVariants}
              >
                <motion.button
                  className="group relative overflow-hidden rounded-full bg-red-500 text-white px-8 py-3 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => handleCursorEnter(3)}
                  onMouseLeave={handleCursorLeave}
                  onClick={() => router.push(LINKS.routes.play)}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Начать путешествие
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
                <motion.div
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => handleCursorEnter(3)}
                  onMouseLeave={handleCursorLeave}
                  onClick={() => scrollToSection('features')}
                >
                  <FiChevronsDown className="text-black text-xl" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </Section>

        {/* Секция 2: Особенности */}
        <Section id="features" className="bg-black/50 backdrop-blur-md">
          <SectionHeading subtitle="Особенности">
            Уникальные <GradientText>возможности</GradientText> для игроков
          </SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-24 p-8 border border-white/10 bg-white/5 rounded-xl backdrop-blur-sm"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold mb-4">Готов начать свое приключение?</h3>
                <p className="text-white/70 mb-8 md:mb-0">
                  Присоединяйся к тысячам игроков. Вступай в кланы, участвуй в войнах и стань легендой.
                </p>
              </div>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 rounded-md text-lg"
                onPress={() => router.push(LINKS.routes.register)}
                onMouseEnter={() => handleCursorEnter(3)}
                onMouseLeave={handleCursorLeave}
              >
                Создать аккаунт
              </Button>
            </div>
          </motion.div>
        </Section>

        {/* Секция 3: Миры */}
        <Section id="worlds">
          <SectionHeading subtitle="Исследуй">
            Уникальные <GradientText>миры</GradientText> для исследования
          </SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            {worlds.map((world) => (
              <Card3D key={world.id}>
                <InteractiveWorldCard 
                  world={world} 
                  onSelect={() => setSelectedWorld(world)} 
                />
              </Card3D>
            ))}
          </div>
        </Section>
      </div>
      <ScrollToTopButton />
    </>
  );
};

const CombinedPage = () => (
  <>
    <HeroSection />
  </>
);

export default CombinedPage;
