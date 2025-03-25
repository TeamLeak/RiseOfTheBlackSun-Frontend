'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const API_URL = 'https://api.example.com/register'; // Замените на ваш реальный URL

// Добавляем новые стили для фона
const backgroundStyle = {
  backgroundImage: `
    radial-gradient(circle at 100% 100%, rgba(239, 68, 68, 0.1) 0, transparent 50%),
    radial-gradient(circle at 0% 0%, rgba(239, 68, 68, 0.15) 0, transparent 50%)
  `,
};

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    number: false,
    special: false,
    capital: false
  });

  // Проверка силы пароля
  const checkPasswordStrength = (password: string) => {
    setPasswordStrength({
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*]/.test(password),
      capital: /[A-Z]/.test(password)
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    checkPasswordStrength(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // Анимация успеха
        console.log('Регистрация успешна!');
        setSuccess(true);
      } else {
        throw new Error('Ошибка регистрации');
      }
    } catch (error) {
      setError('Произошла ошибка при регистрации. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 md:px-8 py-6">
      <div className="flex flex-col md:flex-row max-w-5xl w-full gap-6">
        {/* Агитационная панель */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-1/2 bg-gradient-to-br from-black/80 via-black/50 to-black/80 
            backdrop-blur-xl rounded-lg p-6 shadow-xl
            border border-white/10 hover:border-red-500/50 transition-all duration-300
            relative overflow-hidden"
        >
          {/* Декоративные элементы делаем меньше */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-red-500/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />

          <div className="relative space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="bg-gradient-to-r from-red-500/10 to-orange-500/10 px-3 py-1 rounded-full
                text-xs font-medium text-red-500 border border-red-500/20">
                Новое приключение
              </span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Присоединитесь к
              <span className="block bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                нашему миру
              </span>
            </h1>
            
            <p className="text-base text-white/70">
              Откройте для себя невероятные возможности в нашем сообществе
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="group flex items-start space-x-3 p-3 rounded-lg
                bg-gradient-to-r from-white/5 to-transparent border border-white/10 
                hover:border-red-500/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 
                flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">PVP АРЕНЫ</h3>
                <p className="text-xs text-white/70">Сразитесь с лучшими игроками в захватывающих PVP-битвах</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="group flex items-start space-x-3 p-3 rounded-lg
                bg-gradient-to-r from-white/5 to-transparent border border-white/10 
                hover:border-red-500/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 
                flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">КЛАНЫ</h3>
                <p className="text-xs text-white/70">Создайте свой клан или присоединитесь к существующему</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="group flex items-start space-x-3 p-3 rounded-lg
                bg-gradient-to-r from-white/5 to-transparent border border-white/10 
                hover:border-red-500/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 
                flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">КВЕСТЫ</h3>
                <p className="text-xs text-white/70">Выполняйте увлекательные задания и получайте награды</p>
              </div>
            </motion.div>
          </div>

          {/* Статистика */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-4 rounded-lg bg-gradient-to-r from-white/5 to-transparent
              border border-white/10"
          >
            <div className="flex items-center justify-between text-white/70">
              <div>
                <div className="text-2xl font-bold">100K+</div>
                <div className="text-xs">Игроков</div>
              </div>
              <div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-xs">Квестов</div>
              </div>
              <div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-xs">Поддержка</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Форма регистрации */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full md:w-1/2 bg-gradient-to-br from-black/80 via-black/50 to-black/80 
            backdrop-blur-xl p-6 rounded-lg shadow-xl border border-white/10 
            hover:border-red-500/50 transition-all duration-300 relative overflow-hidden"
        >
          {/* Экран успеха */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/80 
                  backdrop-blur-xl flex items-center justify-center flex-col space-y-4 z-50"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 
                    flex items-center justify-center"
                >
                  <CheckCircleIcon className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white">Регистрация успешна!</h3>
                <p className="text-white/70">Добро пожаловать в наше сообщество</p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "8rem" }}
                  transition={{ delay: 0.5 }}
                  className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Форма */}
          <motion.div className="relative space-y-4">
            <div className="text-center space-y-1">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white"
              >
                Регистрация
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-red-500 uppercase tracking-wider font-medium"
              >
                Создайте свой аккаунт
              </motion.p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-md text-sm flex items-center space-x-2"
                >
                  <XCircleIcon className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="group"
              >
                <label className="block text-white/70 text-xs font-medium mb-1">
                  Имя пользователя
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full px-4 h-10 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg
                      text-sm text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/20 
                      transition-all duration-200 hover:border-white/30"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-white/70 text-xs font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 h-10 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg
                    text-sm text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/20 
                    transition-all duration-200 hover:border-white/30"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-white/70 text-xs font-medium mb-1">
                  Пароль
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handlePasswordChange}
                    className="w-full px-4 h-10 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg
                      text-sm text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/20 
                      transition-all duration-200 hover:border-white/30"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 space-y-2"
                >
                  {Object.entries(passwordStrength).map(([key, valid]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`w-4 h-4 rounded-full ${valid ? 'bg-green-500' : 'bg-white/20'}`}
                      />
                      <span className={`text-sm ${valid ? 'text-green-500' : 'text-white/50'}`}>
                        {key === 'length' && 'Минимум 8 символов'}
                        {key === 'number' && 'Содержит цифру'}
                        {key === 'special' && 'Специальный символ'}
                        {key === 'capital' && 'Заглавная буква'}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium
                  px-6 py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 
                  disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                      {/* ... svg path ... */}
                    </svg>
                    Создание аккаунта...
                  </span>
                ) : (
                  'Создать аккаунт'
                )}
              </motion.button>
            </form>

            <div className="text-center">
              <a 
                href="/login"
                className="text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                Уже есть аккаунт? <span className="text-red-500">Войти</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
