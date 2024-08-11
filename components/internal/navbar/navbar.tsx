"use client"
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { AiOutlineLogin } from "react-icons/ai";
import { Spacer } from "@nextui-org/react";
import { BsMap } from "react-icons/bs";
import { MdForum } from "react-icons/md";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";
import { NavbarLinks } from "@/components/internal/navbar/NavbarLinks";
import { CustomNavbarMenu } from "@/components/internal/navbar/CustomNavbarMenu";
import AuthButton from "@/components/AuthButton";

export const Navbar = () => {
  return (
    <NextUINavbar
      className="justify-items-center"
      maxWidth="xl"
      position="sticky"
    >
      <CustomNavbarMenu />
      <NavbarItem className="hidden md:flex">
        <Button
          isExternal
          as={Link}
          className="text-sm font-normal text-default-600 bg-default-100"
          href={siteConfig.links.forum}
          startContent={<MdForum className="text-amber-700" size={22} />}
          variant="flat"
        >
          Форум
        </Button>

        <Spacer x={4} />
        <Button
          isExternal
          as={Link}
          className="text-sm font-normal text-default-600 bg-default-100"
          href={siteConfig.links.onlinemap}
          startContent={<BsMap className="text-warning" size={20} />}
          variant="flat"
        >
          Карта
        </Button>

        <Spacer x={4} />
        <AuthButton />
      </NavbarItem>
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarLinks />
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/*<NavbarMenu>*/}
      {/*  <div className="mx-4 mt-2 flex flex-col gap-2">*/}
      {/*    {siteConfig.navMenuItems.map((item, index) => (*/}
      {/*      <NavbarMenuItem key={`${item}-${index}`}>*/}
      {/*        <Link*/}
      {/*          color={*/}
      {/*            index === 2*/}
      {/*              ? "primary"*/}
      {/*              : index === siteConfig.navMenuItems.length - 1*/}
      {/*                ? "danger"*/}
      {/*                : "foreground"*/}
      {/*          }*/}
      {/*          href="#"*/}
      {/*          size="lg"*/}
      {/*        >*/}
      {/*        </Link>*/}
      {/*      </NavbarMenuItem>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</NavbarMenu>*/}
    </NextUINavbar>
  );
};
