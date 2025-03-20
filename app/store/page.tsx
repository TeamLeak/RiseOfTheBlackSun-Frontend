"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock } from "react-icons/fi";
import { GiCoins } from "react-icons/gi";
import Image from "next/image";

// URL для обращения к бекенду
const PAYMENT_API_URL =
    process.env.NEXT_PUBLIC_PAYMENT_API_URL ||
    "https://shopservice.riseoftheblacksun.eu/pay";

// URL для получения списка последних транзакций
const TRANSACTIONS_API_URL =
    process.env.NEXT_PUBLIC_TRANSACTIONS_API_URL ||
    "https://shopservice.riseoftheblacksun.eu/transactions";

// Значение системы налогообложения для всех товаров (из env)
const DEFAULT_TAXATION = process.env.NEXT_PUBLIC_DEFAULT_TAXATION || "osn";

// Хук для получения IP клиента через ipify
const useClientIP = () => {
  const [clientIP, setClientIP] = useState<string>("127.0.0.1");
  useEffect(() => {
    async function fetchIP() {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        if (res.ok) {
          const data = await res.json();
          setClientIP(data.ip);
        }
      } catch (error) {
        console.error("Ошибка получения IP:", error);
      }
    }
    fetchIP();
  }, []);
  return clientIP;
};

// ================================
// Типы данных магазина
// ================================
export type Package = {
  id: number;
  name: string;
  category: string;
  basePrice: number; // цена в рублях
  coins: number;
  bonus: number;
  image: string;
  features: string[];
};

export type Transaction = {
  user: string;
  amount: number; // в рублях
  time: string;
};

// ================================
// Типы для формирования Receipt
// ================================
export type ReceiptItem = {
  Name: string;
  Price: number; // в копейках
  Quantity: string;
  Amount: number; // в копейках
  Tax: string;
};

export type Receipt = {
  Email: string;
  Phone: string; // не передаём телефон – оставляем пустым
  Taxation: string;
  Items: ReceiptItem[];
};

// ================================
// Компонент: TopUpForm (Пополнение баланса)
// ================================
type TopUpFormProps = {
  onSubmit: (payload: any) => void;
  clientIP: string;
};

const TopUpForm = ({ onSubmit, clientIP }: TopUpFormProps) => {
  const [amount, setAmount] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [email, setEmail] = useState("");

  // Преобразование рублей в монеты (например, 1 рубль = 3 монеты)
  const calculateCoins = (amountRub: number) => Math.floor(amountRub * 3);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numericAmount = Math.round(parseFloat(amount) * 100);
    const payload = {
      order_id: "topup-" + Date.now(),
      amount: numericAmount,
      description: "Пополнение баланса",
      client_ip: clientIP,
      player_name: playerName,
      email: email,
      // Формируем чек с одной позицией "Пополнение баланса"
      receipt: {
        Email: email,
        Phone: "",
        Taxation: DEFAULT_TAXATION,
        Items: [
          {
            Name: "Пополнение баланса",
            Price: numericAmount,
            Quantity: "1",
            Amount: numericAmount,
            Tax: DEFAULT_TAXATION,
          },
        ],
      },
    };
    onSubmit(payload);
  };

  return (
      <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-[#0a0a0a] border border-[#FFD700]/30 rounded-xl p-6 relative overflow-hidden shadow-md"
      >
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,transparent,rgba(255,215,0,0.15))] animate-shine" />
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
          Пополнение баланса
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-base">Ваш никнейм</label>
            <motion.input
                type="text"
                placeholder="Введите никнейм"
                required
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                className="w-full px-3 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-base">Email</label>
            <motion.input
                type="email"
                placeholder="example@mail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                className="w-full px-3 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-base">
              Сумма пополнения (в рублях)
            </label>
            <motion.input
                type="number"
                placeholder="Введите сумму"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                className="w-full px-3 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
            />
          </div>
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-[#1a1a1a] rounded flex items-center gap-2"
          >
            <GiCoins className="text-xl text-[#FFD700]" />
            <span className="text-base">
              Вы получите: {calculateCoins(parseFloat(amount) || 0)} монет
            </span>
          </motion.div>
          <motion.button
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded font-bold shadow hover:shadow-lg transition-shadow"
          >
            Пополнить баланс
          </motion.button>
        </form>
      </motion.div>
  );
};

