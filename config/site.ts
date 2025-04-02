import { MdForum } from "react-icons/md";
import { BsMap, BsNewspaper } from "react-icons/bs";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Rise of the Black Sun",
  description: "Уникальные Minecraft серверы с продвинутой системой наказаний",
  url: "https://riseoftheblacksun.eu",
  
  // API endpoints
  api: {
    feedback: "https://feedbackservice.riseoftheblacksun.eu/feedback",
    punishments: "https://punishmentsservice.riseoftheblacksun.eu/punishments",
    shop: {
      pay: "https://shopservice.riseoftheblacksun.eu/pay",
      transactions: "https://shopservice.riseoftheblacksun.eu/transactions",
      products: "https://shoplistservice.riseoftheblacksun.eu/products"
    },
    servers: "https://serversservice.riseoftheblacksun.eu/servers",
    launcher: "https://launcher.riseoftheblacksun.eu",
    guide: "https://guide.riseoftheblacksun.eu"
  },

  // Particles configuration
  particles: {
    fullScreen: {
      enable: true,
      zIndex: -1
    },
    background: {
      color: "#000000",
    },
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
        },
      },
      color: {
        value: ["#EF4444", "#F97316", "#F59E0B"],
      },
      shape: {
        type: ["circle", "triangle"],
      },
      opacity: {
        value: { min: 0.1, max: 0.5 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: "out",
      },
      links: {
        enable: true,
        color: "#EF4444",
        opacity: 0.15,
        distance: 150,
        width: 1,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
  },

  // Server data
  server: {
    essentials: {
      requirements: {
        title: "Обязательные условия",
        items: [
          {
            icon: "🌐",
            title: "Интернет-соединение",
            text: "Минимум 5 Мбит/с, стабильный пинг",
          },
          {
            icon: "🔐",
            title: "Лицензия Minecraft",
            text: "Java Edition 1.12.2 - 1.20.x",
          },
          {
            icon: "💿",
            title: "Системные требования",
            text: "Intel i5 / 8GB RAM / SSD",
          },
        ],
      },
      recommendations: {
        title: "Рекомендации",
        items: [
          {
            icon: "🎛️",
            title: "Оптимизация",
            text: "Используйте OptiFine или Sodium",
          },
          {
            icon: "🎧",
            title: "Голосовой чат",
            text: "Подключите гарнитуру",
          },
          {
            icon: "🛡️",
            title: "Безопасность",
            text: "Двухфакторная аутентификация",
          },
        ],
      },
      footer: "IP-адрес сервера обновляется автоматически в нашем Discord-сообществе. Для доступа к экспериментальным сборкам требуется специальная роль.",
    },
    optimization: {
      title: "Оптимизация",
      cards: [
        {
          icon: "command",
          title: "Драйвера",
          content: "Обновите драйвера GPU.",
        },
        {
          icon: "download",
          title: "Моды",
          content: "Sodium, Lithium, LazyDFU, Krypton",
        },
        {
          icon: "server",
          title: "Лаунчеры",
          content: "ATLauncher или PrismLauncher",
        },
      ],
      performance: [
        { title: "Рендеринг", value: "16 чанков", progress: 70 },
        { title: "Память", value: "8 ГБ выделено", progress: 85 },
      ],
    },
    ecosystem: {
      title: "Экосистема",
      integrations: [
        {
          platform: "Discord",
          status: "Online",
          features: ["Синхронизация ролей", "Голосовые каналы"],
        },
        {
          platform: "Telegram",
          status: "Beta",
          features: ["Уведомления", "Статистика"],
        },
        {
          platform: "Web",
          status: "Live",
          features: ["Мониторинг", "Управление"],
        },
      ],
      roadmap: [
        { title: "Собственный лаунчер", progress: 45, eta: "Q3 2024" },
        { title: "Мобильное приложение", progress: 20, eta: "Q4 2024" },
        { title: "API система", progress: 80, eta: "Q2 2024" },
      ],
    },
  },

  // Security settings
  security: {
    encryption: {
      title: "Шифрование",
      description: "Все передаваемые данные защищены протоколом TLS 1.3+"
    },
    storage: {
      title: "Хранение",
      description: "Данные хранятся в ЕС на серверах с ISO 27001 сертификацией"
    },
    access: {
      title: "Доступ",
      description: "Двухфакторная аутентификация для сотрудников"
    }
  },

  ipaddress: "play.riseoftheblacksun.eu",
  big_image: "https://riseoftheblacksun.eu/big_image.png",
  servers_fetch_url: "https://riseoftheblacksun.eu/api/getservers.php",
  navItems: [
    {
      name: "Сервера",
      icon: "FiBox",
      href: "/servers",
      color: "text-blue-400",
      delay: 0.15,
    },
    {
      name: "Магазин",
      icon: "RiCoinLine",
      href: "/store",
      color: "text-amber-400",
      delay: 0.1,
    },
    {
      name: "Обратная связь",
      icon: "FiMessageSquare",
      href: "/feedback",
      color: "text-emerald-400",
      delay: 0.3,
    },
    {
      name: "Гайды",
      icon: "GiHelp",
      href: "https://guide.riseoftheblacksun.eu/",
      color: "text-emerald-400",
      delay: 0.3,
    },
    {
      name: "Документы",
      icon: "CgFileDocument",
      href: "/documents",
      color: "text-purple-400",
      delay: 0.5,
    },
  ],
  navMenuItems: [
    {
      name: "Форум",
      href: "/forum",
      icon: {
        type: MdForum,
        className: "text-amber-700",
        size: 22,
      },
    },
    {
      name: "Карта",
      href: "/map",
      icon: {
        type: BsMap,
        className: "text-warning",
        size: 20,
      },
    },
    {
      name: "Новости",
      href: "/servers",
      icon: {
        type: BsNewspaper,
        className: "text-blue-500",
        size: 20,
      },
    },
  ],
  links: {
    github: "https://github.com/saintedlittle",
    docs: "https://nextui.org",
    discord: "https://discord.gg/deDgXYCCcA",
    sponsor: "https://vk.com/asykyy",
    onlinemap: "https://map.riseoftheblacksun.eu",
    forum: "https://t.me/+J87i02XAM9Q1YzI6",
    telegram: "https://t.me/riseoftheblacksun",
  },
  servers: {
    vanilla: "play.riseoftheblacksun.eu",
  },

  // Footer sections
  footer: {
    sections: [
      {
        title: "О проекте",
        items: [
          {
            name: "О нас",
            href: "/about",
          },
          {
            name: "Новости",
            href: "/news",
          },
          {
            name: "Контакты",
            href: "/contacts",
          },
        ],
      },
      {
        title: "Игрокам",
        items: [
          {
            name: "Правила",
            href: "/rules",
          },
          {
            name: "FAQ",
            href: "/faq",
          },
          {
            name: "Поддержка",
            href: "/support",
          },
        ],
      },
      {
        title: "Сообщество",
        items: [
          {
            name: "Discord",
            href: "https://discord.gg/deDgXYCCcA",
          },
          {
            name: "Telegram",
            href: "https://t.me/riseoftheblacksun",
          },
          {
            name: "VK",
            href: "https://vk.com/asykyy",
          },
        ],
      },
    ],
    bottom: {
      copyright: "© 2024 Rise of the Black Sun. Все права защищены.",
      links: [
        {
          name: "Политика конфиденциальности",
          href: "/privacy",
        },
        {
          name: "Условия использования",
          href: "/terms",
        },
      ],
    },
  },
};
