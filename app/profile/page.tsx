//@ts-nocheck @ts-ignore
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Progress, Chip, Avatar, Input, Button } from "@heroui/react";
import {
  FiUser,
  FiShield,
  FiDollarSign,
  FiLock,
  FiClock,
  FiAward,
  FiUsers,
  FiStar,
  FiActivity,
  FiHeart,
  FiGlobe,
  FiBox,
} from "react-icons/fi";
import { Switch } from "@heroui/switch";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const animateProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: "easeInOut" },
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  color: string;
}

interface RadialProgressProps {
  title: string;
  value: number;
  color: string;
}

interface AchievementBadgeProps {
  unlocked: boolean;
  title: string;
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

interface AchievementBadgeProps {
  unlocked: boolean;
  title: string;
}

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  color: string;
}

interface RadialProgressProps {
  title: string;
  value: number; // Должно быть в пределах 0-100
  color: string;
}

const ProfileLayout = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();

  const sidebarItems = [
    { id: "profile", icon: <FiUser />, color: "#EF4444" },
    { id: "stats", icon: <FiActivity />, color: "#F97316" },
    { id: "purchases", icon: <FiDollarSign />, color: "#F59E0B" },
    { id: "friends", icon: <FiHeart />, color: "#22C55E" },
    { id: "clan", icon: <FiUsers />, color: "#3B82F6" },
    { id: "security", icon: <FiLock />, color: "#7C3AED" },
  ];

  // Функция для обновления информации профиля
  const updateProfile = async (username: string, avatar: string) => {
    try {
      const token = Cookies.get("jwt");
      if (!token) {
        router.push("/login");
        return;
      }
      
      const response = await fetch("https://auth.riseoftheblacksun.eu/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          username,
          avatar
        })
      });
      
      if (response.ok) {
        const updatedData = await response.json();
        // Обновить состояние пользователя
        return updatedData;
      } else {
        throw new Error("Не удалось обновить профиль");
      }
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
      throw error;
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="h-screen flex bg-black"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Анимированный сайдбар */}
      <motion.nav
        animate={{ x: 0 }}
        className="w-24 bg-black/50 backdrop-blur-md border-r border-white/10 flex flex-col items-center py-8 gap-5"
        initial={{ x: -100 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {sidebarItems.map((item) => (
          <motion.button
            key={item.id}
            className={`p-3 rounded-full transition-all relative group`}
            style={{
              background:
                activeTab === item.id
                  ? `linear-gradient(135deg, ${item.color}20, transparent)`
                  : "transparent",
              border: `2px solid ${activeTab === item.id ? item.color : "transparent"}`,
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveTab(item.id)}
          >
            <span
              className="text-2xl transition-colors"
              style={{
                color: activeTab === item.id ? item.color : "#64748b",
                filter:
                  activeTab === item.id
                    ? `drop-shadow(0 0 8px ${item.color}40)`
                    : "none",
              }}
            >
              {item.icon}
            </span>
            <div className="absolute left-full ml-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm capitalize">
                {item.id}
              </span>
            </div>
          </motion.button>
        ))}
      </motion.nav>

      {/* Основной контент с улучшенными анимациями */}
      <div className="flex-1 p-8 overflow-y-auto scroll-hidden">
        <AnimatePresence mode="wait">
          {/* Профиль */}
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              {...animateProps}
              className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-8"
            >
              {/* Левая колонка */}
              <div className="space-y-8">
                <Card className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl">
                  <div className="p-6 border-b border-white/10">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                      <FiUser className="inline-block mr-3 mb-1" />
                      Профиль игрока
                    </h2>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center gap-6">
                      <Avatar
                        className="w-20 h-20 border-2 border-red-500/30"
                        src="https://mc-heads.net/avatar/CyberWarrior"
                      />
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">
                          CyberWarrior
                        </h3>
                        <Chip
                          className="border-red-500/30 text-red-500"
                          color="danger"
                          variant="bordered"
                        >
                          Легенда сервера
                        </Chip>
                      </div>
                    </div>

                    <Progress
                      classNames={{
                        label: "text-white/70 text-sm",
                        value: "text-red-500",
                        track: "bg-white/10",
                        indicator:
                          "bg-gradient-to-r from-red-500 to-orange-500",
                      }}
                      label="Прогресс до следующего уровня"
                      size="lg"
                      value={75}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <StatCard
                        description="+12ч за последние 7 дней"
                        icon={<FiClock className="text-orange-500" />}
                        title="Игровое время"
                        value="542ч"
                      />
                      <StatCard
                        description="Лучший в клане"
                        icon={<FiShield className="text-amber-500" />}
                        title="Убийств"
                        value="2.4k"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl">
                  <div className="p-6 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-orange-500">
                      <FiActivity className="inline-block mr-3" />
                      Последние действия
                    </h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <ActivityItem
                      color="#EF4444"
                      description="Успешно завершен рейд 'Темное солнце'"
                      time="2 часа назад"
                      title="Победа в рейде"
                    />
                    <ActivityItem
                      color="#F97316"
                      description="Легендарный меч Солнечной ярости"
                      time="5 часов назад"
                      title="Приобретен предмет"
                    />
                  </div>
                </Card>
              </div>

              {/* Правая колонка */}
              <div className="space-y-8">
                <Card className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl">
                  <div className="p-6 border-b border-white/10">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-red-500">
                        <FiAward className="inline-block mr-3" />
                        Достижения
                      </h2>
                      <Chip color="danger" variant="bordered">
                        32/100
                      </Chip>
                    </div>
                  </div>
                  <div className="p-6 grid grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                      <AchievementBadge
                        key={i}
                        title={`Achievement ${i + 1}`}
                        unlocked={i < 4}
                      />
                    ))}
                  </div>
                </Card>

                <Card className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl">
                  <div className="p-6 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-red-500">
                      <FiGlobe className="inline-block mr-3" />
                      Мировая статистика
                    </h2>
                  </div>
                  <div className="p-6 grid grid-cols-3 gap-6">
                    <RadialProgress
                      color="#EF4444"
                      title="Завершено квестов"
                      value={85}
                    />
                    <RadialProgress
                      color="#F97316"
                      title="Собрано ресурсов"
                      value={63}
                    />
                    <RadialProgress
                      color="#F59E0B"
                      title="Пройдено земель"
                      value={91}
                    />
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Реализация других вкладок */}
          {activeTab === "stats" && <PlayerStats />}
          {activeTab === "purchases" && <PurchaseHistoryExtended />}
          {activeTab === "friends" && <FriendsList />}
          {activeTab === "clan" && <ClanDashboard />}
          {activeTab === "security" && <SecurityCenter />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Компонент статистической карточки
const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  description,
}) => (
  <motion.div
    className="bg-white/5 backdrop-blur-sm p-4 rounded-xl hover:bg-white/10 transition-colors border-l-2 border-white/10 hover:border-red-500"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center gap-3 mb-2">
      <span className="text-2xl">{icon}</span>
      <h3 className="text-white/70 font-medium">{title}</h3>
    </div>
    <div className="flex justify-between items-end">
      <span className="text-3xl font-bold text-red-500">{value}</span>
      <span className="text-sm text-white/50">{description}</span>
    </div>
  </motion.div>
);

