'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const API_URL = 'https://auth.riseoftheblacksun.eu/login';

const backgroundStyle = {
  backgroundImage: `
    radial-gradient(circle at 100% 100%, rgba(239, 68, 68, 0.1) 0, transparent 50%),
    radial-gradient(circle at 0% 0%, rgba(239, 68, 68, 0.15) 0, transparent 50%)
  `,
};

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

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
        // Получаем данные из ответа, включая JWT токен
        const data = await response.json();
        
        // Сохраняем JWT в куки
        if (data.token) {
          Cookies.set('jwt', data.token, { 
            expires: 7, // Срок действия куки - 7 дней
            secure: process.env.NODE_ENV === 'production', // Использовать HTTPS в продакшн
            sameSite: 'strict' 
          });
          
          // Перенаправляем пользователя на главную страницу
          router.push('/');
        } else {
          throw new Error('Токен не получен от сервера');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка входа');
      }
    } catch (error: any) {
      setError(error.message || 'Неверный email или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 md:px-8 py-6" >
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-black/80 via-black/50 to-black/80 
            backdrop-blur-xl p-6 rounded-lg shadow-xl border border-white/10 
            hover:border-red-500/50 transition-all duration-300 relative overflow-hidden"
        >
          {/* Декоративные элементы */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-red-500/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />

          <div className="relative space-y-4">
            {/* Заголовок */}
            <div className="text-center space-y-1 mb-6">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white"
              >
                Добро пожаловать
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-red-500 uppercase tracking-wider font-medium"
              >
                Войдите в свой аккаунт
              </motion.p>
            </div>

            {/* Сообщение об ошибке */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm flex items-center space-x-2"
                >
                  <XCircleIcon className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Форма */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="group"
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
                transition={{ delay: 0.1 }}
                className="group"
              >
                <label className="block text-white/70 text-xs font-medium mb-1">
                  Пароль
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
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
                      <EyeSlashIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </motion.div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2 text-white/70">
                  <input type="checkbox" className="rounded border-white/20 bg-white/5 text-red-500 
                    focus:ring-red-500/20 transition-colors duration-200" />
                  <span>Запомнить меня</span>
                </label>
                <a href="/forgot-password" className="text-red-500 hover:text-red-400 transition-colors duration-200">
                  Забыли пароль?
                </a>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium
                  px-6 py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 
                  disabled:cursor-not-allowed mt-6"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Вход...
                  </span>
                ) : (
                  'Войти'
                )}
              </motion.button>
            </form>

            <div className="text-center mt-6">
              <a 
                href="/register"
                className="text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                Нет аккаунта? <span className="text-red-500">Зарегистрироваться</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
