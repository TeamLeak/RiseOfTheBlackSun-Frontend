//@ts-nocheck @ts-ignore
"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Head from "next/head";

import { FiStar, FiSun, FiMoon } from "react-icons/fi";
import { GiFlame, GiAbstract003 } from "react-icons/gi";

// Массив иконок для случайного выбора
const icons = [FiStar, FiSun, FiMoon, GiFlame, GiAbstract003];

const EpicGlowBackground = () => {
    const count = 60; // Количество иконок на фоне
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {Array.from({ length: count }).map((_, i) => {
                const IconComponent = icons[Math.floor(Math.random() * icons.length)];
                const top = Math.random() * 100;
                const left = Math.random() * 100;
                const size = Math.random() * 40 + 20; // Размер от 20 до 60px
                const duration = 3 + Math.random() * 4;
                const delay = Math.random() * 2;
                const initialRotate = Math.random() * 360;
                return (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            rotate: initialRotate,
                            top: `${top}%`,
                            left: `${left}%`,
                        }}
                        animate={{
                            opacity: [0, 0.8, 0],
                            scale: [0, 1, 0],
                            rotate: [initialRotate, initialRotate + 360, initialRotate + 720],
                        }}
                        transition={{
                            duration: duration,
                            repeat: Infinity,
                            delay: delay,
                        }}
                        className="absolute"
                    >
                        <IconComponent style={{ width: size, height: size, color: "rgba(255,215,0,0.7)" }} />
                    </motion.div>
                );
            })}
        </div>
    );
};

function PaySuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const orderId = searchParams.get("order_id") || "Не указан";
    const playerName = searchParams.get("player_name") || "Не указан";
    const email = searchParams.get("email") || "Не указан";
    const desc = searchParams.get("desc") || "Отсутствует";
    const productImage = searchParams.get("product_image");

    return (
        <>
            <Head>
                <title>Оплата успешна</title>
            </Head>
            <div className="relative min-h-screen bg-[#080808] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
                {/* Фоновый эффект с эпичными иконками */}
                <EpicGlowBackground />

                <motion.h1
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent drop-shadow-lg text-center"
                >
                    Поздравляем!
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="relative text-base sm:text-lg md:text-xl text-white mb-8 text-center max-w-md mx-auto"
                >
                    Ваша оплата прошла успешно. Спасибо за покупку!
                </motion.p>
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, rotate: -2 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-[#0a0a0a] border border-[#FFD700]/30 rounded-xl p-4 sm:p-6 mb-8 w-full max-w-md sm:max-w-xl shadow-md overflow-hidden"
                >
                    {productImage && (
                        <img
                            src={productImage}
                            alt="Изображение товара"
                            className="w-full max-h-60 object-contain mb-4 rounded"
                        />
                    )}
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
                        Детали платежа
                    </h2>
                    <div className="text-white text-base space-y-2">
                        <p>
                            <strong>Order ID:</strong> {orderId}
                        </p>
                        <p>
                            <strong>Имя игрока:</strong> {playerName}
                        </p>
                        <p>
                            <strong>Email:</strong> {email}
                        </p>
                        <p>
                            <strong>Описание:</strong> {desc}
                        </p>
                    </div>
                </motion.div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/store")}
                    className="relative px-4 sm:px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold rounded-lg shadow-lg hover:shadow-md transition-shadow"
                >
                    Вернуться в магазин
                </motion.button>
            </div>
        </>
    );
}

export default function PaySuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaySuccessContent />
        </Suspense>
    );
}
