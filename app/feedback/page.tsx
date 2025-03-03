"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiLoader,
  FiUploadCloud,
  FiInfo,
  FiAlertTriangle,
} from "react-icons/fi";
import { GavelIcon } from "lucide-react";
import { BiBulb } from "react-icons/bi";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

type FeedbackType = "complaint" | "suggestion" | "appeal";

const particlesOptions: ISourceOptions = {
  background: {
    color: "#000000",
  },
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        // @ts-ignore
        area: 800,
      },
    },
    color: {
      value: ["#ff0000", "#ff5a5a", "#ff8a8a", "#ffbdbd"],
    },
    opacity: {
      value: 0.5,
      // @ts-ignore
      random: true,
    },
    size: {
      value: 1.5,
      // @ts-ignore
      random: true,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      outModes: "out",
    },
    links: {
      enable: true,
      color: "#ff0000",
      opacity: 0.2,
      distance: 150,
    },
  },
};

const FeedbackPage = () => {
  const [activeTab, setActiveTab] = useState<FeedbackType>("complaint");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
    evidence: "",
    appealId: "",
  });
  // Теперь поддерживаем несколько файлов – массив файлов
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requestNumber, setRequestNumber] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Собираем данные в FormData для отправки на сервер
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("subject", formData.subject);
    data.append("description", formData.description);
    data.append("evidence", formData.evidence);
    data.append("appealId", formData.appealId);
    data.append("feedbackType", activeTab);

    // Добавляем все выбранные файлы под ключом "files"
    files.forEach((file) => {
      data.append("files", file);
    });

    try {
      const response = await fetch("https://feedbackservice.riseoftheblacksun.eu/feedback", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (response.ok) {
        setRequestNumber(result.requestNumber);
        setSubmitted(true);
      } else {
        console.error("Ошибка отправки:", result.error);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
    setLoading(false);
  };
  const TypeButton = ({ type }: { type: FeedbackType }) => {
    const config = {
      complaint: {
        icon: <FiAlertTriangle />,
        text: "Подать жалобу",
        color: "bg-red-500",
      },
      suggestion: {
        icon: <BiBulb />,
        text: "Сделать предложение",
        color: "bg-purple-500",
      },
      appeal: {
        icon: <GavelIcon />,
        text: "Обжаловать решение",
        color: "bg-orange-500",
      },
    };

    return (
        <motion.button
            className={`flex flex-col items-center justify-center w-full p-4 rounded-xl gap-2 transition-all ${
                activeTab === type
                    ? "bg-opacity-100 text-white"
                    : "bg-opacity-20 text-gray-300 hover:bg-opacity-30"
            } ${config[type].color}`}
            onClick={() => setActiveTab(type)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
          <div className="text-3xl p-3 rounded-full bg-black bg-opacity-20">
            {config[type].icon}
          </div>
          <span className="text-sm font-medium text-center">
          {config[type].text}
        </span>
        </motion.button>
    );
  };

  const [particlesInit, setParticlesInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesInit(true));
  }, []);

  return (
      <div className="min-h-screen relative overflow-hidden">
        {particlesInit && (
            <Particles
                id="tsparticles"
                options={particlesOptions}
                className="absolute inset-0 z-0"
            />
        )}

        <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
          <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold mb-6 text-center text-white"
          >
            Обратная связь
          </motion.h1>

          {/* Навигация */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            <TypeButton type="complaint" />
            <TypeButton type="suggestion" />
            <TypeButton type="appeal" />
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
                <motion.form
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white bg-opacity-5 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-10 shadow-xl"
                    onSubmit={handleSubmit}
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-white text-sm font-medium">
                          Имя пользователя
                        </label>
                        <input
                            required
                            className="w-full px-4 py-3 bg-white bg-opacity-5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-white text-sm font-medium">
                          Email
                        </label>
                        <input
                            required
                            type="email"
                            className="w-full px-4 py-3 bg-white bg-opacity-5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                      </div>
                    </div>

                    {activeTab === "appeal" && (
                        <div className="space-y-2">
                          <label className="text-white text-sm font-medium">
                            Номер решения
                          </label>
                          <input
                              required
                              className="w-full px-4 py-3 bg-white bg-opacity-5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20"
                              value={formData.appealId}
                              onChange={(e) =>
                                  setFormData({ ...formData, appealId: e.target.value })
                              }
                          />
                        </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-white text-sm font-medium">
                        Тема
                      </label>
                      <input
                          required
                          className="w-full px-4 py-3 bg-white bg-opacity-5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20"
                          value={formData.subject}
                          onChange={(e) =>
                              setFormData({ ...formData, subject: e.target.value })
                          }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-white text-sm font-medium flex items-center gap-2">
                        Описание
                        <FiInfo className="text-white text-opacity-60" />
                      </label>
                      <textarea
                          required
                          className="w-full px-4 py-3 bg-white bg-opacity-5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20 min-h-[120px]"
                          value={formData.description}
                          onChange={(e) =>
                              setFormData({ ...formData, description: e.target.value })
                          }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-white text-sm font-medium">
                        Ссылка на доказательства
                      </label>
                      <input
                          type="url"
                          className="w-full px-4 py-3 bg-white bg-opacity-5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20"
                          value={formData.evidence}
                          onChange={(e) =>
                              setFormData({ ...formData, evidence: e.target.value })
                          }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-white text-sm font-medium flex items-center gap-2">
                        Прикрепить файлы
                        <FiUploadCloud className="text-white text-opacity-60" />
                      </label>
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white border-opacity-20 rounded-lg cursor-pointer bg-white bg-opacity-5 hover:bg-opacity-10 transition-colors">
                        <div className="text-center">
                          <FiUploadCloud className="text-2xl text-white text-opacity-60 mb-2 mx-auto" />
                          <p className="text-sm text-white text-opacity-80">
                            {files.length > 0
                                ? files.map((f) => f.name).join(", ")
                                : "Нажмите для загрузки"}
                          </p>
                          <p className="text-xs text-white text-opacity-50 mt-1">
                            (PNG, JPG, PDF, MP4 до 50MB)
                          </p>
                        </div>
                        <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*,video/*,application/pdf"
                        />
                      </label>
                    </div>

                    <motion.button
                        className="w-full py-4 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg font-medium text-white transition-all relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                    >
                      {loading ? (
                          <FiLoader className="animate-spin mx-auto" />
                      ) : activeTab === "appeal" ? (
                          "Подать апелляцию"
                      ) : (
                          "Отправить"
                      )}
                    </motion.button>
                  </div>

                  {loading && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl">
                        <FiLoader className="text-4xl text-white animate-spin" />
                      </div>
                  )}
                </motion.form>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white bg-opacity-5 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-10 text-center shadow-xl"
                >
                  <div className="space-y-4">
                    <FiCheckCircle className="text-5xl text-green-400 mx-auto animate-pulse" />
                    <h2 className="text-2xl font-bold text-white">Заявка принята!</h2>
                    <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                      <p className="text-white text-opacity-80 mb-2">
                        Номер вашей заявки:
                      </p>
                      <p className="text-xl font-mono font-bold text-green-400">
                        {requestNumber}
                      </p>
                    </div>
                    <p className="text-white text-opacity-70 text-sm">
                      Ответ придёт на указанный email в течение 3 рабочих дней
                    </p>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
  );
};

export default FeedbackPage;
