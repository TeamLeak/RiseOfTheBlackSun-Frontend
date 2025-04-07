//@ts-nocheck @ts-ignore
"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Head from "next/head";
import { FiAlertTriangle } from "react-icons/fi";

// Компонент ErrorParticles – мерцающие красные иконки ошибок
const ErrorParticles = () => {
    const count = 40; // Количество иконок на фоне
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {Array.from({ length: count }).map((_, i) => {
                const top = Math.random() * 100;
                const left = Math.random() * 100;
                const size = Math.random() * 30 + 15; // Размер от 15 до 45px
                const duration = 2 + Math.random() * 3;
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
                            opacity: [0, 0.9, 0],
                            scale: [0, 1, 0],
                            rotate: [initialRotate, initialRotate + 180, initialRotate + 360],
                        }}
                        transition={{
                            duration: duration,
                            repeat: Infinity,
                            delay: delay,
                        }}
                        className="absolute"
                    >
                        <FiAlertTriangle style={{ width: size, height: size, color: "rgba(255,0,0,0.8)" }} />
                    </motion.div>
                );
            })}
        </div>
    );
};

function PayErrorContent() {
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
                <title>Ошибка оплаты</title>
            </Head>
            <div
                className="relative min-h-screen bg-[#080808] flex flex-col items-center justify-center p-8 overflow-hidden">
                {/* Фоновый эффект – мерцающие иконки ошибки */}
                <ErrorParticles/>

                <motion.h1
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="relative text-5xl font-extrabold mb-8 text-red-600 drop-shadow-lg text-center"
                >
                    Ошибка оплаты!
                </motion.h1>

                <motion.div
                    initial={{scale: 0.95, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{duration: 0.4}}
                    className="relative bg-[#0a0a0a] border border-[#FFD700]/30 rounded-xl p-6 mb-8 w-full max-w-md shadow-md overflow-hidden"
                >
                    {productImage && (
                        <img
                            src={productImage}
                            alt="Изображение товара"
                            className="w-full max-h-60 object-contain mb-4 rounded"
                        />
                    )}
                    <h2 className="text-2xl font-bold mb-4 text-white">Детали ошибки</h2>
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
                    whileHover={{scale: 1.05, transition: {duration: 0.1}}}
                    whileTap={{scale: 0.98, transition: {duration: 0.1}}}
                    onClick={() => router.push("/store")}
                    className="relative px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold rounded-lg shadow-lg hover:shadow-md transition-shadow"
                >
                    Вернуться в магазин
                </motion.button>
            </div>
        </>
    );
}

export default function PayErrorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PayErrorContent/>
        </Suspense>
    );
}
