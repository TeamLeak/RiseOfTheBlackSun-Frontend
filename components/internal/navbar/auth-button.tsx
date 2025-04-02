"use client";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem 
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { FiSettings, FiUser, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode'
interface UserData {
  username: string;
  avatar?: string;
}

export const AuthButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Проверка JWT токена при загрузке
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    const token = Cookies.get("jwt");
    
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      // Проверяем, не истек ли токен
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp < currentTime) {
        // Токен истек
        Cookies.remove("jwt");
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Токен валиден, получаем данные пользователя
      const response = await fetch("https://auth.riseoftheblacksun.eu/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserData({
          username: data.username,
          avatar: data.avatar // base64 строка или undefined
        });
        setIsAuthenticated(true);
      } else {
        // Проблема с токеном или сервером
        Cookies.remove("jwt");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Ошибка проверки аутентификации:", error);
      setIsAuthenticated(false);
    }
    
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      const token = Cookies.get("jwt");
      
      // Отправляем запрос на сервер для завершения сессии
      if (token) {
        const response = await fetch("https://auth.riseoftheblacksun.eu/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        if (!response.ok) {
          console.error("Ошибка при выходе из системы:", await response.text());
        }
      }
    } catch (error) {
      console.error("Ошибка при выходе из системы:", error);
    } finally {
      // Удаляем JWT из куки независимо от результата запроса
      Cookies.remove("jwt");
      setIsAuthenticated(false);
      setUserData(null);
      router.push("/");
    }
  };

  // Создаем аватар с первой буквой имени, если нет аватарки
  const getInitialAvatar = () => {
    if (!userData || !userData.username) return "";
    return userData.username.charAt(0).toUpperCase();
  };

  if (isLoading) {
    return (
      <Button
        className="border-2 border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#4CAF50] rounded-none px-4 py-2"
        variant="flat"
        isLoading
      >
        <span className="text-[#8a8a8a]">Загрузка</span>
      </Button>
    );
  }

  if (!isAuthenticated) {
    return (
      <Button
        as={Link}
        className="border-2 border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#4CAF50] rounded-none px-4 py-2"
        href="/login"
        variant="flat"
      >
        <span className="text-[#8a8a8a] hover:text-[#6aee87]">Войти</span>
      </Button>
    );
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          className="border-2 border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#4CAF50] rounded-none px-3 py-2 min-w-0"
          variant="flat"
        >
          <div className="flex items-center gap-2">
            <Avatar
              size="sm"
              src={userData?.avatar}
              fallback={!userData?.avatar ? getInitialAvatar() : undefined}
              color="success"
              className="transition-transform"
              showFallback
            />
            <span className="text-[#8a8a8a] hover:text-[#6aee87] hidden md:block">
              {userData?.username}
            </span>
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Меню пользователя"
        className="bg-[#0a0a0a] border-2 border-[#1a1a1a] p-1"
      >
        <DropdownItem
          key="profile"
          className="text-[#8a8a8a] hover:text-[#6aee87] hover:bg-[#0f0f0f] p-2"
          startContent={<FiUser className="text-[#6aee87]" />}
          as={Link}
          href="/profile"
        >
          Мой профиль
        </DropdownItem>
        <DropdownItem
          key="settings"
          className="text-[#8a8a8a] hover:text-[#6aee87] hover:bg-[#0f0f0f] p-2"
          startContent={<FiSettings className="text-[#6aee87]" />}
          as={Link}
          href="/settings"
        >
          Настройки
        </DropdownItem>
        <DropdownItem
          key="logout"
          className="text-[#8a8a8a] hover:text-[#6aee87] hover:bg-[#0f0f0f] p-2"
          startContent={<FiLogOut className="text-red-400" />}
          color="danger"
          onClick={handleLogout}
        >
          Выйти
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}; 