"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock, FiServer } from "react-icons/fi";
import { GiCoins } from "react-icons/gi";
import Image from "next/image";
import { siteConfig } from "@/config/site";

// URL для обращения к бекенду
const PAYMENT_API_URL =
    process.env.NEXT_PUBLIC_PAYMENT_API_URL ||
    "https://shopservice.riseoftheblacksun.eu/pay";

// URL для получения списка последних транзакций
const TRANSACTIONS_API_URL =
    process.env.NEXT_PUBLIC_TRANSACTIONS_API_URL ||
    "https://shopservice.riseoftheblacksun.eu/transactions";

// URL для получения списка серверов и товаров
const SERVERS_API_URL =
    process.env.NEXT_PUBLIC_SERVERS_API_URL ||
    "https://shoplistservice.riseoftheblacksun.eu/products";

// Значение системы налогообложения для всех товаров (из env)
const DEFAULT_TAXATION = process.env.NEXT_PUBLIC_DEFAULT_TAXATION || "osn";

const PAY_URL = siteConfig.api.shop.pay;
const TRANSACTIONS_URL = siteConfig.api.shop.transactions;
const PRODUCTS_URL = siteConfig.api.shop.products;

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

// Функция для генерации случайного числа
const generateRandomNumber = () => Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

// ================================
// Типы данных магазина
// ================================
export type Server = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  products: Product[];
};

export type Product = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  category: string;
  basePrice: number;
  coins: number;
  bonus: number;
  image: string;
  features: string[];
  commands: string[];
  items: any[];
  serverId: number;
  serverName: string;
};

