"use client";
import { useEffect, useRef, useState } from "react";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";

import { siteConfig } from "@/config/site";

import "./styles.css";
import { useRouter } from "next/navigation";
import { Tooltip } from "@nextui-org/react";
import { Button } from "@nextui-org/button"; // Импорт стилей с анимацией

const HeroSection: React.FC = () => {
  const [underline, setUnderline] = useState(true);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUnderline(false);
    }, 4000); // Продолжительность анимации набора текста

    return () => clearTimeout(timer);
  }, []);

  const router = useRouter();

  return (
    <div className="">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              <span className="typing">
                <span
                  ref={underlineRef}
                  className={`double-underline ${!underline ? "underline-fade" : ""}`}
                >
                  Уникальные
                </span>
                <br />
                Майнкрафт сервера
              </span>
            </h1>
            <p className="text-lg mt-4">
              {siteConfig.name} - {siteConfig.description}
            </p>
            <div className="mt-8 flex gap-4">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition duration-300 h-15"
                size="lg"
                onClick={() => router.push("/play")}
              >
                Начать играть
              </Button>
              <Snippet
                hideSymbol
                className="border border-gray-400 hover:border-gray-300 text-gray-400 hover:text-gray-300 font-bold py-3 px-6 rounded-md transition duration-300"
                color="success"
              >
                {siteConfig.ipaddress}
              </Snippet>
            </div>
          </div>
          <Tooltip
            key={"success"}
            className="capitalize"
            color={"success"}
            content={"Просто забавный персонаж!"}
            placement={"bottom"}
          >
            <div className="relative">
              <img
                alt="Minecraft Character"
                className="h-auto slide-in-right"
                src={siteConfig.big_image}
              />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
