import { NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { FaTelegramPlane } from "react-icons/fa";
import { Snippet } from "@nextui-org/snippet";

import { siteConfig } from "@/config/site";
import { DiscordIcon, GithubIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

export const NavbarLinks = () => {
  return (
    <Snippet
      hideCopyButton
      hideSymbol
      className="border border-gray-400 hover:border-gray-300 rounded-medium transition duration-300"
    >
      <NavbarItem className="hidden sm:flex gap-2">
        <Link isExternal aria-label="Discord" href={siteConfig.links.telegram}>
          <FaTelegramPlane className="text-default-500" size={20} />
        </Link>

        <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
          <DiscordIcon className="text-default-500" />
        </Link>
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
      </NavbarItem>
    </Snippet>
  );
};