export type Transaction = {
  user: string;
  amount: number;
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
  const [agreement, setAgreement] = useState(false);
  const [error, setError] = useState("");

  // Преобразование рублей в монеты (например, 1 рубль = 3 монеты)
  const calculateCoins = (amountRub: number) => Math.floor(amountRub * 3);

  const validateAmount = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "Введите корректную сумму";
    if (num < 100) return "Минимальная сумма пополнения 100₽";
    if (num > 50000) return "Максимальная сумма пополнения 50,000₽";
    return "";
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setError(validateAmount(value));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amountError = validateAmount(amount);
    if (amountError) {
      setError(amountError);
      return;
    }
    if (!agreement) {
      setError("Необходимо согласиться с условиями оферты");
      return;
    }

    const numericAmount = Math.round(parseFloat(amount) * 100);
    const payload = {
      order_id: `vanilla-${generateRandomNumber()}-${Date.now()}`,
      amount: numericAmount,
      description: "Пополнение баланса",
      client_ip: clientIP,
      player_name: playerName,
      email: email,
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
          className="bg-black/50 backdrop-blur-md border border-white/20 rounded-lg p-6 relative overflow-hidden shadow-lg "
      >
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,transparent,rgba(239,68,68,0.15))] animate-shine" />
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Пополнение баланса
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider text-red-500 font-medium">Ваш никнейм</label>
            <motion.input
                type="text"
                placeholder="Введите никнейм"
                required
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                whileFocus={{ scale: 1.01 }}
                className="w-full px-4 py-2.5 bg-white/5 backdrop-blur-sm rounded-md border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 focus:outline-none text-white placeholder-white/50 text-base transition-all duration-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider text-red-500 font-medium">Email</label>
            <motion.input
                type="email"
                placeholder="example@mail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                whileFocus={{ scale: 1.01 }}
                className="w-full px-4 py-2.5 bg-white/5 backdrop-blur-sm rounded-md border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 focus:outline-none text-white placeholder-white/50 text-base transition-all duration-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider text-red-500 font-medium">
              Сумма пополнения (в рублях)
            </label>
            <div className="relative">
              <motion.input
                  type="number"
                  placeholder="Введите сумму от 100₽ до 50,000₽"
                  required
                  value={amount}
                  onChange={handleAmountChange}
                  min="100"
                  max="50000"
                  whileFocus={{ scale: 1.01 }}
                  className={`w-full px-4 py-2.5 bg-white/5 backdrop-blur-sm rounded-md border ${
                      error ? "border-red-500" : "border-white/10"
                  } focus:border-red-500 focus:ring-1 focus:ring-red-500/20 focus:outline-none text-white placeholder-white/50 text-base transition-all duration-200`}
              />
              {error && (
                  <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-5 left-0 text-red-500 text-xs"
                  >
                    {error}
                  </motion.p>
              )}
            </div>
          </div>

          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-white/5 backdrop-blur-sm rounded-md border border-white/10 flex items-center gap-3"
          >
            <div className="flex-shrink-0">
              <GiCoins className="text-2xl text-red-500" />
            </div>
            <div>
              <p className="text-base font-medium text-white">
                Вы получите: {calculateCoins(parseFloat(amount) || 0)} монет
              </p>
              <p className="text-xs text-white/50 mt-0.5">
                Курс: 1₽ = 3 монеты
              </p>
            </div>
          </motion.div>

          <div className="flex items-center gap-2">
            <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
            >
              <input
                  type="checkbox"
                  id="agreement"
                  checked={agreement}
                  onChange={(e) => setAgreement(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 text-red-500 focus:ring-red-500/20 bg-white/5"
              />
            </motion.div>
            <label htmlFor="agreement" className="text-xs text-white/70 leading-tight">
              Я согласен с <a href="/documents" className="text-red-500 hover:text-red-400 underline">условиями оферты</a> и подтверждаю, что все указанные данные корректны
            </label>
          </div>

          <motion.button
              whileHover={{ scale: 1.01, transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
              type="submit"
              disabled={!agreement || !!error}
              className={`w-full py-2.5 rounded-md font-medium text-base shadow-lg transition-all duration-200 ${
                  !agreement || !!error
                      ? "bg-red-500/50 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 hover:shadow-xl"
              } text-white`}
          >
            Пополнить баланс
          </motion.button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-xs text-white/50">Минимальная сумма</p>
              <p className="text-sm font-medium text-white">100₽</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Максимальная сумма</p>
              <p className="text-sm font-medium text-white">50,000₽</p>
            </div>
          </div>
        </div>
      </motion.div>
  );
};

// ================================
// Компонент: ProductCard (Карточка товара)
// ================================
type ProductCardProps = {
  pkg: Product;
  onBuy: (pkg: Product) => void;
};

const ProductCard = ({ pkg, onBuy }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
      className="relative bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col border border-white/10"
    >
      <div className="relative h-48 w-full">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-red-500/80 backdrop-blur-sm rounded-md text-xs text-white font-medium">
            {pkg.serverName}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-2 text-white">{pkg.name}</h3>
        <div className="flex items-center gap-2 text-red-500 mb-3">
          <GiCoins className="text-2xl" />
          <span className="text-2xl font-semibold">{pkg.basePrice} ₽</span>
        </div>
        
        {pkg.bonus > 0 && (
          <div className="mb-3 p-2 bg-red-500/10 rounded-md border border-red-500/20">
            <p className="text-sm text-red-500">
              Бонус: +{pkg.bonus} монет
            </p>
          </div>
        )}

        <div className="space-y-3 flex-grow">
          <div>
            <h4 className="text-sm font-medium text-white/70 mb-1">Особенности:</h4>
            <ul className="list-disc pl-4 space-y-1 text-sm text-white/70">
              {pkg.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>

          {pkg.commands.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-1">Команды:</h4>
              <div className="flex flex-wrap gap-2">
                {pkg.commands.map((command, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-white/5 rounded-md text-xs text-white/70 border border-white/10"
                  >
                    /{command}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
          whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
          onClick={() => onBuy(pkg)}
          className="mt-4 w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Купить
        </motion.button>
      </div>
    </motion.div>
  );
};

// ================================
// Компонент: PurchaseModal (Модальное окно для покупки)
// ================================
type PurchaseModalProps = {
  purchaseItem: Product | null;
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
      order_id: `${purchaseItem.serverName}-${generateRandomNumber()}-${Date.now()}`,
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
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
          <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-black/50 backdrop-blur-md rounded-lg border border-white/20 p-6 max-w-md w-full shadow-xl"
          >
            <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-full transition-colors"
            >
              <FiX className="text-lg text-white" />
            </button>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">{purchaseItem.name}</h2>
              <div className="flex items-center gap-2 text-red-500">
                <GiCoins className="text-2xl" />
                <span className="text-2xl font-bold">{purchaseItem.basePrice} ₽</span>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block mb-1.5 text-xs uppercase tracking-wider text-red-500 font-medium">Имя пользователя</label>
                  <input
                      type="text"
                      placeholder="Введите никнейм"
                      required
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm rounded-md border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 focus:outline-none text-white placeholder-white/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-xs uppercase tracking-wider text-red-500 font-medium">Email</label>
                  <input
                      type="email"
                      placeholder="example@mail.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm rounded-md border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 focus:outline-none text-white placeholder-white/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-xs uppercase tracking-wider text-red-500 font-medium">Промокод (если есть)</label>
                  <input
                      type="text"
                      placeholder="Введите промокод"
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm rounded-md border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 focus:outline-none text-white placeholder-white/50 text-sm"
                  />
                </div>
                <motion.button
                    whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
                    whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                    type="submit"
                    className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-200"
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
// Компонент: ServerSelector (Выбор сервера)
// ================================
type ServerSelectorProps = {
  servers: Server[];
  selectedServerId: number | null;
  onSelect: (serverId: number) => void;
};

const ServerSelector = ({ servers, selectedServerId, onSelect }: ServerSelectorProps) => {
  return (
    <div className="bg-black/50 backdrop-blur-md border border-white/20 rounded-lg p-4 mb-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
        <FiServer className="text-red-500" />
        Выберите сервер
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {servers.map((server) => (
          <motion.button
            key={server.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(server.id)}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              selectedServerId === server.id
                ? "bg-red-500/20 border-red-500"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <FiServer className="text-2xl text-red-500" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">{server.name}</h3>
                <p className="text-sm text-white/50">
                  {server.products.length} товаров
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// ================================
// Основной компонент: ShopPage
// ================================
export default function ShopPage() {
  const [loading, setLoading] = useState(true);
  const [servers, setServers] = useState<Server[]>([]);
  const [selectedServerId, setSelectedServerId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [purchaseItem, setPurchaseItem] = useState<Product | null>(null);

  // Получаем IP клиента
  const clientIP = useClientIP();

  // Получение списка серверов и товаров с бекенда
  useEffect(() => {
    const fetchServers = async () => {
      try {
        const res = await fetch(SERVERS_API_URL);
        if (!res.ok) {
          throw new Error("Ошибка получения данных с сервера");
        }
        const data = await res.json();
        
        // Извлекаем все продукты из всех серверов
        const allProducts = data.flatMap((server: Server) => 
          server.products.map(product => ({
            ...product,
            serverName: server.name // Добавляем имя сервера к каждому продукту
          }))
        );
        
        setServers(data);
        setProducts(allProducts);
        
        // Если есть серверы, выбираем первый по умолчанию
        if (data.length > 0) {
          setSelectedServerId(data[0].id);
        }
      } catch (error) {
        console.error("Ошибка получения данных:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServers();
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

  // Фильтрация товаров по выбранному серверу и другим критериям
  const filteredProducts = products.filter(
    (product) =>
      (!selectedServerId || product.serverId === selectedServerId) &&
      (activeCategory === "Все" || product.category === activeCategory) &&
      product.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Получение уникальных категорий для фильтра
  const categories = Array.from(
    new Set(
      products
        .filter(product => !selectedServerId || product.serverId === selectedServerId)
        .map(product => product.category)
    )
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
      <div className="relative z-10 bg-black min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-8">

          <TopUpForm onSubmit={createPayment} clientIP={clientIP} />

          <ServerSelector
            servers={servers}
            selectedServerId={selectedServerId}
            onSelect={setSelectedServerId}
          />

          <div className="bg-black/50 backdrop-blur-md border border-white/20 rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">Фильтр товаров</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Все", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/20"
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
                className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm rounded-md border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 focus:outline-none text-white placeholder-white/50 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} pkg={product} onBuy={setPurchaseItem} />
            ))}
          </div>

          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-black/50 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 justify-center text-white">
              <FiClock className="text-red-500" />
              Последние покупки
            </h2>
            <div className="space-y-3">
              {transactions.length > 0 ? (
                  transactions.map((tx, index) => (
                      <motion.div
                          key={index}
                          initial={{ x: -20 }}
                          animate={{ x: 0 }}
                          transition={{ delay: index * 0.02, duration: 0.2 }}
                          className="flex justify-between items-center p-3 bg-white/5 backdrop-blur-sm rounded-md border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div>
                          <h3 className="font-bold text-base text-white">{tx.user}</h3>
                          <p className="text-xs text-white/50">{tx.time}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <GiCoins className="text-xl text-red-500" />
                          <span className="text-base font-semibold text-white">+{tx.amount} ₽</span>
                        </div>
                      </motion.div>
                  ))
              ) : (
                  <p className="text-center text-white/50 text-sm">Покупок пока нет</p>
              )}
            </div>
          </motion.div>
        </div>

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
