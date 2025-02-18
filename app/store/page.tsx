"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiX, FiClock } from "react-icons/fi";
import Image from "next/image";
import { GiCoins } from "react-icons/gi";

import { GlowingParticles } from "@/components/particles";

const CURRENCY_RATES = {
  RUB: { rate: 3, symbol: "₽" },
  USD: { rate: 100, symbol: "$" },
  EUR: { rate: 120, symbol: "€" },
};

type Package = {
  id: number;
  name: string;
  basePrice: number;
  coins: number;
  bonus: number;
  image: string;
  features: string[];
};

const packages: Package[] = [
  {
    id: 1,
    name: "Начальный набор",
    basePrice: 299,
    coins: 300,
    bonus: 30,
    image:
      "https://store-images.s-microsoft.com/image/apps.43152.14247769038588514.3ce72ba0-ff44-4b91-b1ca-eef499b58987.a75b6a42-9c31-452f-b8ec-e955d3ab3d00?q=90&w=480&h=270",
    features: ["300 монет", "Бонус 30 монет", "Стартовый набор вещей"],
  },
  {
    id: 2,
    name: "Продвинутый набор",
    basePrice: 599,
    coins: 600,
    bonus: 150,
    image:
      "https://assets.xboxservices.com/assets/f9/37/f9371673-913b-4fa6-b476-2d310434c273.jpg?n=Minecraft_Content-Placement-0_Realms-Better-Than-Ever_776x437.jpg",
    features: [
      "600 монет",
      "Бонус 150 монет",
      "Эксклюзивный скин",
      "Стартовый набор вещей",
      "Продвинутый набор вещей",
    ],
  },
  {
    id: 3,
    name: "Профессиональный набор",
    basePrice: 999,
    coins: 1200,
    bonus: 500,
    image:
      "https://www.minecraft.net/content/dam/minecraftnet/games/dungeons/key-art/Dungeons-PMP_Hero-Art_ParallaxB_1152x1152.jpg",
    features: [
      "1200 монет",
      "Бонус 500 монет",
      "Эксклюзивный скин",
      "Стартовый набор вещей",
      "Продвинутый набор вещей",
      "Профессиональный набор вещей",
    ],
  },
];

const recentTransactions = [
  { user: "User123", amount: 299, time: "5 мин назад" },
  { user: "MinePro", amount: 999, time: "12 мин назад" },
  { user: "Sk1nL0ver", amount: 599, time: "20 мин назад" },
];

