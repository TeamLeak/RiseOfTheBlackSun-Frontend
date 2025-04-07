//@ts-nocheck @ts-ignore
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { XCircleIcon, CheckCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setTokenError(true);
      setError('Отсутствует токен для сброса пароля. Пожалуйста, убедитесь, что вы перешли по правильной ссылке из письма.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setError('Отсутствует токен для сброса пароля');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://auth.riseoftheblacksun.eu/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      
      if (response.ok) {
        setSuccess(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Не удалось сбросить пароль');
      }
    } catch (error: any) {
      setError(error.message || 'Произошла ошибка при сбросе пароля');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 md:px-8 py-6">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-black/80 via-black/50 to-black/80 
            backdrop-blur-xl p-6 rounded-lg shadow-xl border border-white/10 
            hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />

          <div className="relative space-y-4">
            <div className="text-center space-y-1 mb-6">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white"
              >
                Создание нового пароля
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-purple-500 uppercase tracking-wider font-medium"
              >
                Введите и подтвердите новый пароль
              </motion.p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm flex items-center space-x-2"
              >
                <XCircleIcon className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-green-500/10 border border-green-500/20 text-green-500 p-3 rounded-lg text-sm flex items-center space-x-2"
              >
                <CheckCircleIcon className="w-4 h-4 flex-shrink-0" />
                <span>Пароль успешно изменен!</span>
              </motion.div>
            )}

            {!success && !tokenError ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="group"
                >
                  <label className="block text-white/70 text-xs font-medium mb-1">
                    Новый пароль
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 h-10 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg
                        text-sm text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 
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
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="group"
                >
                  <label className="block text-white/70 text-xs font-medium mb-1">
                    Подтвердите пароль
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 h-10 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg
                        text-sm text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 
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

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium
                    px-6 py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 
                    disabled:cursor-not-allowed mt-6"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Сохранение...
                    </span>
                  ) : (
                    'Сохранить новый пароль'
                  )}
                </motion.button>
              </form>
            ) : (
              success && (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => router.push('/login')}
                  className="w-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium
                    px-6 py-2.5 rounded-lg transition-all duration-200 mt-6"
                >
                  Перейти на страницу входа
                </motion.button>
              )
            )}

            {tokenError && (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => router.push('/forgot-password')}
                className="w-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium
                  px-6 py-2.5 rounded-lg transition-all duration-200 mt-6"
              >
                Запросить новую ссылку для сброса пароля
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 