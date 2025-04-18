// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  Loader2, 
  Upload, 
  Info, 
  AlertTriangle, 
  Gavel, 
  Lightbulb,
  ChevronDown,
  X,
  Send
} from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { siteConfig } from "@/config/site";

type FeedbackType = "complaint" | "suggestion" | "appeal";

// Конфигурация частиц с улучшенной анимацией
const particlesOptions = siteConfig.particles;

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
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requestNumber, setRequestNumber] = useState("");
  const [particlesInit, setParticlesInit] = useState(false);
  const [selectedFilePreview, setSelectedFilePreview] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Инициализация частиц при загрузке страницы
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesInit(true));
  }, []);

  // Обработка загрузки файлов
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files);
      setFiles(prev => [...prev, ...fileList]);
    }
  };

  // Удаление выбранного файла
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Просмотр файла
  const previewFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // Для не-изображений показываем только имя
      setSelectedFilePreview(file.name);
    }
  };

  // Валидация формы
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) errors.name = "Имя пользователя обязательно";
    if (!formData.email.trim()) errors.email = "Email обязателен";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Некорректный email";
    
    if (!formData.subject.trim()) errors.subject = "Тема обязательна";
    if (!formData.description.trim()) errors.description = "Описание обязательно";
    
    if (activeTab === "appeal" && !formData.appealId.trim()) {
      errors.appealId = "Номер решения обязателен";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    // Сборка данных для отправки
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("subject", formData.subject);
    data.append("description", formData.description);
    data.append("evidence", formData.evidence);
    data.append("appealId", formData.appealId);
    data.append("feedbackType", activeTab);

    // Добавление файлов
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
        setFormErrors({ 
          submit: "Произошла ошибка при отправке. Пожалуйста, попробуйте позже." 
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setFormErrors({ 
        submit: "Произошла ошибка при отправке. Пожалуйста, проверьте соединение." 
      });
    }
    
    setLoading(false);
  };

  // Конфигурация типов обратной связи
  const feedbackTypes = {
    complaint: {
      icon: <AlertTriangle className="h-6 w-6" />,
      text: "Жалоба",
      description: "Сообщите о проблеме или нарушении",
      color: "bg-gradient-to-r from-red-500 to-red-600",
      hoverColor: "hover:from-red-600 hover:to-red-700"
    },
    suggestion: {
      icon: <Lightbulb className="h-6 w-6" />,
      text: "Предложение",
      description: "Предложите улучшение или новую функцию",
      color: "bg-gradient-to-r from-amber-500 to-orange-600",
      hoverColor: "hover:from-amber-600 hover:to-orange-700"
    },
    appeal: {
      icon: <Gavel className="h-6 w-6" />,
      text: "Апелляция",
      description: "Обжалуйте принятое решение",
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      hoverColor: "hover:from-green-600 hover:to-emerald-700"
    },
  };

  // Компонент кнопки типа обратной связи
  const TypeButton = ({ type }: { type: FeedbackType }) => {
    const config = feedbackTypes[type];

    return (
      <motion.button
        className={`flex items-center p-4 rounded-xl gap-3 transition-all ${
          activeTab === type
            ? `${config.color} shadow-lg shadow-${type}-500/30 text-white`
            : "bg-white/5 text-gray-300 hover:bg-white/10"
        } backdrop-blur-sm border border-white/10`}
        onClick={() => setActiveTab(type)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className={`p-2 rounded-lg ${activeTab === type ? 'bg-black/20' : 'bg-white/5'}`}>
          {config.icon}
        </div>
        <div className="text-left">
          <p className="font-medium">{config.text}</p>
          <p className="text-xs opacity-70">{config.description}</p>
        </div>
      </motion.button>
    );
  };

  // Компонент поля ввода
  const InputField = ({ 
    label, 
    type = "text", 
    name, 
    value, 
    onChange, 
    required = false,
    error
  }: { 
    label: string, 
    type?: string, 
    name: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    required?: boolean,
    error?: string
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-white text-sm font-medium flex items-center gap-1">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
      {type === "textarea" ? (
        <textarea
          className={`w-full px-4 py-3 bg-white/5 border ${error ? 'border-red-400/50' : 'border-white/10'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all min-h-[120px]`}
          value={value}
          onChange={onChange}
          name={name}
        />
      ) : (
        <input
          type={type}
          className={`w-full px-4 py-3 bg-white/5 border ${error ? 'border-red-400/50' : 'border-white/10'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all`}
          value={value}
          onChange={onChange}
          name={name}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {particlesInit && <Particles id="tsparticles" options={particlesOptions} />}

      <div className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-3 text-white tracking-tight">
            Обратная связь
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Выберите тип обращения и заполните форму. Мы ответим вам в течение 3 рабочих дней.
          </p>
        </motion.div>

        {/* Навигация по типам обратной связи */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <TypeButton type="complaint" />
          <TypeButton type="suggestion" />
          <TypeButton type="appeal" />
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-black/50 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-2xl overflow-hidden relative"
            >
              {/* Декоративный элемент */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-30 ${feedbackTypes[activeTab].color}`}></div>
              <div className={`absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-30 ${feedbackTypes[activeTab].color}`}></div>
              
              <div className="relative">
                <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
                  {feedbackTypes[activeTab].icon}
                  {feedbackTypes[activeTab].text}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField
                      label="Имя пользователя"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      error={formErrors.name}
                    />
                    
                    <InputField
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      error={formErrors.email}
                    />
                  </div>

                  {activeTab === "appeal" && (
                    <InputField
                      label="Номер решения"
                      name="appealId"
                      value={formData.appealId}
                      onChange={(e) => setFormData({ ...formData, appealId: e.target.value })}
                      required
                      error={formErrors.appealId}
                    />
                  )}

                  <InputField
                    label="Тема"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    error={formErrors.subject}
                  />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <label className="text-white text-sm font-medium flex items-center gap-2">
                        Описание <span className="text-red-500">*</span>
                        <Info className="h-4 w-4 text-white/60" />
                      </label>
                      {formErrors.description && <span className="text-xs text-red-500">{formErrors.description}</span>}
                    </div>
                    <textarea
                      className={`w-full px-6 py-4 bg-white/5 border ${formErrors.description ? 'border-red-500/50' : 'border-white/10'} rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all min-h-[150px]`}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Подробно опишите ситуацию..."
                    />
                  </div>

                  <InputField
                    label="Ссылка на доказательства"
                    type="url" 
                    name="evidence"
                    value={formData.evidence}
                    onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
                  />

                  <div className="space-y-3">
                    <label className="text-white text-sm font-medium flex items-center gap-2">
                      Прикрепить файлы
                      <Upload className="h-4 w-4 text-white/60" />
                    </label>

                    {/* Карточки загруженных файлов */}
                    {files.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-2 mb-4">
                        {files.map((file, index) => (
                          <div 
                            key={index} 
                            className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg group hover:bg-white/10 transition-colors"
                          >
                            <div className="flex-1 truncate text-sm text-white/80">
                              {file.name.length > 15 
                                ? `${file.name.substring(0, 15)}...${file.name.split('.').pop()}`
                                : file.name
                              }
                            </div>
                            <button 
                              type="button" 
                              onClick={() => previewFile(file)}
                              className="text-white/50 hover:text-white transition-colors"
                            >
                              <Info className="h-4 w-4" />
                            </button>
                            <button 
                              type="button" 
                              onClick={() => removeFile(index)}
                              className="text-white/50 hover:text-red-500 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed ${formData.evidence ? 'border-white/10' : 'border-white/20'} rounded-lg cursor-pointer bg-white/5 hover:bg-white/8 transition-colors`}>
                      <div className="text-center p-6">
                        <Upload className="text-3xl text-white/60 mb-3 mx-auto h-10 w-10" />
                        <p className="text-base text-white/80">
                          Нажмите для загрузки файлов
                        </p>
                        <p className="text-sm text-white/50 mt-2">
                          PNG, JPG, PDF, MP4 до 50MB
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

                  {formErrors.submit && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-500">
                      {formErrors.submit}
                    </div>
                  )}

                  <motion.button
                    className={`w-full py-4 mt-6 rounded-lg font-medium text-white transition-all relative overflow-hidden ${
                      feedbackTypes[activeTab].color
                    } ${feedbackTypes[activeTab].hoverColor}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin h-5 w-5" />
                          Отправка...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          {activeTab === "appeal" ? "Подать апелляцию" : "Отправить"}
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              </div>

              {loading && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl z-50">
                  <div className="text-center">
                    <Loader2 className="text-4xl text-white animate-spin mx-auto h-12 w-12 mb-4" />
                    <p className="text-white/80">Отправка данных...</p>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black/50 backdrop-blur-lg rounded-xl p-10 border border-white/10 text-center shadow-2xl"
            >
              <motion.div 
                className="mb-8"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="text-green-500 h-12 w-12" />
                </div>
              </motion.div>
              
              <h2 className="text-4xl font-bold text-white mb-6">Заявка успешно принята!</h2>
              
              <div className="bg-white/5 p-6 rounded-lg mb-8 border border-white/10">
                <p className="text-white/80 mb-3 text-sm">Номер вашей заявки:</p>
                <p className="text-3xl font-mono font-bold text-green-500 tracking-wider">
                  {requestNumber}
                </p>
              </div>
              
              <div className="text-white/70 text-base space-y-4">
                <p>
                  Ответ будет отправлен на указанный email в течение 3 рабочих дней
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Info className="h-5 w-5" />
                  Сохраните номер заявки для дальнейших обращений
                </p>
              </div>
              
              <motion.button
                className="mt-10 px-8 py-4 bg-white/10 hover:bg-white/15 rounded-lg font-medium text-white transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    description: "",
                    evidence: "",
                    appealId: "",
                  });
                  setFiles([]);
                  setFormErrors({});
                }}
              >
                Создать новое обращение
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Модальное окно для просмотра файла */}
        {selectedFilePreview && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm p-4">
            <div className="bg-black/90 rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-auto border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-medium text-lg">Просмотр файла</h3>
                <button 
                  onClick={() => setSelectedFilePreview(null)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              {selectedFilePreview.startsWith('data:image') ? (
                <img 
                  src={selectedFilePreview} 
                  alt="Preview" 
                  className="max-w-full max-h-[60vh] mx-auto rounded-lg" 
                />
              ) : (
                <div className="text-white text-center p-8">
                  <p className="text-lg">Файл: {selectedFilePreview}</p>
                  <p className="text-white/60 text-sm mt-3">
                    Предварительный просмотр недоступен для этого типа файла
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