// Компонент достижения
const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  unlocked,
  title,
}) => (
  <motion.div
    className={`aspect-square flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
      unlocked
        ? "bg-red-500/10 border-2 border-red-500/20 hover:border-red-500/40"
        : "bg-white/5 border-2 border-white/10 hover:border-white/20"
    }`}
    whileHover={{ scale: 1.05 }}
  >
    <FiAward
      className={`text-2xl ${unlocked ? "text-red-500" : "text-white/30"}`}
    />
    <span
      className={`text-center text-sm mt-2 ${unlocked ? "text-white/70" : "text-white/30"}`}
    >
      {title}
    </span>
  </motion.div>
);

// Компонент активности
const ActivityItem: React.FC<ActivityItemProps> = ({
  title,
  description,
  time,
  color,
}) => (
  <motion.div
    animate={{ opacity: 1 }}
    className="flex items-start gap-4 p-3 bg-white/5 backdrop-blur-sm rounded-xl border-l-2 border-white/10 hover:border-red-500"
    initial={{ opacity: 0 }}
  >
    <div className="w-2 h-12 rounded-full" style={{ background: color }} />
    <div className="flex-1">
      <h4 className="text-white font-medium">{title}</h4>
      <p className="text-white/70 text-sm">{description}</p>
      <span className="text-xs text-white/50 mt-1">{time}</span>
    </div>
  </motion.div>
);

// Радиальный прогресс
const RadialProgress: React.FC<RadialProgressProps> = ({
  title,
  value,
  color,
}) => (
  <motion.div
    className="flex flex-col items-center p-4"
    whileHover={{ scale: 1.05 }}
  >
    <div className="relative w-20 h-20 mb-3">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-white/10"
          cx="50"
          cy="50"
          fill="transparent"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
        />
        <circle
          className="transition-all duration-500 ease-out"
          cx="50"
          cy="50"
          fill="transparent"
          r="40"
          stroke={color}
          strokeDasharray={`${2 * Math.PI * 40}`}
          strokeDashoffset={`${2 * Math.PI * 40 * (1 - value / 100)}`}
          strokeLinecap="round"
          strokeWidth="8"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-bold"
        style={{ color }}
      >
        {value}%
      </span>
    </div>
    <span className="text-center text-white/70 text-sm">{title}</span>
  </motion.div>
);

const PlayerStats = () => (
  <motion.div {...animateProps} className="space-y-8">
    <Card className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          <FiActivity className="inline-block mr-3" />
          Расширенная статистика
        </h2>
      </div>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="text-white/70 mb-4">Активность за месяц</h3>
            <div className="h-48 bg-black rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              description="Соотношение 3.16"
              icon={<FiShield className="text-amber-500" />}
              title="Убийства/Смерти"
              value="3.8K/1.2K"
            />
            <StatCard
              description="+15% к прошлому месяцу"
              icon={<FiBox className="text-emerald-500" />}
              title="Собрано ресурсов"
              value="24.5k"
            />
          </div>
        </div>
        <div className="space-y-6">
          <RadialProgress color="#FF6B6B" title="Победы в PvP" value={82} />
          <RadialProgress color="#6C5CE7" title="Прогресс сезона" value={45} />
          <RadialProgress
            color="#4ECDC4"
            title="Завершение квестов"
            value={93}
          />
        </div>
      </div>
    </Card>
  </motion.div>
);

