import { NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import NextLink from "next/link";

import { Logo } from "@/components/icons";
import { siteConfig } from "@/config/site";

export const CustomNavbarMenu = () => {
  return (
    <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
      <NavbarBrand as="li" className="gap-3 max-w-fit">
        <NextLink className="flex justify-start items-center gap-1" href="/">
          <Logo />
          <p className="font-bold text-inherit">{siteConfig.name}</p>
        </NextLink>
      </NavbarBrand>
      {/*<ul className="hidden lg:flex gap-4 justify-center justify-items-center justify-self-center ml-2">*/}
      {/*  {siteConfig.navItems.map((item) => (*/}
      {/*    <NavbarItem key={item.href}>*/}
      {/*      <NextLink*/}
      {/*        className={clsx(*/}
      {/*          linkStyles({ color: "foreground" }),*/}
      {/*          "data-[active=true]:text-primary data-[active=true]:font-medium",*/}
      {/*        )}*/}
      {/*        color="foreground"*/}
      {/*        href={item.href}*/}
      {/*      >*/}
      {/*        {item.label}*/}
      {/*      </NextLink>*/}
      {/*    </NavbarItem>*/}
      {/*  ))}*/}
      {/*</ul>*/}
    </NavbarContent>
  );
};
