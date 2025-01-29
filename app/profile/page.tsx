"use client";
import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Divider, Input } from "@heroui/react";

export default function BlogPage() {
  return (
    <div
      className="scroll-hidden"
      style={{ display: "flex", justifyContent: "center", gap: "2rem" }}
    >
      <div
        className="scroll-hidden"
        style={{ display: "flex", justifyContent: "center", gap: "2rem" }}
      >
        <Card isFooterBlurred className="border-none" radius="lg">
          <Image
            alt="Woman listing to music"
            className="object-cover"
            height={250}
            src="https://nextui.org/images/hero-card.jpeg"
            width={250}
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <Button
              fullWidth
              className="text-tiny text-white bg-black/20"
              color="default"
              radius="lg"
              size="sm"
              variant="flat"
            >
              Сменить аватар
            </Button>
          </CardFooter>
        </Card>

        <Card className={"flex"}>
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">Ваш профиль</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className={"flex gap-4"}>
            <Input
              isReadOnly
              className="max-w-xs"
              defaultValue="saintedlittle"
              label="Имя пользователя"
              type="text"
              variant="bordered"
            />
            <Input
              isReadOnly
              className="max-w-xs"
              defaultValue="junior@nextui.org"
              label="Почта от аккаунта"
              type="email"
              variant="bordered"
            />
            <Button
              fullWidth
              className={"text-tiny text-white bg-black/20"}
              color="warning"
              size={"sm"}
              variant={"bordered"}
            >
              Изменить профиль
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