const PurchaseHistoryExtended = () => (
  <motion.div {...animateProps} className="space-y-6">
    <Card className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-amber-500">
          <FiDollarSign className="inline-block mr-3" />
          История транзакций
        </h2>
        <Chip color="warning" variant="bordered">
          Всего: $1,240
        </Chip>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Input placeholder="Поиск..." />
          <Input type="date" />
          <Input type="date" />
          <Button className="bg-amber-500/20 border-amber-500/30 text-amber-400">
            Фильтровать
          </Button>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-colors"
              whileHover={{ x: 5 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-white">Премиум набор #{i}</h4>
                  <p className="text-white/70 text-sm">12 мая 2024</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-500 font-bold">$29.99</p>
                  <Chip color="success" size="sm">
                    Завершено
                  </Chip>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  </motion.div>
);

const FriendsList = () => (
  <motion.div {...animateProps} className="space-y-6">
    <Card className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-pink-500">
          <FiHeart className="inline-block mr-3" />
          Друзья (87)
        </h2>
      </div>
      <div className="p-6 space-y-4">
        <Input
          placeholder="Поиск друзей..."
          startContent={<FiUser className="text-white/70" />}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              className="flex items-center p-3 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.01 }}
            >
              <Avatar
                className="w-12 h-12 mr-4"
                src={`https://mc-heads.net/avatar/Player${i}`}
              />
              <div className="flex-1">
                <h4 className="text-white">Player{i}</h4>
                <p className="text-white/70 text-sm">Онлайн 2ч назад</p>
              </div>
              <Button
                className="bg-pink-500/20 text-pink-400"
                size="sm"
                variant="flat"
              >
                Написать
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  </motion.div>
);

const ClanDashboard = () => (
  <motion.div {...animateProps} className="space-y-8">
    <Card className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-purple-500">
          <FiUsers className="inline-block mr-3" />
          Клан &#34;Dark Knights&#34;
        </h2>
      </div>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="text-white/70 mb-4">Статистика клана</h3>
            <div className="space-y-3">
              <StatCard
                description=""
                icon={<FiStar />}
                title="Рейтинг"
                value="#12"
              />
              <StatCard
                description=""
                icon={<FiShield />}
                title="Победы"
                value="1,240"
              />
              <StatCard
                description=""
                icon={<FiBox />}
                title="Ресурсы"
                value="45k"
              />
            </div>
          </div>
          <Button className="w-full bg-red-500/20 border-red-500/30 text-red-400">
            Покинуть клан
          </Button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="text-white/70 mb-4">Последние события</h3>
            <div className="space-y-3">
              <ActivityItem
                color="#6C5CE7"
                description="Player7 вступил в клан"
                time="2ч назад"
                title="Новый участник"
              />
              <ActivityItem
                color="#6aee87"
                description="Победа в рейде 'Dark Temple'"
                time="5ч назад"
                title="Рейд завершен"
              />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="text-white/70 mb-4">Участники</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Leader", "Officer", "Member", "Recruit"].map((role, i) => (
                <div
                  key={role}
                  className="flex items-center p-2 bg-black rounded-lg"
                >
                  <Avatar
                    className="w-8 h-8 mr-3"
                    src={`https://mc-heads.net/avatar/ClanMember${i}`}
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">ClanMember{i}</p>
                    <p className="text-white/70 text-xs">{role}</p>
                  </div>
                  <Chip color="secondary" size="sm">
                    {role}
                  </Chip>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  </motion.div>
);

const SecurityCenter = () => (
  <motion.div {...animateProps} className="space-y-8">
    <Card className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-blue-500">
          <FiLock className="inline-block mr-3" />
          Безопасность аккаунта
        </h2>
      </div>
      <div className="p-6 space-y-6">
        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-white">Двухфакторная аутентификация</h3>
              <p className="text-white/70 text-sm">
                Дополнительная защита аккаунта
              </p>
            </div>
            <Switch color="primary" />
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl">
          <h3 className="text-white mb-4">История входов</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-black rounded-lg"
              >
                <div>
                  <p className="text-white">Москва, RU • Chrome</p>
                  <p className="text-white/70 text-sm">12 мая 2024 14:32</p>
                </div>
                <Chip color={i === 1 ? "success" : "default"} variant="dot">
                  {i === 1 ? "Текущий" : "Завершен"}
                </Chip>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl">
          <h3 className="text-white mb-4">Смена пароля</h3>
          <div className="space-y-4">
            <Input label="Текущий пароль" type="password" />
            <Input label="Новый пароль" type="password" />
            <Button className="bg-blue-500/20 border-blue-500/30 text-blue-400">
              Обновить пароль
            </Button>
          </div>
        </div>
      </div>
    </Card>
  </motion.div>
);

export default ProfileLayout;