const ShopPage = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<keyof typeof CURRENCY_RATES>("RUB");
  const [agreed, setAgreed] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showForm, setShowForm] = useState(false);

  const calculateCoins = (amount: number) => {
    return Math.floor(amount * CURRENCY_RATES[currency].rate);
  };

  const convertPrice = (price: number) => {
    const rate = CURRENCY_RATES[currency].rate / CURRENCY_RATES.RUB.rate;

    return Math.floor(price * rate);
  };

  return (
    <div className="min-h-screen bg-[#080808] relative overflow-x-hidden">
      <GlowingParticles color="#FFD70020" density={70} />

      {/* Header с выбором валюты */}
      <motion.header
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-[#1a1a1a]"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.h1
            animate={{ opacity: 1 }}
            className="text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
          >
            RISE OF THE BLACK SUN | ПОПОЛНЕНИЕ
          </motion.h1>

          <motion.select
            className="px-4 py-2 bg-[#1a1a1a] rounded-lg border border-[#FFD700] text-[#FFD700] cursor-pointer"
            value={currency}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onChange={(e) =>
              setCurrency(e.target.value as keyof typeof CURRENCY_RATES)
            }
          >
            {Object.entries(CURRENCY_RATES).map(([key, { symbol }]) => (
              <option key={key} className="bg-[#1a1a1a]" value={key}>
                {symbol} {key}
              </option>
            ))}
          </motion.select>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Основная форма с анимацией */}
        <motion.div
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#0a0a0a] border-2 border-[#FFD700]/20 rounded-xl p-8 relative overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(45deg,transparent_25%,#FFD70010_50%,transparent_75%)] bg-[length:250%_250%] animate-shine" />

          <h2 className="text-2xl font-bold mb-6">Пополнение баланса</h2>
          <form className="space-y-6">
            <div>
              <label className="block mb-2">Имя пользователя</label>
              <motion.input
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
                type="text"
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div>
              <label className="block mb-2">Сумма пополнения</label>
              <div className="flex gap-2">
                <motion.input
                  required
                  className="flex-1 px-4 py-3 bg-[#1a1a1a] rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
                  type="number"
                  value={amount}
                  whileFocus={{ scale: 1.02 }}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <motion.div
              animate={{ opacity: 1 }}
              className="p-4 bg-[#1a1a1a] rounded-lg flex items-center gap-3"
              initial={{ opacity: 0 }}
            >
              <GiCoins className="text-2xl text-[#FFD700]" />
              <span className="text-lg">
                Вы получите: {calculateCoins(parseFloat(amount) || 0)} монет
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <input
                checked={agreed}
                className="accent-[#FFD700] scale-125"
                type="checkbox"
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>Я согласен с условиями публичной оферты</span>
            </motion.div>

            <motion.button
              className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-lg font-bold shadow-lg hover:shadow-xl transition-shadow"
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ПОПОЛНИТЬ СЕЙЧАС
            </motion.button>
          </form>
        </motion.div>

        {/* Наборы с анимацией */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              animate={{ y: 0, opacity: 1 }}
              className="relative bg-[#1a1a1a] rounded-xl overflow-hidden cursor-pointer group"
              initial={{ y: 50, opacity: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPackage(pkg)}
            >
              <div className="relative h-48">
                <Image
                  fill
                  alt={pkg.name}
                  className="object-cover group-hover:scale-105 transition-transform"
                  src={pkg.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              <div className="p-4 space-y-3">
                <h3 className="text-xl font-semibold">{pkg.name}</h3>
                <div className="flex items-center gap-2 text-[#FFD700]">
                  <GiCoins className="text-2xl" />
                  <span className="text-2xl">
                    {convertPrice(pkg.basePrice)}{" "}
                    {CURRENCY_RATES[currency].symbol}
                  </span>
                  <span className="text-sm line-through opacity-50">
                    {convertPrice(pkg.basePrice * 1.2)}{" "}
                    {CURRENCY_RATES[currency].symbol}
                  </span>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  {pkg.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="absolute top-2 right-2 bg-[#FFD700]/80 text-black px-3 py-1 rounded-full text-sm font-bold">
                -20%
              </div>
            </motion.div>
          ))}
        </div>

        {/* Последние покупки внизу */}
        <motion.div
          animate={{ opacity: 1 }}
          className="bg-[#0a0a0a] border-2 border-[#1a1a1a] rounded-xl p-8"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FiClock className="text-[#FFD700]" /> Последние покупки
          </h2>
          <div className="grid gap-4">
            {recentTransactions.map((tx, index) => (
              <motion.div
                key={index}
                animate={{ x: 0 }}
                className="flex justify-between items-center p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#1a1a1a]/80 transition-colors"
                initial={{ x: -50 }}
                transition={{ delay: index * 0.1 }}
              >
                <div>
                  <h3 className="font-semibold">{tx.user}</h3>
                  <p className="text-sm text-[#666]">{tx.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <GiCoins className="text-[#FFD700]" />
                  <span className="text-[#FFD700]">
                    +{convertPrice(tx.amount)} {CURRENCY_RATES[currency].symbol}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Анимированная модалка */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-[#080808]/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              animate={{ scale: 1 }}
              className="relative bg-[#0a0a0a] rounded-xl border-2 border-[#FFD700] p-8 max-w-xl w-full mx-4"
              exit={{ scale: 0.8 }}
              initial={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 p-2 hover:bg-[#1a1a1a] rounded-full"
                onClick={() => setSelectedPackage(null)}
              >
                <FiX className="text-xl" />
              </button>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold">{selectedPackage.name}</h2>

                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    fill
                    alt={selectedPackage.name}
                    className="object-cover"
                    src={selectedPackage.image}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-4xl font-bold text-[#FFD700]">
                    <GiCoins />
                    {convertPrice(selectedPackage.basePrice)}{" "}
                    {CURRENCY_RATES[currency].symbol}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Включает:</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      {selectedPackage.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-lg font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowForm(true);
                      setSelectedPackage(null);
                    }}
                  >
                    КУПИТЬ СЕЙЧАС
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;
