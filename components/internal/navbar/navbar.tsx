"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiBook, FiBox, FiMessageSquare, FiMenu, FiX, FiCode } from "react-icons/fi";
import { RiCoinLine } from "react-icons/ri";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";
import { cn } from "@heroui/react";
import { CgFileDocument } from "react-icons/cg";
import { GiHelp } from "react-icons/gi";

import { siteConfig } from "@/config/site";
import { AuthButton } from "./auth-button";

// Маппинг иконок
const iconMapping = {
  FiBox,
  FiMessageSquare,
  RiCoinLine,
  CgFileDocument,
  GiHelp,
};

interface NavItem {
  name: string;
  icon: string;
  href: string;
  color: string;
  delay: number;
}

export const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderNavItem = (item: NavItem) => {
    const Icon = iconMapping[item.icon as keyof typeof iconMapping];
    return (
      <Button
        as={Link}
        className={cn(
          "px-5 py-3 rounded-none border-2 border-[#1a1a1a] bg-[#0a0a0a]",
          "font-minecraft hover:border-[#4CAF50] hover:bg-[#0f0f0f]",
          pathname === item.href ? "border-[#4CAF50]" : "",
        )}
        href={item.href}
        variant="flat"
      >
        <Icon className={cn(item.color, "mr-2")} size={20} />
        <span className="text-[#8a8a8a] group-hover:text-[#6aee87]">
          {item.name}
        </span>
      </Button>
    );
  };

  const renderMobileNavItem = (item: NavItem) => {
    const Icon = iconMapping[item.icon as keyof typeof iconMapping];
    return (
      <Button
        fullWidth
        as={Link}
        className={cn(
          "justify-start px-6 py-4 text-lg",
          "border-2 border-[#1a1a1a] bg-[#0a0a0a]",
          pathname === item.href && "border-[#4CAF50]",
        )}
        href={item.href}
        variant="flat"
        onClick={() => setIsMenuOpen(false)}
      >
        <Icon className={cn(item.color, "mr-3")} size={24} />
        <span className="text-[#8a8a8a]">{item.name}</span>
      </Button>
    );
  };

  return (
    <NextUINavbar
      className="z-50 bg-[#080808]/90 backdrop-blur-lg border-b-2 border-[#1a1a1a] shadow-pixel"
      isBlurred={false}
      isMenuOpen={isMenuOpen}
      maxWidth="2xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Анимированный пиксельный фон */}
      <div className="absolute inset-0 z-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0, 0.3, 0],
              transition: {
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              },
            }}
            className="absolute w-[2px] h-[2px] bg-[#4CAF50]"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Мобильное меню: кнопка бургер */}
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          className="text-[#6aee87] z-50"
          icon={isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        />
      </NavbarContent>

      {/* Логотип для мобильной версии с текстом */}
      <NavbarContent className="md:hidden z-50" justify="center">
        <Link className="font-minecraft flex items-center" href="/">
          <div className="relative p-2">
            <img
              alt="Логотип"
              className="w-6 h-6 text-[#6aee87]"
              height="36"
              src="/input.svg"
              width="32"
            />
            <div className="absolute inset-0 border-2 border-[#4CAF50]/50 opacity-50" />
          </div>
        </Link>
      </NavbarContent>

      {/* Десктопная навигация */}
      <NavbarContent className="hidden md:flex gap-4" justify="start">
        <div className="flex items-center gap-2">
          <Link
            className="font-minecraft flex items-center gap-3 group"
            href="/"
          >
            <div className="relative p-2">
              <img
                alt="Логотип"
                className="w-6 h-6 text-[#6aee87]"
                height="36"
                src="/input.svg"
                width="32"
              />
              <div className="absolute inset-0 border-2 border-[#4CAF50]/50 opacity-50" />
            </div>
          </Link>
        </div>
      </NavbarContent>

      {/* Основные пункты меню (десктоп) */}
      <NavbarContent className="hidden md:flex gap-1" justify="center">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.name}>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -10 }}
              transition={{ delay: item.delay }}
            >
              {renderNavItem(item)}
            </motion.div>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Социальные кнопки и авторизация (десктоп) */}
      <NavbarContent className="hidden md:flex gap-2" justify="end">
        <motion.div
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
        >
          <Button
            isIconOnly
            as={Link}
            className="border-2 border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#4CAF50] rounded-none"
            href={siteConfig.links.telegram}
            variant="flat"
          >
            <FaTelegramPlane className="w-5 h-5 text-[#6aee87]" />
          </Button>

          <Button
            isIconOnly
            as={Link}
            className="border-2 border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#4CAF50] rounded-none"
            href={siteConfig.links.discord}
            variant="flat"
          >
            <FaDiscord className="w-5 h-5 text-[#6aee87]" />
          </Button>

          <AuthButton />
        </motion.div>
      </NavbarContent>

      {/* Мобильное меню */}
      <NavbarMenu className="bg-[#080808]/95 backdrop-blur-xl border-l-2 border-[#1a1a1a] pt-4">
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="px-4"
          exit={{ opacity: 0, x: -20 }}
          initial={{ opacity: 0, x: -20 }}
        >
          <div className="flex flex-col gap-2">
            {siteConfig.navItems.map((item) => (
              <NavbarMenuItem key={item.name}>
                {renderMobileNavItem(item)}
              </NavbarMenuItem>
            ))}

            {/* Социальные кнопки (мобильные) */}
            <div className="flex justify-center gap-4 mt-4">
              <Button
                isIconOnly
                as={Link}
                className="border-2 border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#4CAF50]"
                href={siteConfig.links.telegram}
                variant="flat"
              >
                <FaTelegramPlane className="w-6 h-6 text-[#6aee87]" />
              </Button>

              <Button
                isIconOnly
                as={Link}
                className="border-2 border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#4CAF50]"
                href={siteConfig.links.discord}
                variant="flat"
              >
                <FaDiscord className="w-6 h-6 text-[#6aee87]" />
              </Button>
            </div>

            {/* Авторизация (мобильные) */}
            <div className="mt-6 flex justify-center">
              <AuthButton />
            </div>
          </div>
        </motion.div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
