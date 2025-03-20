"use client";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, MotionValue } from "framer-motion";
import { Button } from "@heroui/react";
import Image from "next/image";
import { FiArrowRight, FiChevronsDown, FiCode, FiCompass, FiGlobe, FiHexagon, FiShield, FiStar, FiUsers } from "react-icons/fi";

// Константы
const CURSOR_SIZE = 24;

// Данные для секций
const worlds = [
  {
    id: 1,
    name: "ПУСТОШЬ",
    description: "Выжженные земли, полные опасностей и сокровищ",
    image: "https://riseoftheblacksun.eu/promo_1.webp",
    color: "red"
  },
  {
    id: 2,
    name: "ТУНДРА",
    description: "Ледяной мир с древними руинами и мистическими артефактами",
    image: "https://riseoftheblacksun.eu/promo_2.webp",
    color: "blue"
  },
  {
    id: 3,
    name: "ДЖУНГЛИ",
    description: "Буйная растительность скрывает тайны исчезнувших цивилизаций",
    image: "https://riseoftheblacksun.eu/promo_3.webp",
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

// Компонент для секций
const Section = ({ children, className = "", id }: SectionProps) => (
  <section 
    id={id}
    className={`min-h-screen w-full flex flex-col justify-center py-20 relative ${className}`}
  >
    <div className="container mx-auto px-8">
      {children}
    </div>
  </section>
);

// Анимированный заголовок секции
const SectionHeading = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-24 max-w-3xl">
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

// Компонент для отображения карточки мира
const WorldCard = ({ world, onSelect }: { world: typeof worlds[0]; onSelect: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
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
    <div className="absolute inset-0 flex flex-col justify-end p-6">
      <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">{world.name}</h3>
      <p className="text-white/70">{world.description}</p>
      <div className="h-1 w-16 bg-red-500 mt-4 rounded-full" />
    </div>
  </motion.div>
);

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

const HeroSection = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [selectedWorld, setSelectedWorld] = useState<typeof worlds[0] | null>(null);
  
  // Используем для анимации курсора
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorSize = useMotionValue(CURSOR_SIZE);
  
  // Трансформируем для плавной анимации скролла
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Стилизованный курсор
  const cursorBackground = useMotionTemplate`radial-gradient(${cursorSize}px circle at ${cursorX}px ${cursorY}px, rgba(255, 59, 48, 0.15), transparent 80%)`;

  // Плавный скролл к секции
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Отслеживаем движение курсора
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setCursorPosition({ x: clientX, y: clientY });
      
      // Плавная анимация курсора
      cursorX.set(clientX);
      cursorY.set(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Анимация загрузки
    const timer = setTimeout(() => setIsReady(true), 500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, [cursorX, cursorY]);

  // Анимированное появление контента
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const handleCursorEnter = (multiplier: number = 3) => {
    setIsHovering(true);
    cursorSize.set(CURSOR_SIZE * multiplier);
  };

  const handleCursorLeave = () => {
    setIsHovering(false);
    cursorSize.set(CURSOR_SIZE);
  };

  return (
    <>
      {/* Кастомный курсор эффект */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50"
        style={{ background: cursorBackground }}
      />

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

      {/* Модальное окно для просмотра мира */}
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
                    onPress={() => router.push("/worlds")}
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
        {/* Движущийся фоновый градиент */}
        <div className="fixed inset-0 bg-black">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255, 59, 48, 0.3) 0%, transparent 60%)`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
          />
        </div>

        {/* Сетка для минималистичного вида */}
        <div className="fixed inset-0 opacity-10">
          <div className="w-full h-full border-[0.5px] border-white/20 grid grid-cols-6">
            <div className="border-r border-white/20 h-full"></div>
            <div className="border-r border-white/20 h-full"></div>
            <div className="border-r border-white/20 h-full"></div>
            <div className="border-r border-white/20 h-full"></div>
            <div className="border-r border-white/20 h-full"></div>
          </div>
        </div>

        {/* Фиксированная навигация */}
        <motion.div 
          className="fixed top-0 left-0 right-0 p-8 flex justify-between items-center z-30 mix-blend-difference"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <span className="text-white font-medium tracking-wider text-xs uppercase">ROBS</span>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-8 text-white/70 text-sm">
              <motion.a 
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('features');
                }} 
                className="hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => handleCursorEnter(3)}
                onMouseLeave={handleCursorLeave}
              >
                Особенности
              </motion.a>
              <motion.a 
                href="#worlds"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('worlds');
                }}
                className="hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => handleCursorEnter(3)}
                onMouseLeave={handleCursorLeave}
              >
                Миры
              </motion.a>
              <motion.a 
                href="#community"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('community');
                }}
                className="hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => handleCursorEnter(3)}
                onMouseLeave={handleCursorLeave}
              >
                Сообщество
              </motion.a>
            </div>
            
            <Button
              className="bg-transparent border border-white/20 hover:border-white rounded-full px-6 text-sm h-10"
              onPress={() => router.push("/play")}
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
            {/* Градиентная линия */}
            <motion.div 
              className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-12"
              variants={itemVariants}
            />

            {/* Главный заголовок */}
            <motion.div 
              className="mt-24 mb-16 relative"
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

            {/* Подзаголовок и описание */}
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
                  onClick={() => router.push("/play")}
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
                onPress={() => router.push("/register")}
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
              <WorldCard 
                key={world.id} 
                world={world} 
                onSelect={() => setSelectedWorld(world)} 
              />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <Button
              className="border border-white/20 bg-transparent hover:bg-white/5 text-white rounded-full px-10 py-6"
              onPress={() => router.push("/worlds")}
              onMouseEnter={() => handleCursorEnter(3)}
              onMouseLeave={handleCursorLeave}
            >
              Исследовать все миры
            </Button>
          </motion.div>
        </Section>

        {/* Секция 4: Сообщество */}
        <Section id="community" className="bg-black/50 backdrop-blur-md">
          <SectionHeading subtitle="Сообщество">
            Присоединяйся к <GradientText>сообществу</GradientText> игроков
          </SectionHeading>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="aspect-square relative rounded-2xl overflow-hidden"
            >
              <Image
                src="https://riseoftheblacksun.eu/promo_2.webp"
                alt="Community Event"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-sm text-white/70 uppercase tracking-wider mb-2">
                  Еженедельное событие
                </div>
                <h3 className="text-2xl font-bold text-white">Турнир кланов</h3>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="text-xl text-white/70">
                Наше сообщество насчитывает тысячи активных игроков. Участвуй в событиях, 
                общайся с единомышленниками и стань частью живого мира.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold mb-2">Discord сервер</h4>
                  <p className="text-white/70 mb-4">Присоединяйся к нашему Discord для общения и поиска команды</p>
                  <Button
                    className="bg-[#5865F2] text-white rounded-md px-4 py-2"
                    onPress={() => window.open("https://discord.gg/example", "_blank")}
                  >
                    Присоединиться
                  </Button>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold mb-2">Социальные сети</h4>
                  <p className="text-white/70 mb-4">Следи за новостями и обновлениями в наших соцсетях</p>
                  <div className="flex gap-4">
                    <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                      <FiGlobe className="text-white" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                      <FiCode className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Секция 5: Подвал */}
        <footer className="relative bg-black py-16 border-t border-white/10">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div>
                <h3 className="text-lg font-bold mb-6">Rise of the Black Sun</h3>
                <p className="text-white/60 max-w-xs">
                  Погрузись в постапокалиптический мир Minecraft с уникальной RPG-системой
                </p>
              </div>
              
              <div>
                <h3 className="text-md font-bold mb-6">Навигация</h3>
                <ul className="space-y-3">
                  <li><a href="#hero" className="text-white/60 hover:text-white transition-colors">Главная</a></li>
                  <li><a href="#features" className="text-white/60 hover:text-white transition-colors">Особенности</a></li>
                  <li><a href="#worlds" className="text-white/60 hover:text-white transition-colors">Миры</a></li>
                  <li><a href="#community" className="text-white/60 hover:text-white transition-colors">Сообщество</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-md font-bold mb-6">Ресурсы</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">База знаний</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Техподдержка</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Правила сервера</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Обновления</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-md font-bold mb-6">Статистика</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/60">Игроков онлайн</span>
                    <span className="text-white font-bold">1,025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Миры</span>
                    <span className="text-white font-bold">50+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Кланы</span>
                    <span className="text-white font-bold">208</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Рейтинг</span>
                    <span className="text-white font-bold">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-white/40 text-sm mb-4 md:mb-0">
                © 2023 Rise of the Black Sun. Все права защищены.
              </div>
              
              <div className="flex gap-6">
                <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">Политика конфиденциальности</a>
                <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">Условия использования</a>
                <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">Контакты</a>
              </div>
            </div>
          </div>
        </footer>
        
        {/* Плавающие декоративные элементы */}
        <motion.div 
          className="fixed top-1/4 right-[15%] w-64 h-64 rounded-full"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255, 59, 48, 0.2) 0%, transparent 70%)',
            filter: 'blur(60px)',
            y,
            opacity
          }}
        />
        
        <motion.div 
          className="fixed bottom-1/4 left-[10%] w-48 h-48 rounded-full"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255, 149, 0, 0.15) 0%, transparent 70%)',
            filter: 'blur(50px)',
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
            opacity
          }}
        />
      </div>
    </>
  );
};

const CombinedPage = () => (
  <>
    <HeroSection />
  </>
);

export default CombinedPage;
