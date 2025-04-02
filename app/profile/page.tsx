//@ts-nocheck @ts-ignore
"use client";
import React, { useState, useEffect } from "react";
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

interface Transaction {
  user: string;
  amount: number;
  time: string;
  status?: string;
}

interface LoginHistoryItem {
  location: string;
  browser: string;
  date: string;
  isCurrent: boolean;
}

interface SkinItem {
  id: string;
  name: string;
  url: string;
  uploadDate: string;
  type: 'skin' | 'cape';
  active: boolean;
}

interface UploadLimits {
  skins: {
    used: number;
    total: number;
  };
  capes: {
    used: number;
    total: number;
  };
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

interface Transaction {
  user: string;
  amount: number;
  time: string;
}

interface LoginHistoryItem {
  location: string;
  browser: string;
  date: string;
  isCurrent: boolean;
}

interface UserProfileData {
  username: string;
  email: string;
  avatar: string;
  created_at: string;
  last_login: string;
}

const ProfileLayout = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  // Skin and cape management states
  const [skins, setSkins] = useState<SkinItem[]>([]);
  const [skinsLoading, setSkinsLoading] = useState(true);
  const [skinsError, setSkinsError] = useState<string | null>(null);
  const [uploadLimits, setUploadLimits] = useState<UploadLimits>({ 
    skins: { used: 0, total: 5 },
    capes: { used: 0, total: 3 }
  });
  const [skinFile, setSkinFile] = useState<File | null>(null);
  const [skinPreview, setSkinPreview] = useState<string | null>(null);
  const [capeFile, setCapeFile] = useState<File | null>(null);
  const [capePreview, setCapePreview] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<'skin' | 'cape'>('skin');
  const router = useRouter();
  
  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get("jwt");
        if (!token) {
          router.push("/login");
          return;
        }
        
