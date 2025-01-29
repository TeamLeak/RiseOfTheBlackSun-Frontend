import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { AiOutlineLogin } from "react-icons/ai";
import { useRouter } from "next/navigation"; // Импорт из 'next/navigation' для новых версий Next.js

import LoginModal from "./LoginModal";

const AuthButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Проверка наличия JWT токена в cookies (или где вы его храните)
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt-token="));

    setIsAuthenticated(!!token);
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleLogin = async (email: string, password: string) => {
    // Отправка запроса для авторизации
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      document.cookie = `jwt-token=${data.token}; path=/`;
      setIsAuthenticated(true);
      router.push("/profile");
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Button
          className="text-sm font-normal text-default-600 bg-default-100"
          startContent={<AiOutlineLogin className="text-primary" size={24} />}
          variant="flat"
          onClick={() => router.push("/profile")}
        >
          Профиль
        </Button>
      ) : (
        <Button
          className="text-sm font-normal text-default-600 bg-default-100"
          startContent={<AiOutlineLogin className="text-primary" size={24} />}
          variant="flat"
          onClick={handleOpenModal}
        >
          Войти
        </Button>
      )}
      <LoginModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLogin={handleLogin}
      />
    </>
  );
};

export default AuthButton;
