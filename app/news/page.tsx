"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FiArrowUpRight, FiClock, FiBookOpen } from "react-icons/fi";
import Image from "next/image";

import { GlowingParticles } from "@/components/particles";

type NewsPost = {
  id: number;
  title: string;
  content: string;
  description: string;
  preview_url: string;
  keywords: string;
  author: string;
  published_date: string;
  rating: number;
};

const gradientText =
  "text-transparent bg-clip-text bg-gradient-to-r from-[#5EA8FF] to-[#3D7BFF]";

export default function NewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);

  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s/g).length;

    return Math.ceil(words / wordsPerMinute);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://riseoftheblacksun.eu/api/blog_api.php?action=get_all_posts",
        );
        const data = await response.json();

        setPosts(data.posts);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchPosts().then(() => {});
  }, []);

  const LoadingSkeleton = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="h-[400px] bg-[#0a0a0a] rounded-2xl overflow-hidden border-2 border-[#1a1a1a]">
            <div className="animate-pulse">
              <div className="h-48 bg-[#1a1a1a]" />
              <div className="p-6 space-y-4">
                <div className="h-4 bg-[#1a1a1a] rounded w-3/4" />
                <div className="h-3 bg-[#1a1a1a] rounded w-full" />
                <div className="h-3 bg-[#1a1a1a] rounded w-2/3" />
                <div className="flex items-center gap-4 pt-4">
                  <div className="h-6 w-6 rounded-full bg-[#1a1a1a]" />
                  <div className="h-3 bg-[#1a1a1a] rounded w-24" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808] relative overflow-x-hidden">
      <GlowingParticles color="#3D7BFF20" density={60} />

      <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
        <motion.header
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20 space-y-6"
          initial={{ opacity: 0, y: 30 }}
        >
          <h1 className={`text-6xl font-bold ${gradientText} drop-shadow-xl`}>
            ПОСЛЕДНИЕ НОВОСТИ
          </h1>
          <p className="text-xl text-[#8a8a8a] max-w-2xl mx-auto">
            Будь в курсе всех событий мира Rise of the Black Sun. Эксклюзивные
            материалы, обновления и события
          </p>
        </motion.header>

        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <motion.div
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
            >
              {posts.map((post) => (
                <motion.article
                  key={post.id}
                  className="group relative bg-[#0a0a0a] rounded-2xl border-2 border-[#1a1a1a] hover:border-[#5EA8FF]/30 transition-all"
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative h-60 overflow-hidden rounded-t-2xl">
                    <Image
                      fill
                      alt={post.title}
                      className="object-cover group-hover:scale-105 transition-transform"
                      src={post.preview_url || "/default-news.jpg"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {post.keywords.split(",").map((keyword, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs bg-[#5EA8FF]/20 text-[#5EA8FF] rounded-full"
                        >
                          {keyword.trim()}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-[#f0f0f0] line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-[#8a8a8a] line-clamp-3">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-[#666] pt-4">
                      <div className="flex items-center gap-2">
                        <FiClock className="text-[#5EA8FF]" />
                        <span>
                          {calculateReadingTime(post.content)} мин чтения
                        </span>
                      </div>
                      <span>
                        {new Date(post.published_date).toLocaleDateString()}
                      </span>
                    </div>

                    <button
                      className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-[#5EA8FF]/10 text-[#5EA8FF] rounded-lg hover:bg-[#5EA8FF]/20 transition-all"
                      onClick={() => setSelectedPost(post)}
                    >
                      <FiBookOpen />
                      Читать полностью
                    </button>
                  </div>

                  <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute -inset-2 bg-gradient-to-r from-[#5EA8FF]/20 to-[#3D7BFF]/20 blur-xl" />
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedPost && (
            <motion.div
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-[#080808]/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                animate={{ scale: 1 }}
                className="relative max-w-3xl w-full bg-[#0a0a0a] rounded-2xl border-2 border-[#5EA8FF]/30 overflow-y-auto max-h-[90vh]"
                exit={{ scale: 0.95 }}
                initial={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8 space-y-6">
                  <div className="relative h-64 rounded-xl overflow-hidden">
                    <Image
                      fill
                      alt={selectedPost.title}
                      className="object-cover"
                      src={selectedPost.preview_url || "/default-news.jpg"}
                    />
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-[#f0f0f0]">
                      {selectedPost.title}
                    </h2>

                    <div className="flex items-center gap-4 text-sm text-[#666]">
                      <div className="flex items-center gap-2">
                        <FiClock className="text-[#5EA8FF]" />
                        <span>
                          {new Date(
                            selectedPost.published_date,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiBookOpen className="text-[#5EA8FF]" />
                        <span>
                          {calculateReadingTime(selectedPost.content)} мин
                          чтения
                        </span>
                      </div>
                    </div>

                    <div className="prose prose-invert text-[#c0c0c0] space-y-4">
                      {selectedPost.content
                        .split("\r\n")
                        .map((paragraph, index) => (
                          <motion.p
                            key={index}
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 10 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            {paragraph}
                          </motion.p>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-[#1a1a1a] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#5EA8FF]/20 flex items-center justify-center">
                          <span className="text-[#5EA8FF]">✍️</span>
                        </div>
                        <div>
                          <p className="text-sm text-[#8a8a8a]">Автор</p>
                          <p className="text-[#f0f0f0]">
                            {selectedPost.author}
                          </p>
                        </div>
                      </div>
                      <button
                        className="px-6 py-2 bg-[#5EA8FF]/10 text-[#5EA8FF] rounded-lg hover:bg-[#5EA8FF]/20 transition-all flex items-center gap-2"
                        onClick={() => setSelectedPost(null)}
                      >
                        Закрыть
                        <FiArrowUpRight />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        className="fixed bottom-8 right-8 p-4 bg-[#5EA8FF]/10 text-[#5EA8FF] rounded-full backdrop-blur-lg shadow-xl hover:bg-[#5EA8FF]/20 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FiArrowUpRight className="text-2xl transform rotate-45" />
      </motion.button>
    </div>
  );
}
