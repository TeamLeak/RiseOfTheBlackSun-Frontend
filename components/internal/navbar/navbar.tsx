"use client";
import { motion, AnimatePresence } from "framer-motion";
import {FiBook, FiBox, FiMessageSquare} from "react-icons/fi";
import { RiCoinLine } from "react-icons/ri";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";
import { cn } from "@heroui/react";
import { CgFileDocument } from "react-icons/cg";

import AuthButton from "@/components/AuthButton";
import { siteConfig } from "@/config/site";

const menuItems = [
  {
    name: "Новости",
    icon: FiBook,
    href: "/news",
    color: "text-blue-400",
    delay: 0.2,
  },
  {
    name: "Магазин",
    icon: RiCoinLine,
    href: "/store",
    color: "text-amber-400",
    delay: 0.1,
  },
  {
    name: "Сервера",
    icon: FiBox,
    href: "/servers",
    color: "text-blue-400",
    delay: 0.2,
  },
  {
    name: "Документы",
    icon: CgFileDocument,
    href: "/documents",
    color: "text-purple-400",
    delay: 0.5,
  },
  {
    name: "Форум",
    icon: FiMessageSquare,
    href: siteConfig.links.forum,
    color: "text-emerald-400",
    delay: 0.3,
  },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <NextUINavbar
      className="bg-[#080808]/90 backdrop-blur-lg border-b-2 border-[#1a1a1a] shadow-pixel"
      isBlurred={false}
      maxWidth="2xl"
      position="sticky"
    >
      {/* Анимированный фон */}
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

      {/* Десктопная навигация */}
      <NavbarContent className="hidden md:flex gap-4" justify="start">
        <div className={"flex items-center gap-2"}>
          <Link
            className="font-minecraft flex items-center gap-3 group"
            href="/"
          >
            <div className="relative p-2 ">
              <img
                alt="Logo"
                className={"w-6 h-6 text-[#6aee87]"}
                height="36"
                src="/input.svg"
                width="32"
              />
              <div className="absolute inset-0 border-2 border-[#4CAF50]/50 opacity-50" />
            </div>
          </Link>
        </div>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-1" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -10 }}
              transition={{ delay: item.delay }}
            >
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
                <item.icon className={cn(item.color, "mr-2")} size={20} />
                <span className="text-[#8a8a8a] group-hover:text-[#6aee87]">
                  {item.name}
                </span>
              </Button>
            </motion.div>
          </NavbarItem>
        ))}
      </NavbarContent>

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

      <NavbarMenu className="bg-[#080808]/95 backdrop-blur-xl border-l-2 border-[#1a1a1a]">
        <AnimatePresence>
          <div className="px-4 py-8">
            {menuItems.map((item) => (
              <motion.div
                key={item.name}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                initial={{ opacity: 0, x: -20 }}
                transition={{ delay: item.delay * 0.5 }}
              >
                <NavbarMenuItem>
                  <Button
                    fullWidth
                    as={Link}
                    className={cn(
                      "justify-start px-6 py-4 text-lg mb-2",
                      "border-2 border-[#1a1a1a] bg-[#0a0a0a]",
                      pathname === item.href ? "border-[#4CAF50]" : "",
                    )}
                    href={item.href}
                    variant="flat"
                  >
                    <item.icon className={cn(item.color, "mr-3")} size={24} />
                    <span className="text-[#8a8a8a]">{item.name}</span>
                  </Button>
                </NavbarMenuItem>
              </motion.div>
            ))}

            <motion.div
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-4 mt-6"
              initial={{ opacity: 0 }}
            >
              <AuthButton />
            </motion.div>

            <motion.div
              animate={{ scale: 1 }}
              className="flex justify-center gap-4 mt-8"
              initial={{ scale: 0 }}
            >
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
            </motion.div>
          </div>
        </AnimatePresence>
      </NavbarMenu>
    </NextUINavbar>
  );
};
