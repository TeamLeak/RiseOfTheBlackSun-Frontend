"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiCheckCircle, FiLoader } from "react-icons/fi";

import { GlowingParticles } from "@/components/particles";

// Пример проверки наличия аккаунта через JWT токен в кэше (не используется):
// const jwtToken = localStorage.getItem('jwtToken');
// if (jwtToken) {
//   // Здесь можно добавить логику проверки валидности токена и получения данных аккаунта
// }

type FeedbackType = "complaint" | "suggestion" | "appeal";

// Функция генерации уникального номера заявки
const generateRequestNumber = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.floor(Math.random() * 1e8)
    .toString(36)
    .toUpperCase();

  return `${timestamp}-${randomPart}`;
};

const FeedbackPage = () => {
  const [activeTab, setActiveTab] = useState<FeedbackType>("complaint");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [evidence, setEvidence] = useState(""); // ссылка на доказательства
  const [file, setFile] = useState<File | null>(null);
  const [appealId, setAppealId] = useState(""); // Номер решения для апелляции
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requestNumber, setRequestNumber] = useState("");

  // Обработчик загрузки файла
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Собираем все данные в один объект
    const formData = {
      type: activeTab,
      name,
      email,
      subject,
      description,
      evidence,
      fileName: file ? file.name : null,
      appealId: activeTab === "appeal" ? appealId : null,
    };

    console.log("Отправка данных на сервер:", formData);

    // Имитируем отправку данных на сервер с задержкой 2 секунды
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Генерируем уникальный номер заявки
    const newRequestNumber = generateRequestNumber();

    setRequestNumber(newRequestNumber);

    setLoading(false);
    setSubmitted(true);

    // Здесь можно выполнить fetch или axios запрос для отправки formData вместе с newRequestNumber
    // Пример:
    // fetch('/api/feedback', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ...formData, requestNumber: newRequestNumber })
    // });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GlowingParticles color="#FF000020" density={50} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Табуляция для выбора типа формы */}
        <div className="flex mb-8">
          <motion.button
            className={`flex-1 py-3 text-center font-bold ${
              activeTab === "complaint"
                ? "bg-red-700 text-white"
                : "bg-[#400000] text-red-300"
            } rounded-l-lg`}
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveTab("complaint")}
          >
            Жалоба
          </motion.button>
          <motion.button
            className={`flex-1 py-3 text-center font-bold ${
              activeTab === "suggestion"
                ? "bg-red-700 text-white"
                : "bg-[#400000] text-red-300"
            }`}
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveTab("suggestion")}
          >
            Предложение
          </motion.button>
          <motion.button
            className={`flex-1 py-3 text-center font-bold ${
              activeTab === "appeal"
                ? "bg-red-700 text-white"
                : "bg-[#400000] text-red-300"
            } rounded-r-lg`}
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveTab("appeal")}
          >
            Апелляция
          </motion.button>
        </div>

        {/* Форма обратной связи */}
        <AnimatePresence mode={"wait"}>
          {!submitted ? (
            <motion.form
              key={activeTab}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#2a0000] border-2 border-[#FF0000] rounded-xl p-8 space-y-6 relative overflow-hidden shadow-2xl"
              exit={{ opacity: 0, scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
            >
              {/* Эффект мерцающей подсветки */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(45deg,transparent_25%,#FF000020_50%,transparent_75%)] bg-[length:200%_200%] animate-shine" />

              <h2 className="text-2xl font-bold mb-4 text-red-300">
                {activeTab === "complaint"
                  ? "Отправить жалобу"
                  : activeTab === "suggestion"
                    ? "Отправить предложение"
                    : "Подать апелляцию"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-red-200 mb-2">
                    Имя пользователя
                  </label>
                  <motion.input
                    required
                    className="w-full px-4 py-3 bg-[#400000] text-red-100 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    type="text"
                    value={name}
                    whileFocus={{ scale: 1.02 }}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-red-200 mb-2">Email</label>
                  <motion.input
                    required
                    className="w-full px-4 py-3 bg-[#400000] text-red-100 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    type="email"
                    value={email}
                    whileFocus={{ scale: 1.02 }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {activeTab === "appeal" && (
                <div>
                  <label className="block text-red-200 mb-2">
                    Номер решения, которое вы хотите обжаловать
                  </label>
                  <motion.input
                    required
                    className="w-full px-4 py-3 bg-[#400000] text-red-100 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    type="text"
                    value={appealId}
                    whileFocus={{ scale: 1.02 }}
                    onChange={(e) => setAppealId(e.target.value)}
                  />
                </div>
              )}

              <div>
                <label className="block text-red-200 mb-2">Тема</label>
                <motion.input
                  required
                  className="w-full px-4 py-3 bg-[#400000] text-red-100 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  type="text"
                  value={subject}
                  whileFocus={{ scale: 1.02 }}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-red-200 mb-2">
                  {activeTab === "appeal"
                    ? "Опишите причину апелляции, приведите все доказательства, ссылки и скриншоты"
                    : "Описание проблемы или предложения (укажите все доказательства, ссылки, скриншоты)"}
                </label>
                <motion.textarea
                  required
                  className="w-full px-4 py-3 bg-[#400000] text-red-100 rounded-lg focus:ring-2 focus:ring-red-500 outline-none min-h-[120px]"
                  value={description}
                  whileFocus={{ scale: 1.02 }}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-red-200 mb-2">
                  Ссылка на доказательства (если есть)
                </label>
                <motion.input
                  className="w-full px-4 py-3 bg-[#400000] text-red-100 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  type="url"
                  value={evidence}
                  whileFocus={{ scale: 1.02 }}
                  onChange={(e) => setEvidence(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-red-200 mb-2">
                  Прикрепить файл (скриншоты, видео, PDF)
                </label>
                <motion.input
                  accept="image/*,video/*,application/pdf"
                  className="w-full px-4 py-3 bg-[#400000] text-red-100 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  type="file"
                  whileFocus={{ scale: 1.02 }}
                  onChange={handleFileChange}
                />
              </div>

              <motion.button
                className="w-full py-3 bg-gradient-to-r from-red-500 to-red-900 text-white rounded-lg font-bold shadow-lg hover:shadow-2xl transition-shadow"
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeTab === "appeal" ? "Подать апелляцию" : "Отправить"}
              </motion.button>

              {/* Индикатор загрузки */}
              {loading && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-[#00000080] z-10"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  <FiLoader className="text-6xl text-red-500 animate-spin" />
                </motion.div>
              )}
            </motion.form>
          ) : (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#2a0000] border-2 border-[#FF0000] rounded-xl p-8 text-center shadow-2xl"
              exit={{ opacity: 0, scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <FiCheckCircle className="text-6xl text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-300 mb-2">Спасибо!</h2>
              <p className="text-red-200 mb-4">
                Ваше сообщение успешно отправлено. Номер вашей заявки:
              </p>
              <motion.div
                animate={{ scale: 1 }}
                className="text-3xl font-extrabold text-red-500 bg-[#400000] px-6 py-3 rounded-lg inline-block"
                initial={{ scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                {requestNumber}
              </motion.div>
              <p className="text-red-200 mt-4">
                Мы свяжемся с вами в ближайшее время.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FeedbackPage;
