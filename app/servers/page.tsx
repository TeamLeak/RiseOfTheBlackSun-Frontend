"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FiCopy, FiServer, FiCheck } from "react-icons/fi";

import { GlowingParticles } from "@/components/particles";
import { siteConfig } from "@/config/site";

type ServerItem = {
  badge?: string;
  title: string;
  description: string;
  ipAddress: string;
  iconColor: string;
  hideCopyIP: boolean;
};

const gradientText = "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500";

const SERVERS_URL = siteConfig.api.servers;

export default function ServersPage() {
  const [servers, setServers] = useState<ServerItem[]>([]);
  const [selectedServer, setSelectedServer] = useState<ServerItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setShowScroll] = useState(false);
  const [copiedIP, setCopiedIP] = useState<string | null>(null);

  const copyToClipboard = async (ip: string) => {
    try {
      await navigator.clipboard.writeText(ip);
      setCopiedIP(ip);
      setTimeout(() => setCopiedIP(null), 2000);
    } catch (err) {
      console.error("Failed to copy IP:", err);
    }
  };

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await fetch(SERVERS_URL);
        const data = await response.json();

        setServers(data);
      } catch (error) {
        console.error("Error fetching servers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  useEffect(() => {
    const checkScroll = () => setShowScroll(window.scrollY > 500);

    window.addEventListener("scroll", checkScroll);

    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const LoadingSkeleton = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="h-full bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-md overflow-hidden">
            <div className="animate-pulse">
              <div className="h-48 bg-white/10" />
              <div className="p-6 space-y-4">
                <div className="h-4 bg-white/10 rounded w-1/3" />
                <div className="h-6 bg-white/10 rounded w-2/3" />
                <div className="space-y-2">
                  <div className="h-3 bg-white/10 rounded" />
                  <div className="h-3 bg-white/10 rounded w-4/5" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-8 bg-white/10 rounded-md w-24" />
                  <div className="h-8 bg-white/10 rounded-md w-16" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <GlowingParticles color="rgba(239, 68, 68, 0.2)" density={50} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-20 relative z-10">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
        >
          <h1 className={`text-6xl md:text-8xl font-bold mb-4 ${gradientText}`}>
            НАШИ СЕРВЕРА
          </h1>
          <p className="text-white/70 text-xl">
            Выберите свой путь в мире RISE OF THE BLACK SUN
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <motion.div
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              {servers.map((server) => (
                <motion.div
                  key={server.title}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="group relative h-full bg-white/5 backdrop-blur-sm border-l-2 border-white/10 rounded-md overflow-hidden hover:border-red-500 transition-all">
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-black/50 to-transparent" />

                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        {server.badge && (
                          <span className="px-3 py-1 bg-red-500/20 text-red-500 text-sm rounded-full">
                            {server.badge}
                          </span>
                        )}
                        <FiServer className="text-2xl text-red-500" />
                      </div>

                      <h3 className="text-xl font-medium text-white">
                        {server.title}
                      </h3>

                      <div className="flex flex-col gap-3">
                        <div className="p-3 bg-white/5 rounded-md relative">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <p className="text-sm text-white/50 mb-1">IP-адрес</p>
                              <code className="text-red-500 font-mono break-all">
                                {server.ipAddress}
                              </code>
                            </div>
                            <button
                              className="p-2 hover:bg-red-500/10 rounded-md transition-colors"
                              title="Скопировать IP"
                              onClick={() => copyToClipboard(server.ipAddress)}
                            >
                              {copiedIP === server.ipAddress ? (
                                <FiCheck className="text-red-500" />
                              ) : (
                                <FiCopy className="text-white/50 hover:text-red-500" />
                              )}
                            </button>
                          </div>
                        </div>

                        <button
                          className="w-full px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md
                            transition-all flex items-center justify-between font-medium"
                          onClick={() => setSelectedServer(server)}
                        >
                          <span>Подробнее</span>
                          <span className="text-xl">↗</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Модальное окно с деталями сервера */}
        <AnimatePresence>
          {selectedServer && (
            <motion.div
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={() => setSelectedServer(null)}
            >
              <motion.div
                animate={{ scale: 1 }}
                className="relative max-w-2xl w-full bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-md overflow-hidden max-h-[90vh] flex flex-col"
                initial={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8 space-y-6 overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">
                      {selectedServer.title}
                    </h2>
                    <FiServer className="text-3xl text-red-500" />
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-md relative">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-sm text-white/50 mb-1">
                            IP-адрес
                          </p>
                          <code className="text-red-500 font-mono">
                            {selectedServer.ipAddress}
                          </code>
                        </div>
                        <button
                          className="p-2 hover:bg-red-500/10 rounded-md transition-colors"
                          onClick={() =>
                            copyToClipboard(selectedServer.ipAddress)
                          }
                        >
                          {copiedIP === selectedServer.ipAddress ? (
                            <FiCheck className="text-red-500" />
                          ) : (
                            <FiCopy className="text-white/50 hover:text-red-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="prose prose-invert">
                      {selectedServer.description
                        .split("\r\n")
                        .map((paragraph, index) => (
                          <p
                            key={index}
                            className="text-white/70 mb-4 last:mb-0 animate-fade-in"
                          >
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-white/10 mt-auto">
                  <button
                    className="w-full px-8 py-3 border border-white/30 hover:border-white text-white rounded-md
                      transition-all"
                    onClick={() => setSelectedServer(null)}
                  >
                    Закрыть
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
