import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLogin, AiOutlineUser } from "react-icons/ai";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { cn } from "@heroui/react";

import LoginModal from "./LoginModal";

const AuthButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("Player");
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt-token="));

    if (token) {
      // Здесь должен быть запрос за данными пользователя
      setUsername("CyberPlayer");
    }
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    document.cookie =
      "jwt-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthenticated(false);
    setIsOpen(false);
    router.push("/");
  };

  const handleLogin = async (email: string, password: string) => {
    // const response = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // });
    //
    // const data = await response.json();

    document.cookie = `jwt-token=${"token"}; path=/`;
    setUsername("Player");
    setIsAuthenticated(true);
    router.push("/profile");

    // if (data.token) {
    //   document.cookie = `jwt-token=${data.token}; path=/`;
    //   setUsername(data.username || "Player");
    //   setIsAuthenticated(true);
    //   router.push("/profile");
    // }
  };

  // @ts-ignore
  return (
    <>
      {isAuthenticated ? (
        <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
          <DropdownTrigger>
            <Button
              className={cn(
                "group px-3 py-2 rounded-none border-2 border-[#1a1a1a] bg-[#0a0a0a]",
                "hover:border-[#4CAF50] hover:bg-[#0f0f0f] transition-all duration-200",
              )}
              variant="flat"
            >
              <div className="flex items-center gap-2">
                <div className="relative p-1 border-2 border-[#4CAF50]/50">
                  <AiOutlineUser className="w-5 h-5 text-[#6aee87]" />
                </div>
                <span className="font-minecraft text-[#8a8a8a] group-hover:text-[#6aee87]">
                  {username}
                </span>
              </div>
            </Button>
          </DropdownTrigger>

          <AnimatePresence>
            {isOpen && (
              <DropdownMenu
                animate={{ opacity: 1, y: 0 }}
                as={motion.div}
                className="border-2 border-[#1a1a1a] bg-[#0a0a0a] p-1 min-w-[200px]"
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: -10 }}
              >
                <DropdownItem
                  className="hover:bg-[#1a1a1a] px-3 py-2 cursor-pointer"
                  onClick={() => router.push("/profile")}
                >
                  <span className="text-[#8a8a8a] hover:text-[#6aee87]">
                    Профиль
                  </span>
                </DropdownItem>
                <DropdownItem
                  className="hover:bg-[#1a1a1a] px-3 py-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  <span className="text-red-400 hover:text-red-500">Выйти</span>
                </DropdownItem>
              </DropdownMenu>
            )}
          </AnimatePresence>
        </Dropdown>
      ) : (
        <Button
          className={cn(
            "px-5 py-3 rounded-none border-2 border-[#1a1a1a] bg-[#0a0a0a]",
            "font-minecraft hover:border-[#4CAF50] hover:bg-[#0f0f0f]",
          )}
          variant="flat"
          onClick={() => setIsModalOpen(true)}
        >
          <AiOutlineLogin className="text-[#6aee87] mr-2" size={20} />
          <span className="text-[#8a8a8a] group-hover:text-[#6aee87]">
            Войти
          </span>
        </Button>
      )}

      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default AuthButton;
