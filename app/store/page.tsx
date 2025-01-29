"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiFilter,
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiX,
} from "react-icons/fi";
import Image from "next/image";

import { GlowingParticles } from "@/components/particles";

type Product = {
  id: number;
  name: string;
  price: number;
  discount?: number;
  category: string;
  image: string;
  rating: number;
  isHot: boolean;
  isNew: boolean;
  tags: string[];
  description: string;
};

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockProducts: Product[] = Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      name: `Minecraft Premium ${i + 1}`,
      price: Math.floor(Math.random() * 100) + 20,
      discount: i % 3 === 0 ? 20 : undefined,
      category: ["Аккаунты", "Ресурсы", "Моды", "Скины"][i % 4],
      image: `https://picsum.photos/400/500?random=${i}`,
      rating: Math.floor(Math.random() * 3) + 2,
      isHot: i % 5 === 0,
      isNew: i % 4 === 0,
      tags: ["Эксклюзив", "Лимитирован", "VIP", "Редкий"].slice(0, (i % 3) + 1),
      description:
        "Премиум доступ ко всем функциям Minecraft с эксклюзивными бонусами и привилегиями.",
    }));

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredProducts = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(p.category)) &&
        p.price >= priceRange[0] &&
        p.price <= priceRange[1],
    )
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "rating") return b.rating - a.rating;

      return a.id - b.id;
    });

  const categories = ["Аккаунты", "Ресурсы", "Моды", "Скины"];

  return (
    <div className="min-h-screen bg-[#080808] relative overflow-x-hidden">
      <GlowingParticles color="#FFD70020" density={70} />

      {/* Header */}
      <motion.header
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-[#1a1a1a]"
        initial={{ y: -50 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
            MINECRAFT STORE
          </h1>

          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                className="pl-10 pr-4 py-2 bg-[#1a1a1a] rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="Поиск товаров..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-[#666]" />
            </div>
            <button className="p-2 hover:bg-[#1a1a1a] rounded-lg relative">
              <FiShoppingCart className="text-2xl text-[#FFD700]" />
              <span className="absolute -top-1 -right-1 bg-[#FFD700] text-black text-xs px-2 rounded-full">
                3
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Filters Sidebar */}
        <motion.aside
          animate={{ x: filtersOpen ? 0 : -300 }}
          className="fixed top-0 left-0 h-screen w-80 bg-[#0a0a0a] border-r border-[#1a1a1a] z-40 p-6 overflow-y-auto"
          initial={{ x: -300 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#FFD700]">Фильтры</h2>
            <FiX
              className="text-2xl cursor-pointer hover:text-[#FFD700]"
              onClick={() => setFiltersOpen(false)}
            />
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Категории</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 hover:bg-[#1a1a1a] p-2 rounded cursor-pointer"
                  >
                    <input
                      checked={selectedCategories.includes(category)}
                      className="accent-[#FFD700]"
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([
                            ...selectedCategories,
                            category,
                          ]);
                        } else {
                          setSelectedCategories(
                            selectedCategories.filter((c) => c !== category),
                          );
                        }
                      }}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Цена</h3>
              <div className="space-y-4">
                <input
                  className="w-full accent-[#FFD700]"
                  max="1000"
                  min="0"
                  type="range"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                />
                <div className="flex justify-between text-sm">
                  <span>₽{priceRange[0]}</span>
                  <span>₽{priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Controls */}
          <div className="flex justify-between items-center mb-8">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-lg"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <FiFilter className="text-[#FFD700]" />
              Фильтры
            </button>

            <div className="flex items-center gap-4">
              <span>Сортировка:</span>
              <select
                className="bg-[#1a1a1a] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">По умолчанию</option>
                <option value="price">По цене</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                animate={{ opacity: 1, y: 0 }}
                className="group relative bg-[#0a0a0a] border-2 border-[#1a1a1a] rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Product Labels */}
                <div className="absolute top-2 left-2 z-10 flex gap-2">
                  {product.isHot && (
                    <span className="px-3 py-1 bg-red-600/80 text-xs rounded-full">
                      ГОРЯЧАЯ ЦЕНА
                    </span>
                  )}
                  {product.isNew && (
                    <span className="px-3 py-1 bg-[#FFD700]/80 text-black text-xs rounded-full">
                      НОВИНКА
                    </span>
                  )}
                  {product.discount && (
                    <span className="px-3 py-1 bg-green-600/80 text-xs rounded-full">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Product Image */}
                <div className="relative h-60 overflow-hidden">
                  <Image
                    fill
                    alt={product.name}
                    className="object-cover group-hover:scale-110 transition-transform"
                    src={product.image}
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <FiStar className="text-[#FFD700]" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {product.discount ? (
                      <>
                        <span className="text-2xl font-bold text-[#FFD700]">
                          ₽
                          {Math.round(
                            product.price * (1 - product.discount / 100),
                          )}
                        </span>
                        <span className="line-through text-[#666]">
                          ₽{product.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-[#FFD700]">
                        ₽{product.price}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-[#FFD700]/20 text-[#FFD700] rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#FFD700]/10 text-[#FFD700] rounded hover:bg-[#FFD700]/20"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <FiSearch /> Подробнее
                    </button>
                    <button className="p-2 bg-[#FFD700]/10 text-[#FFD700] rounded hover:bg-[#FFD700]/20">
                      <FiShoppingCart />
                    </button>
                    <button className="p-2 bg-[#FFD700]/10 text-[#FFD700] rounded hover:bg-[#FFD700]/20">
                      <FiHeart />
                    </button>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 blur-xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-[#080808]/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              animate={{ scale: 1 }}
              className="relative max-w-2xl w-full bg-[#0a0a0a] rounded-xl border-2 border-[#FFD700]/30 overflow-hidden"
              initial={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 p-2 bg-[#1a1a1a] rounded-full hover:bg-[#2a2a2a]"
                onClick={() => setSelectedProduct(null)}
              >
                <FiX className="text-xl" />
              </button>

              <div className="grid md:grid-cols-2 gap-8 p-6">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    fill
                    alt={selectedProduct.name}
                    className="object-cover"
                    src={selectedProduct.image}
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">{selectedProduct.name}</h2>

                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-[#FFD700]">
                      ₽{selectedProduct.price}
                      {selectedProduct.discount && (
                        <span className="ml-2 text-lg line-through text-[#666]">
                          ₽
                          {Math.round(
                            selectedProduct.price *
                              (1 - selectedProduct.discount / 100),
                          )}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <FiStar className="text-[#FFD700]" />
                      <span>{selectedProduct.rating}/5</span>
                    </div>
                  </div>

                  <p className="text-[#888]">{selectedProduct.description}</p>

                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-sm bg-[#FFD700]/20 text-[#FFD700] rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FFD700]/10 text-[#FFD700] rounded hover:bg-[#FFD700]/20">
                      <FiShoppingCart /> В корзину
                    </button>
                    <button className="p-3 bg-[#FFD700]/10 text-[#FFD700] rounded hover:bg-[#FFD700]/20">
                      <FiHeart />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cart */}
      <motion.div
        className="fixed bottom-8 right-8 p-4 bg-[#FFD700]/10 backdrop-blur-lg rounded-full shadow-xl"
        whileHover={{ scale: 1.05 }}
      >
        <FiShoppingCart className="text-2xl text-[#FFD700]" />
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 rounded-full">
          3
        </span>
      </motion.div>
    </div>
  );
};

export default ShopPage;
