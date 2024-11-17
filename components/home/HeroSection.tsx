import React, { useEffect, useRef, useState } from "react";
import { Snippet } from "@nextui-org/snippet";
import { Tooltip } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";

import "./styles.css"; // Ваши стили

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
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Левая часть: Текст */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-center lg:text-left relative">
              <span className="relative">
                <span
                  ref={underlineRef}
                  className={`absolute bottom-0 left-0 h-[4px] ${
                    !underline ? "hidden" : "block"
                  }`}
                  style={{
                    width: "100%",
                    backgroundColor: "var(--nextui-colors-primary)",
                    zIndex: -1,
                  }}
                />
                Уникальные
              </span>
              <br />
              Майнкрафт сервера
            </h1>
            <p className="text-md md:text-lg mt-4 text-center lg:text-left">
              {siteConfig.name} - {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                className="bg-primary text-white font-bold py-3 px-6 rounded-md transition duration-300 w-full sm:w-auto h-14" // h-14 corresponds to 3.5rem; adjust as needed
                size="lg"
                onPress={() => router.push("/play")}
              >
                Начать играть
              </Button>

              <Snippet
                hideSymbol
                className="font-bold py-3 px-6 rounded-md transition duration-300 w-full sm:w-auto"
                color="success"
              >
                {siteConfig.ipaddress}
              </Snippet>
            </div>
          </div>
          {/* Правая часть: Картинка */}
          <Tooltip
            key={"success"}
            className="capitalize"
            color={"success"}
            content={"Просто забавный персонаж!"}
            placement={"bottom"}
          >
            <div className="relative hidden lg:block">
              <img
                alt="Minecraft Character"
                className="h-64 w-auto slide-in-right"
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
