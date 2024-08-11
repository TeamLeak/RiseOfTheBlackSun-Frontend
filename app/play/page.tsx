"use client";
import React from "react";
import { Accordion, AccordionItem, Spacer } from "@nextui-org/react";
import { MonitorMobileIcon } from "@nextui-org/shared-icons";
import { IoContrast, IoGameController } from "react-icons/io5";

import { title } from "@/components/primitives";

export default function BlogPage() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div
      className="scroll-hidden"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div>
        <h1 className={title()}>Как играть</h1>
        <Spacer y={40} />
        <Accordion variant="splitted">
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            startContent={<MonitorMobileIcon className="text-primary size-8" />}
            subtitle="Ответы на вопросы как подключиться, и т.д."
            title="Основные сведения."
          >
            <p>
              Для игры на сервере, <strong>вам потребуется</strong>:
            </p>
            <Spacer />
            <ul
              style={{
                paddingLeft: "20px",
                margin: "0",
                listStylePosition: "outside",
                textAlign: "left",
              }}
            >
              <Spacer y={4} />

              <li>Хорошее подключение к интернету.</li>
              <Spacer />
              <li>
                Наличие <strong>ЛЮБОЙ</strong> версии Minecraft, главное - чтобы
                она совпадала с версией того сервера, на котором вы ходите
                играть.
              </li>
            </ul>

            <Spacer y={8} />
            <strong>
              Получить IP-адрес вы можете на главной странице, выбрав
              понравившийся сервер!!!
            </strong>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            startContent={<IoGameController className="text-primary size-8" />}
            subtitle={
              <span>
                Тут вы можете узнать про например включение{" "}
                <strong>голосового чата</strong>.
              </span>
            }
            title="Дополнительные сведения."
          >
            {/* TODO DATA */}
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Accordion 3"
            startContent={<IoContrast className="text-primary size-8" />}
            subtitle="В этом разделе мы подготовили для вас основные советы и рекомендации, которые
            возможно смогут вам помочь в начале игры."
            title="Советы и рекомендации."
          >
            {/* TODO DATA */}
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