// ================================
// Компонент: ProductCard (Карточка товара)
// ================================
type ProductCardProps = {
  pkg: Package;
  onBuy: (pkg: Package) => void;
};

const ProductCard = ({ pkg, onBuy }: ProductCardProps) => {
  return (
      <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
          className="relative bg-[#1a1a1a] rounded overflow-hidden shadow hover:shadow-md transition flex flex-col"
      >
        {/* Изображение товара */}
        <div className="relative h-56 w-full">
          <Image
              src={pkg.image}
              alt={pkg.name}
              fill
              className="object-cover transition-transform duration-200 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        {/* Контент карточки */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
          <div className="flex items-center gap-2 text-[#FFD700] mb-2">
            <GiCoins className="text-2xl" />
            <span className="text-2xl font-semibold">{pkg.basePrice} ₽</span>
          </div>
          <ul className="list-disc pl-4 space-y-1 text-sm text-gray-300 flex-grow">
            {pkg.features.map((feature, i) => (
                <li key={i}>{feature}</li>
            ))}
          </ul>
          {/* Кнопка "Купить" расположена строго внизу карточки */}
          <motion.button
              whileHover={{ scale: 1.03, transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
              onClick={() => onBuy(pkg)}
              className="mt-4 w-full py-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded font-bold shadow transition"
          >
            Купить
          </motion.button>
        </div>
        {/* Метка скидки */}
        <div className="absolute top-2 right-2 bg-[#FFD700] text-black px-2 py-0.5 rounded text-xs font-bold shadow">
          -20%
        </div>
      </motion.div>
  );
};

// ================================
// Компонент: PurchaseModal (Модальное окно для покупки)
// ================================
type PurchaseModalProps = {
  purchaseItem: Package | null;
  onClose: () => void;
  onSubmit: (payload: any) => void;
  clientIP: string;
};

const PurchaseModal = ({
                         purchaseItem,
                         onClose,
                         onSubmit,
                         clientIP,
                       }: PurchaseModalProps) => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");

  if (!purchaseItem) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numericAmount = Math.round(purchaseItem.basePrice * 100);
    const payload = {
      order_id: `purchase-${purchaseItem.id}-${Date.now()}`,
      amount: numericAmount,
      description: purchaseItem.name,
      client_ip: clientIP,
      player_name: nickname,
      email: email,
      receipt: {
        Email: email,
        Phone: "",
        Taxation: DEFAULT_TAXATION,
        Items: [
          {
            Name: purchaseItem.name,
            Price: numericAmount,
            Quantity: "1",
            Amount: numericAmount,
            Tax: DEFAULT_TAXATION,
          },
        ],
      },
      promo: promo,
    };
    onSubmit(payload);
  };

  return (
      <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#080808]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
          <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0a0a0a] rounded-xl border border-[#FFD700] p-6 max-w-md w-full shadow-lg"
          >
            <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1 hover:bg-[#1a1a1a] rounded-full"
            >
              <FiX className="text-xl text-white" />
            </button>
            <div className="space-y-4">
              <h2 className="text-xl font-bold">{purchaseItem.name}</h2>
              <div className="flex items-center gap-3 text-[#FFD700]">
                <GiCoins className="text-2xl" />
                <span className="text-xl font-bold">{purchaseItem.basePrice} ₽</span>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block mb-1 text-base">Имя пользователя</label>
                  <input
                      type="text"
                      placeholder="Введите никнейм"
                      required
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-base">Email</label>
                  <input
                      type="email"
                      placeholder="example@mail.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-base">Промокод (если есть)</label>
                  <input
                      type="text"
                      placeholder="Введите промокод"
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
                  />
                </div>
                <motion.button
                    whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                    whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded font-bold shadow hover:shadow-md transition-shadow"
                >
                  Купить
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
  );
};

// ================================
// Основной компонент: ShopPage
// ================================
export default function ShopPage() {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<Package[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [purchaseItem, setPurchaseItem] = useState<Package | null>(null);

  // Получаем IP клиента
  const clientIP = useClientIP();

  // Получение списка товаров с бекенда
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("https://shoplistservice.riseoftheblacksun.eu/products");
        if (!res.ok) {
          throw new Error("Ошибка получения данных с сервера");
        }
        const data = await res.json();
        setPackages(data);
      } catch (error) {
        console.error("Ошибка получения данных:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Получение последних транзакций с сервера
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(TRANSACTIONS_API_URL);
        if (!res.ok) {
          throw new Error("Ошибка получения транзакций с сервера");
        }
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Ошибка получения транзакций:", error);
      }
    };
    fetchTransactions();
  }, []);

  // Фильтрация товаров
  const filteredPackages = packages.filter(
      (pkg) =>
          (activeCategory === "Все" || pkg.category === activeCategory) &&
          pkg.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Универсальная функция для создания платежа через бекенд
  const createPayment = async (payload: any) => {
    try {
      const res = await fetch(PAYMENT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Ошибка при создании платежа");
      }
      const data = await res.json();
      // Перенаправляем пользователя на страницу оплаты по payment_url
      window.location.href = data.payment_url;
    } catch (error) {
      console.error("Ошибка создания платежа:", error);
      alert("Не удалось создать платеж. Попробуйте ещё раз.");
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#080808]">
          <motion.div
              animate={{ rotate: 360 }}
              transition={{ loop: Infinity, duration: 0.8 }}
              className="w-12 h-12 border-4 border-t-[#FFD700] border-r-transparent rounded-full"
          />
        </div>
    );
  }

  return (
      <div className="relative z-10 bg-[#080808] py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-8">
          {/* Заголовок */}
          <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent"
          >
            RISE OF THE BLACK SUN | ПОПОЛНЕНИЕ
          </motion.h1>

          {/* Форма пополнения баланса */}
          <TopUpForm onSubmit={createPayment} clientIP={clientIP} />

          {/* Фильтр товаров */}
          <div className="bg-[#0a0a0a] border border-[#FFD700]/30 rounded-xl p-4">
            <h2 className="text-lg font-bold mb-2 text-center">Фильтр товаров</h2>
            <div className="flex flex-col md:flex-row items-center gap-3 mb-3">
              {["Все", "Косметика", "Ключи", "Расходники"].map((cat) => (
                  <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 rounded ${
                          activeCategory === cat
                              ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black"
                              : "bg-[#1a1a1a] text-gray-300"
                      }`}
                  >
                    {cat}
                  </button>
              ))}
            </div>
            <div>
              <input
                  type="text"
                  placeholder="Поиск по названию..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1a1a1a] rounded focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
              />
            </div>
          </div>

          {/* Список товаров — адаптивная сетка для мобильных устройств */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => (
                <ProductCard key={pkg.id} pkg={pkg} onBuy={setPurchaseItem} />
            ))}
          </div>

          {/* Блок последних транзакций */}
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-4 shadow"
          >
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2 justify-center">
              <FiClock className="text-[#FFD700]" />
              Последние покупки
            </h2>
            <div className="space-y-2">
              {transactions.length > 0 ? (
                  transactions.map((tx, index) => (
                      <motion.div
                          key={index}
                          initial={{ x: -20 }}
                          animate={{ x: 0 }}
                          transition={{ delay: index * 0.02, duration: 0.2 }}
                          className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded hover:bg-[#1a1a1a]/90 transition-colors shadow"
                      >
                        <div>
                          <h3 className="font-bold text-base">{tx.user}</h3>
                          <p className="text-xs text-gray-400">{tx.time}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <GiCoins className="text-xl text-[#FFD700]" />
                          <span className="text-base font-semibold">+{tx.amount} ₽</span>
                        </div>
                      </motion.div>
                  ))
              ) : (
                  <p className="text-center text-gray-400">Покупок пока нет</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Модальное окно покупки */}
        <AnimatePresence>
          {purchaseItem && (
              <PurchaseModal
                  purchaseItem={purchaseItem}
                  onClose={() => setPurchaseItem(null)}
                  onSubmit={createPayment}
                  clientIP={clientIP}
              />
          )}
        </AnimatePresence>
      </div>
  );
}
