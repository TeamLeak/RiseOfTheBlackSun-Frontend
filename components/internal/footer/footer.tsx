"use client";
import { motion } from "framer-motion";
import { FaDiscord, FaTelegramPlane, FaVk } from "react-icons/fa";
import { Link } from "@heroui/link";
import { siteConfig } from "@/config/site";

const socialIcons = {
  Discord: FaDiscord,
  Telegram: FaTelegramPlane,
  VK: FaVk,
};

export const Footer = () => {
  return (
    <footer className="bg-[#080808]/90 backdrop-blur-lg border-t-2 border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.footer.sections.map((section) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[#8a8a8a] hover:text-[#6aee87] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#1a1a1a]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#8a8a8a] text-sm">{siteConfig.footer.bottom.copyright}</p>
            <div className="flex gap-6">
              {siteConfig.footer.bottom.links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[#8a8a8a] hover:text-[#6aee87] transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 