"use client";
import React from "react";
import { Modal, useDisclosure } from "@heroui/react";
import { Button } from "@heroui/button";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";

import HomeButton from "./HomeButton";

interface ServerCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Компонент иконки
  iconColor: string;
  title: string;
  badge?: string;
  description: string;
  buttonText: string;
  ipAddress: string;
  hideCopyIP?: boolean; // Новый пропс для скрытия кнопки "Скопировать IP"
}

const ServerCard: React.FC<ServerCardProps> = ({
  icon: Icon,
  iconColor,
  title,
  badge,
  description,
  buttonText,
  ipAddress,
  hideCopyIP = false, // Установка значения по умолчанию
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const copyIP = async () => {
    try {
      await navigator.clipboard.writeText(ipAddress);
      alert("IP Адрес скопирован!");
    } catch (err) {
      alert("Failed to copy IP Address");
    }
  };

  const formatDescription = (text: string): JSX.Element => {
    const processedParagraphs = text
      .split(/(?<!\d)\.(?!\d)/) // Разделяем только там, где точка не между числами
      .filter((part) => part.trim() !== "");

    return (
      <>
        {processedParagraphs.map((paragraph, index) => (
          <React.Fragment key={index}>
            {paragraph.trim()}
            {index < processedParagraphs.length - 1 && "."}
            <br />
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-gray-700">
          <Icon className="w-6 h-6" style={{ color: iconColor }} />
        </div>
        <span className="text-xl font-bold text-white">{title}</span>
        {badge && (
          <div className="bg-gray-700 text-white px-2 py-1 rounded-md text-sm">
            {badge}
          </div>
        )}
      </div>
      <p className="mt-4 text-gray-300">{description}</p>
      <HomeButton
        className="bg-blue-500 hover:bg-blue-600 mt-4 block text-center"
        href="#"
        onClick={onOpen}
      >
        {buttonText}
      </HomeButton>

      <Modal
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Сервер {title}
              </ModalHeader>
              <ModalBody>{formatDescription(description)}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant={"bordered"} onPress={onClose}>
                  Закрыть
                </Button>
                {!hideCopyIP && ( // Условие для показа/скрытия кнопки
                  <Button color="primary" variant={"bordered"} onPress={copyIP}>
                    Скопировать IP
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ServerCard;