        const response = await fetch("https://auth.riseoftheblacksun.eu/user/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
        } else {
          throw new Error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load user profile");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [router]);
  
  // Fetch skins and capes
  useEffect(() => {
    const fetchSkinsAndCapes = async () => {
      try {
        const token = Cookies.get("jwt");
        if (!token) {
          router.push("/login");
          return;
        }
        
        // Fetch skins and capes
        const response = await fetch("https://auth.riseoftheblacksun.eu/user/cosmetics", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setSkins(data.items || []);
          setUploadLimits(data.limits || { 
            skins: { used: 0, total: 5 },
            capes: { used: 0, total: 3 }
          });
        } else {
          throw new Error("Failed to fetch skins and capes");
        }
      } catch (error) {
        console.error("Error fetching skins and capes:", error);
        setSkinsError("Failed to load cosmetics");
      } finally {
        setSkinsLoading(false);
      }
    };
    
    if (activeTab === "skins") {
      fetchSkinsAndCapes();
    }
  }, [activeTab, router]);

  const sidebarItems = [
    { id: "profile", icon: <FiUser />, color: "#EF4444" },
    { id: "stats", icon: <FiActivity />, color: "#F97316" },
    { id: "purchases", icon: <FiDollarSign />, color: "#F59E0B" },
    { id: "friends", icon: <FiHeart />, color: "#22C55E" },
    { id: "clan", icon: <FiUsers />, color: "#3B82F6" },
    { id: "security", icon: <FiLock />, color: "#7C3AED" },
    { id: "skins", icon: <FiGlobe />, color: "#EC4899" },
  ];

  // Функция для обновления информации профиля
  const updateProfile = async (username: string, avatar?: string) => {
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
        setUserProfile(updatedData);
        return updatedData;
      } else {
        throw new Error("Не удалось обновить профиль");
      }
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
      throw error;
    }
  };
  
  // Функция для загрузки нового аватара
  const uploadAvatar = async (file: File) => {
    try {
      const token = Cookies.get("jwt");
      if (!token) {
        router.push("/login");
        return;
      }
      
      const formData = new FormData();
      formData.append("avatar", file);
      
      const response = await fetch("https://auth.riseoftheblacksun.eu/user/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserProfile(prev => prev ? {...prev, avatar: data.avatar} : null);
        setAvatarPreview(null);
        setAvatarFile(null);
        return data;
      } else {
        throw new Error("Не удалось загрузить аватар");
      }
    } catch (error) {
      console.error("Ошибка при загрузке аватара:", error);
      throw error;
    }
  };
  
  // Обработчик выбора файла аватара
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatarFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Обработчик отправки нового аватара
  const handleAvatarUpload = async () => {
    if (avatarFile) {
      try {
        await uploadAvatar(avatarFile);
      } catch (error) {
        console.error("Ошибка при загрузке аватара:", error);
      }
    }
  };
  
  // Handle skin or cape file selection
  const handleSkinChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'skin' | 'cape') => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      // Check file size (max 1MB)
      if (file.size > 1024 * 1024) {
        alert("Файл слишком большой. Максимальный размер: 1MB");
        return;
      }
      
      if (type === 'skin') {
        setSkinFile(file);
        
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setSkinPreview(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      } else {
        setCapeFile(file);
        
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setCapePreview(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };
  
  // Upload skin or cape
  const uploadCosmetic = async (file: File, type: 'skin' | 'cape', name: string) => {
    try {
      const token = Cookies.get("jwt");
      if (!token) {
        router.push("/login");
        return;
      }
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      formData.append("type", type);
      
      const response = await fetch("https://auth.riseoftheblacksun.eu/user/cosmetics", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        // Update skins list with new item
        setSkins(prev => [...prev, data.item]);
        // Update upload limits
        setUploadLimits(data.limits);
        // Reset previews
        if (type === 'skin') {
          setSkinFile(null);
          setSkinPreview(null);
        } else {
          setCapeFile(null);
          setCapePreview(null);
        }
        return data;
      } else {
        throw new Error(`Не удалось загрузить ${type === 'skin' ? 'скин' : 'плащ'}`);
      }
    } catch (error) {
      console.error(`Ошибка при загрузке ${type === 'skin' ? 'скина' : 'плаща'}:`, error);
      throw error;
    }
  };
  
  // Set active skin or cape
  const setActiveCosmetic = async (id: string, type: 'skin' | 'cape') => {
    try {
      const token = Cookies.get("jwt");
      if (!token) {
        router.push("/login");
        return;
      }
      
      const response = await fetch(`https://auth.riseoftheblacksun.eu/user/cosmetics/${id}/activate`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ type })
      });
      
      if (response.ok) {
        const data = await response.json();
        // Update skins list to reflect new active item
        setSkins(prev => prev.map(item => {
          if (item.type === type) {
            return { ...item, active: item.id === id };
          }
          return item;
        }));
        return data;
      } else {
        throw new Error(`Не удалось активировать ${type === 'skin' ? 'скин' : 'плащ'}`);
      }
    } catch (error) {
      console.error(`Ошибка при активации ${type === 'skin' ? 'скина' : 'плаща'}:`, error);
      throw error;
    }
  };
  
  // Delete skin or cape
  const deleteCosmetic = async (id: string) => {
    try {
      const token = Cookies.get("jwt");
      if (!token) {
        router.push("/login");
        return;
      }
      
      const response = await fetch(`https://auth.riseoftheblacksun.eu/user/cosmetics/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Remove item from skins list
        setSkins(prev => prev.filter(item => item.id !== id));
        // Update upload limits
        setUploadLimits(data.limits);
        return data;
      } else {
        throw new Error("Не удалось удалить косметический предмет");
      }
    } catch (error) {
      console.error("Ошибка при удалении косметического предмета:", error);
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
                      <div className="relative group">
                        <Avatar
                          className="w-20 h-20 border-2 border-red-500/30"
                          src={avatarPreview || (userProfile?.avatar || "https://mc-heads.net/avatar/Steve")}
                        />
                        <label htmlFor="avatar-upload" className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                          <span className="text-xs text-white">Изменить</span>
                        </label>
                        <input 
                          id="avatar-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleAvatarChange} 
                        />
                      </div>
                      {avatarPreview && (
                        <Button 
                          size="sm"
                          className="bg-red-500/20 text-red-400"
                          onClick={handleAvatarUpload}
                        >
                          Сохранить аватар
                        </Button>
                      )}
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">
                          {isLoading ? 'Загрузка...' : userProfile?.username || 'Player'}
                        </h3>
                        <p className="text-white/70 font-light">
                          Email: {isLoading ? 'Загрузка...' : userProfile?.email || 'email@example.com'}
                        </p>
                        <p className="text-white/70 font-light">
                          Аккаунт создан: {isLoading ? 'Загрузка...' : userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString('ru-RU') : 'Неизвестно'}
                        </p>
                        <p className="text-white/70 font-light">
                          Последний вход: {isLoading ? 'Загрузка...' : userProfile?.last_login ? new Date(userProfile.last_login).toLocaleDateString('ru-RU') : 'Неизвестно'}
                        </p>
                        {/* <Chip
                          className="border-red-500/30 text-red-500"
                          color="danger"
                          variant="bordered"
                        >
                          Легенда сервера
                        </Chip> */}
                      </div>
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
                  <div className="p-6 flex flex-col items-center justify-center text-center h-52">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <FiClock className="text-5xl text-orange-500 mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2">В разработке</h3>
                    <p className="text-white/70 max-w-md">
                      История ваших действий будет доступна в ближайшее время.
                    </p>
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
                  <div className="p-6 flex flex-col items-center justify-center text-center h-52">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <FiBox className="text-6xl text-red-500 mb-4" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-2">Достижения в разработке!</h3>
                      <p className="text-white/70 max-w-md">
                        Система достижений будет доступна в ближайшее время.
                      </p>
                  </div>
                </Card>

                <Card className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl">
                  <div className="p-6 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-red-500">
                      <FiGlobe className="inline-block mr-3" />
                      Мировая статистика
                    </h2>
                  </div>
                  <div className="p-6 flex flex-col items-center justify-center text-center h-52">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <FiBox className="text-6xl text-red-500 mb-4" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-2">Статистика в разработке</h3>
                      <p className="text-white/70 text-center max-w-md">
                        Подробная статистика будет доступна в ближайшее время.
                      </p>
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
      <div className="p-6 flex flex-col items-center justify-center text-center h-64">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <FiActivity className="text-6xl text-purple-500 mb-4" />
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">Функция в разработке</h3>
        <p className="text-white/70 max-w-md">
          Расширенная статистика будет доступна в ближайшее время. Мы работаем над тем, чтобы предоставить вам подробную информацию о вашей игровой активности.
        </p>
      </div>
    </Card>
  </motion.div>
);

const PurchaseHistoryExtended = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = Cookies.get("jwt");
        if (!token) {
          router.push("/login");
          return;
        }
        
        // Fetch user profile to get username
        const profileResponse = await fetch("https://auth.riseoftheblacksun.eu/user/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (!profileResponse.ok) {
          throw new Error("Failed to fetch user profile");
        }
        
        const profileData = await profileResponse.json();
        const username = profileData.username;
        
        // Fetch transactions
        const transactionsResponse = await fetch("https://shopservice.riseoftheblacksun.eu/transactions", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (transactionsResponse.ok) {
          const data = await transactionsResponse.json();
          setTransactions(data);
          
          // Filter transactions that match the user's username and sort by newest first
          const filtered = data
            .filter(t => t.user === username)
            .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
          
          setFilteredTransactions(filtered);
        } else {
          throw new Error("Failed to fetch transactions");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to load transactions");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTransactions();
  }, [router]);
  
  // Convert dollar amount to rubles (approximate conversion - 1 USD = 92 RUB)
  const convertToRubles = (dollarAmount: number) => {
    return Math.round(dollarAmount * 92);
  };
  
  // Calculate total in rubles
  const totalRubles = filteredTransactions.reduce((sum, t) => sum + convertToRubles(t.amount), 0);
  
  return (
    <motion.div {...animateProps} className="space-y-6">
      <Card className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-amber-500">
            <FiDollarSign className="inline-block mr-3" />
            История транзакций
          </h2>
          <Chip color="warning" variant="bordered">
            Всего: {totalRubles} ₽
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
            {isLoading ? (
              <div className="text-center p-4">
                <p className="text-white">Загрузка транзакций...</p>
              </div>
            ) : error ? (
              <div className="text-center p-4">
                <p className="text-red-400">{error}</p>
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="text-center p-4">
                <p className="text-white">История покупок пуста</p>
              </div>
            ) : (
              filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-white">{transaction.user}</h4>
                      <p className="text-white/70 text-sm">{transaction.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-500 font-bold">{convertToRubles(transaction.amount)} ₽</p>
                      <Chip color="success" size="sm">
                        {transaction.status || "Завершено"}
                      </Chip>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
const FriendsList = () => (
  <motion.div {...animateProps} className="space-y-6">
    <Card className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-pink-500">
          <FiHeart className="inline-block mr-3" />
          Друзья
        </h2>
      </div>
      <div className="p-6">
        <div className="py-12 flex flex-col items-center justify-center">
          <div className="bg-pink-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <FiHeart className="text-2xl text-pink-400" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Скоро будет доступно</h3>
          <p className="text-white/70 text-center max-w-md mb-6">
            Мы работаем над социальными функциями, которые позволят вам добавлять друзей, общаться и играть вместе.
          </p>
          <Button className="bg-pink-500/20 border-pink-500/30 text-pink-400">
            Получить уведомление
          </Button>
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
          Клановая система
        </h2>
      </div>
      <div className="p-6">
        <div className="py-12 flex flex-col items-center justify-center">
          <div className="bg-purple-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <FiUsers className="text-2xl text-purple-400" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Скоро будет доступно</h3>
          <p className="text-white/70 text-center max-w-md mb-6">
            Мы работаем над клановой системой, которая позволит вам создавать кланы, приглашать друзей, участвовать в битвах и рейдах.  
          </p>
          <div className="flex gap-4">
            <Button className="bg-purple-500/20 border-purple-500/30 text-purple-400">
              Получить уведомление
            </Button>
            <Button className="bg-white/5 text-white">
              Подробнее
            </Button>
          </div>
          
          <div className="mt-12 w-full">
            <h4 className="text-white/70 mb-4 text-center">Что будет доступно:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <div className="mx-auto bg-purple-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <FiShield className="text-xl text-purple-400" />
                </div>
                <h5 className="text-white mb-1">Битвы кланов</h5>
                <p className="text-white/70 text-sm">Сражайтесь с другими кланами за ресурсы</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <div className="mx-auto bg-purple-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <FiStar className="text-xl text-purple-400" />
                </div>
                <h5 className="text-white mb-1">Рейтинг кланов</h5>
                <p className="text-white/70 text-sm">Соревнуйтесь с другими кланами за первенство</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <div className="mx-auto bg-purple-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <FiBox className="text-xl text-purple-400" />
                </div>
                <h5 className="text-white mb-1">Клановые ресурсы</h5>
                <p className="text-white/70 text-sm">Собирайте ресурсы для улучшения вашего клана</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </motion.div>
);

const SecurityCenter = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [loginHistory, setLoginHistory] = useState<LoginHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const router = useRouter();
  
  // Fetch security data
  useEffect(() => {
    const fetchSecurityData = async () => {
      try {
        const token = Cookies.get("jwt");
        if (!token) {
          router.push("/login");
          return;
        }
        
        // Fetch 2FA status
        const response2FA = await fetch("https://auth.riseoftheblacksun.eu/user/2fa/status", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (response2FA.ok) {
          const data = await response2FA.json();
          setIs2FAEnabled(data.enabled);
        }
        
        // Fetch login history
        const responseHistory = await fetch("https://auth.riseoftheblacksun.eu/user/login-history", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (responseHistory.ok) {
          const historyData = await responseHistory.json();
          setLoginHistory(historyData);
        }
      } catch (error) {
        console.error("Error fetching security data:", error);
        setError("Failed to load security data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSecurityData();
  }, [router]);
  
  // Handle 2FA toggle
  const handle2FAToggle = async () => {
    try {
      const token = Cookies.get("jwt");
      if (!token) {
        router.push("/login");
        return;
      }
      
      const response = await fetch(`https://auth.riseoftheblacksun.eu/user/2fa/${is2FAEnabled ? 'disable' : 'enable'}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        setIs2FAEnabled(!is2FAEnabled);
        // If enabling 2FA, might need to handle QR code display or setup steps here
      }
    } catch (error) {
      console.error("Error toggling 2FA:", error);
    }
  };
  
  // Handle password change
  const handlePasswordChange = async () => {
    // Reset states
    setPasswordError(null);
    setPasswordSuccess(false);
    
    // Validate inputs
    if (!currentPassword) {
      setPasswordError("Введите текущий пароль");
      return;
    }
    
    if (!newPassword) {
      setPasswordError("Введите новый пароль");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError("Пароли не совпадают");
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError("Новый пароль должен быть не менее 8 символов");
      return;
    }
    
    try {
      const token = Cookies.get("jwt");
      if (!token) {
        router.push("/login");
        return;
      }
      
      const response = await fetch("https://auth.riseoftheblacksun.eu/user/change-password", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });
      
      if (response.ok) {
        setPasswordSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const errorData = await response.json();
        setPasswordError(errorData.message || "Ошибка смены пароля");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setPasswordError("Ошибка смены пароля");
    }
  };
  
  return (
    <motion.div {...animateProps} className="space-y-8">
      <Card className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-blue-500">
            <FiLock className="inline-block mr-3" />
            Безопасность аккаунта
          </h2>
        </div>
        <div className="p-6 space-y-6">
          {/* 2FA Toggle */}
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-white">Двухфакторная аутентификация</h3>
                <p className="text-white/70 text-sm">
                  Дополнительная защита аккаунта
                </p>
              </div>
              <Switch color="primary" isSelected={is2FAEnabled} onValueChange={handle2FAToggle} />
            </div>
          </div>

          {/* Login History */}
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="text-white mb-4">История входов</h3>
            {isLoading ? (
              <div className="text-center p-4">
                <p className="text-white">Загрузка истории входов...</p>
              </div>
            ) : error ? (
              <div className="text-center p-4">
                <p className="text-red-400">{error}</p>
              </div>
            ) : loginHistory.length === 0 ? (
              <div className="text-center p-4">
                <p className="text-white">История входов пуста</p>
              </div>
            ) : (
              <div className="space-y-3">
                {loginHistory.map((login, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-black rounded-lg"
                  >
                    <div>
                      <p className="text-white">{login.location} • {login.browser}</p>
                      <p className="text-white/70 text-sm">{login.date}</p>
                    </div>
                    <Chip color={login.isCurrent ? "success" : "default"} variant="dot">
                      {login.isCurrent ? "Текущий" : "Завершен"}
                    </Chip>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Password Change */}
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="text-white mb-4">Смена пароля</h3>
            <div className="space-y-4">
              {passwordError && (
                <div className="p-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg">
                  {passwordError}
                </div>
              )}
              
              {passwordSuccess && (
                <div className="p-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg">
                  Пароль успешно изменен!
                </div>
              )}
              
              <Input 
                label="Текущий пароль" 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Input 
                label="Новый пароль" 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input 
                label="Подтвердите новый пароль" 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button 
                className="bg-blue-500/20 border-blue-500/30 text-blue-400"
                onClick={handlePasswordChange}
              >
                Обновить пароль
              </Button>
            </div>
          </div>
          
          {/* Session Management */}
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="text-white mb-4">Управление сессиями</h3>
            <div className="space-y-4">
              <p className="text-white/70">Завершить все сессии кроме текущей</p>
              <Button 
                className="bg-red-500/20 border-red-500/30 text-red-400"
                onClick={() => {
                  // API call to terminate all other sessions
                }}
              >
                Выйти со всех устройств
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileLayout;
