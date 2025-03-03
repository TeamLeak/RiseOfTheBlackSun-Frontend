"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock } from "react-icons/fi";
import { GiCoins } from "react-icons/gi";
import Image from "next/image";
import { GlowingParticles } from "@/components/particles";

// Типы данных
type Package = {
  id: number;
  name: string;
  basePrice: number; // цена в рублях
  coins: number;
  bonus: number;
  image: string;
  features: string[];
};

type Transaction = {
  user: string;
  amount: number; // в рублях
  time: string;
};

type ShopData = {
  packages: Package[];
  transactions: Transaction[];
};

export default function ShopPage() {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<Package[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Загрузка данных с сервера
  async function fetchShopData() {
    try {
      const res = await fetch("/api/shop");
      const data: ShopData = await res.json();
      setPackages(data.packages);
      setTransactions(data.transactions);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchShopData();
  }, []);

  // Подсчёт монет (например, 1 рубль = 3 монеты)
  const calculateCoins = (amountRub: number) => {
    return Math.floor(amountRub * 3);
  };

  // Показываем анимированный прелоадер, пока данные не загружены
  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#080808]">
          <motion.div
              animate={{ rotate: 360 }}
              transition={{ loop: Infinity, duration: 1 }}
              className="w-16 h-16 border-4 border-t-[#FFD700] border-r-transparent rounded-full"
          />
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#080808] relative overflow-x-hidden">
        <GlowingParticles color="#FFD70020" density={70} />

        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-12">
          {/* Заголовок */}
          <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent"
          >
            RISE OF THE BLACK SUN | ПОПОЛНЕНИЕ
          </motion.h1>

          {/* Форма пополнения */}
          <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#0a0a0a] border-2 border-[#FFD700]/30 rounded-xl p-8 relative overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,transparent,rgba(255,215,0,0.15))] animate-shine" />
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Пополнение баланса
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block mb-2 text-lg">Имя пользователя</label>
                <motion.input
                    type="text"
                    placeholder="Ваш никнейм"
                    required
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 text-lg">
                  Сумма пополнения (в рублях)
                </label>
                <motion.input
                    type="number"
                    placeholder="Введите сумму"
                    required
                    value={amount}
                    whileFocus={{ scale: 1.02 }}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
                />
              </div>
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-[#1a1a1a] rounded-lg flex items-center gap-3"
              >
                <GiCoins className="text-2xl text-[#FFD700]" />
                <span className="text-xl">
                Вы получите: {calculateCoins(parseFloat(amount) || 0)} монет
              </span>
              </motion.div>
              <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg"
              >
                <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="accent-[#FFD700] scale-125"
                />
                <span className="text-lg">
                Я согласен с условиями публичной оферты
              </span>
              </motion.div>
              <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-lg font-bold shadow-lg hover:shadow-2xl transition-shadow"
              >
                Пополнить баланс
              </motion.button>
            </form>
          </motion.div>

          {/* Карточки наборов */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
                <motion.div
                    key={pkg.id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative bg-[#1a1a1a] rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all"
                    onClick={() => setSelectedPackage(pkg)}
                >
                  <div className="relative h-56">
                    <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="flex items-center gap-3 text-[#FFD700] mb-4">
                      <GiCoins className="text-3xl" />
                      <span className="text-3xl font-semibold">
                    {pkg.basePrice} ₽
                  </span>
                    </div>
                    <ul className="list-disc pl-5 space-y-2 text-lg text-gray-300">
                      {pkg.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="absolute top-4 right-4 bg-[#FFD700] text-black px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    -20%
                  </div>
                </motion.div>
            ))}
          </div>

          {/* Блок последних покупок */}
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-[#0a0a0a] border-2 border-[#1a1a1a] rounded-xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FiClock className="text-[#FFD700]" />
              Последние покупки
            </h2>
            <div className="space-y-4">
              {transactions.map((tx, index) => (
                  <motion.div
                      key={index}
                      initial={{ x: -50 }}
                      animate={{ x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-between items-center p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#1a1a1a]/90 transition-colors shadow-md"
                  >
                    <div>
                      <h3 className="font-bold text-lg">{tx.user}</h3>
                      <p className="text-sm text-gray-400">{tx.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <GiCoins className="text-2xl text-[#FFD700]" />
                      <span className="text-xl font-semibold">+{tx.amount} ₽</span>
                    </div>
                  </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Модальное окно с детальной информацией о наборе */}
        <AnimatePresence>
          {selectedPackage && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-[#080808]/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
              >
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative bg-[#0a0a0a] rounded-xl border-2 border-[#FFD700] p-8 max-w-xl w-full shadow-2xl"
                >
                  <button
                      onClick={() => setSelectedPackage(null)}
                      className="absolute top-4 right-4 p-2 hover:bg-[#1a1a1a] rounded-full"
                  >
                    <FiX className="text-2xl text-white" />
                  </button>
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold">{selectedPackage.name}</h2>
                    <div className="relative h-80 rounded-xl overflow-hidden">
                      <Image
                          src={selectedPackage.image}
                          alt={selectedPackage.name}
                          fill
                          className="object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-4 text-[#FFD700]">
                      <GiCoins className="text-3xl" />
                      <span className="text-3xl font-bold">
                    {selectedPackage.basePrice} ₽
                  </span>
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-lg text-gray-300">
                      {selectedPackage.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setShowForm(true);
                          setSelectedPackage(null);
                        }}
                        className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-lg font-bold shadow-lg hover:shadow-2xl transition-shadow"
                    >
                      Купить сейчас
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
