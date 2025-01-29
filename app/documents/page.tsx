"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  ShieldAlert,
  Handshake,
  ChevronRight,
  Download,
  PrinterIcon, ChevronLeft,
} from "lucide-react";
import React, { useState, useRef, useCallback } from "react";
import { cn } from "@heroui/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const documents = [
  {
    id: "offer",
    title: "Публичная оферта",
    icon: FileText,
    color: "text-blue-400",
    lastUpdate: "Обновлено 15.04.2024",
    sections: 5,
  },
  {
    id: "agreement",
    title: "Пользовательское соглашение",
    icon: Handshake,
    color: "text-emerald-400",
    lastUpdate: "Обновлено 12.04.2024",
    sections: 8,
  },
  {
    id: "privacy",
    title: "Политика конфиденциальности",
    icon: ShieldAlert,
    color: "text-purple-400",
    lastUpdate: "Обновлено 10.04.2024",
    sections: 6,
  },
];

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    animate={{ opacity: 1 }}
    className="border-l-2 border-neutral-800 pl-6 relative group"
    initial={{ opacity: 0 }}
  >
    <div className="absolute left-0 top-0 w-1 h-full bg-neutral-800 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform" />
    <h3 className="text-2xl font-semibold mb-4 text-neutral-300">{title}</h3>
    {children}
  </motion.div>
);

const OfferContent = () => (
  <div className="space-y-8">
    {/* Заголовок */}
    <div className="border-l-4 border-blue-400 pl-4">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        Договор публичной оферты
      </h2>
      <p className="text-lg text-neutral-400 mt-2">
        Версия 3.2.1 от 15 апреля 2024 года
      </p>
    </div>

    {/* Основные положения */}
    <Section title="1. Основные положения">
      <p className="mb-4">
        Проект &#34;RISE OF THE BLACK SUN&#34; (далее - «Проект»), являющийся
        модификацией игры Minecraft, в лице администрации сервера (далее -
        «Администрация»), предлагает заключить договор на условиях публичной
        оферты о получении добровольных пожертвований.
      </p>

      <ul className="space-y-3 list-decimal pl-6 marker:text-blue-400">
        <li className="pl-2 hover:bg-neutral-900 rounded p-2 transition-colors">
          Пожертвование - добровольное безвозмездное внесение средств игроком в
          поддержку развития Проекта
        </li>
        <li className="pl-2 hover:bg-neutral-900 rounded p-2 transition-colors">
          Внесение средств не является обязательным условием для участия в
          игровом процессе
        </li>
        <li className="pl-2 hover:bg-neutral-900 rounded p-2 transition-colors">
          Получение виртуальных предметов/привилегий является благодарностью за
          поддержку, а не товаром/услугой
        </li>
      </ul>
    </Section>

    {/* Обязательства сторон */}
    <Section title="2. Обязательства сторон">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
          <h4 className="text-lg font-semibold mb-2 text-blue-400">
            Администрация обязуется:
          </h4>
          <ul className="list-disc pl-4 space-y-2 text-sm">
            <li>Обеспечивать стабильную работу игровой инфраструктуры</li>
            <li>
              Использовать пожертвования исключительно на развитие Проекта
            </li>
            <li>Предоставлять прозрачную отчетность о расходовании средств</li>
          </ul>
        </div>

        <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
          <h4 className="text-lg font-semibold mb-2 text-emerald-400">
            Участник обязуется:
          </h4>
          <ul className="list-disc pl-4 space-y-2 text-sm">
            <li>Соблюдать правила поведения на проекте</li>
            <li>Не рассматривать пожертвование как коммерческую сделку</li>
            <li>Обеспечивать легальность источников переводимых средств</li>
          </ul>
        </div>
      </div>
    </Section>

    {/* Порядок внесения пожертвований */}
    <Section title="3. Порядок внесения пожертвований">
      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 bg-neutral-900 rounded-lg">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-400/10 rounded-lg flex items-center justify-center">
            <span className="text-blue-400">1</span>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Выбор суммы</h4>
            <p className="text-sm text-neutral-400">
              Участник самостоятельно выбирает сумму пожертвования через
              интегрированную платежную систему
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-neutral-900 rounded-lg">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-400/10 rounded-lg flex items-center justify-center">
            <span className="text-blue-400">2</span>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Подтверждение</h4>
            <p className="text-sm text-neutral-400">
              Система генерирует уникальный код подтверждения операции
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-neutral-900 rounded-lg">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-400/10 rounded-lg flex items-center justify-center">
            <span className="text-blue-400">3</span>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Исполнение</h4>
            <p className="text-sm text-neutral-400">
              При успешном переводе средств на счет Проекта в течение 24 часов
              происходит начисление внутриигровых бонусов
            </p>
          </div>
        </div>
      </div>
    </Section>
  </div>
);
const AgreementContent = () => (
  <div className="space-y-8">
    <div className="border-l-4 border-emerald-400 pl-4">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
        Пользовательское соглашение
      </h2>
      <p className="text-lg text-neutral-400 mt-2">
        Ревизия 2.4.9 от 10 мая 2024 года
      </p>
    </div>

    <Section title="1. Принятие условий">
      <p className="mb-4">
        Регистрируясь на проекте &#34;RISE OF THE BLACK SUN&#34;, вы
        подтверждаете, что:
      </p>
      <ul className="space-y-3 list-decimal pl-6 marker:text-emerald-400">
        <li className="pl-2 hover:bg-neutral-900 rounded p-2 transition-colors">
          Достигли возраста цифрового согласия (13+ лет)
        </li>
        <li className="pl-2 hover:bg-neutral-900 rounded p-2 transition-colors">
          Не используете запрещенное программное обеспечение
        </li>
        <li className="pl-2 hover:bg-neutral-900 rounded p-2 transition-colors">
          Не будете распространять игровые ресурсы без согласия Администрации
        </li>
      </ul>
    </Section>

    <Section title="2. Правила поведения">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 bg-neutral-900 rounded-lg border border-emerald-400/20">
          <h4 className="text-lg font-semibold mb-2 text-emerald-400">
            Разрешено:
          </h4>
          <ul className="list-[✓] pl-6 space-y-2 text-sm">
            <li className="text-emerald-400">Создание игрового контента</li>
            <li className="text-emerald-400">
              Некоммерческая стриминговая деятельность
            </li>
          </ul>
        </div>

        <div className="p-4 bg-neutral-900 rounded-lg border border-red-400/20">
          <h4 className="text-lg font-semibold mb-2 text-red-400">
            Запрещено:
          </h4>
          <ul className="list-[✗] pl-6 space-y-2 text-sm">
            <li className="text-red-400">Использование эксплоитов/читинг</li>
            <li className="text-red-400">Коммерческая перепродажа аккаунтов</li>
            <li className="text-red-400">Деанонимизация участников</li>
          </ul>
        </div>
      </div>
    </Section>

    <Section title="3. Интеллектуальная собственность">
      <div className="space-y-4">
        <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
          <h4 className="font-semibold mb-2 text-cyan-400">
            §3.1 Права на контент
          </h4>
          <p className="text-sm text-neutral-400">
            Все оригинальные текстуры, модели, сюжетные линии и программный код
            являются собственностью проекта &#34;RISE OF THE BLACK SUN&#34;.
            Модификации должны содержать явную ссылку на оригинальный проект.
          </p>
        </div>

        <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
          <h4 className="font-semibold mb-2 text-cyan-400">§3.2 Лицензия</h4>
          <p className="text-sm text-neutral-400">
            Игрокам предоставляется неисключительная лицензия на использование
            контента исключительно в рамках игрового процесса на официальных
            серверах.
          </p>
        </div>
      </div>
    </Section>
  </div>
);
const PrivacyContent = () => (
  <div className="space-y-8">
    <div className="border-l-4 border-purple-400 pl-4">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Политика конфиденциальности
      </h2>
      <p className="text-lg text-neutral-400 mt-2">
        Редакция 5.1.3 от 1 июня 2024 года
      </p>
    </div>

    <Section title="1. Собираемые данные">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="text-left py-3 px-4">Категория</th>
              <th className="text-left py-3 px-4">Примеры</th>
              <th className="text-left py-3 px-4">Цель сбора</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-800 hover:bg-neutral-900">
              <td className="py-3 px-4">Идентификационные</td>
              <td className="py-3 px-4">UUID, IP-адрес</td>
              <td className="py-3 px-4">Авторизация, безопасность</td>
            </tr>
            <tr className="border-b border-neutral-800 hover:bg-neutral-900">
              <td className="py-3 px-4">Поведенческие</td>
              <td className="py-3 px-4">Логи действий, чаты</td>
              <td className="py-3 px-4">Аналитика, модерация</td>
            </tr>
            <tr className="hover:bg-neutral-900">
              <td className="py-3 px-4">Финансовые</td>
              <td className="py-3 px-4">Хэши транзакций</td>
              <td className="py-3 px-4">Отчетность</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section title="2. Защита данных">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 bg-neutral-900 rounded-lg border border-purple-400/20">
          <h4 className="font-semibold mb-2 text-purple-400">Шифрование</h4>
          <p className="text-sm text-neutral-400">
            Все передаваемые данные защищены протоколом TLS 1.3+
          </p>
        </div>
        <div className="p-4 bg-neutral-900 rounded-lg border border-purple-400/20">
          <h4 className="font-semibold mb-2 text-purple-400">Хранение</h4>
          <p className="text-sm text-neutral-400">
            Данные хранятся в ЕС на серверах с ISO 27001 сертификацией
          </p>
        </div>
        <div className="p-4 bg-neutral-900 rounded-lg border border-purple-400/20">
          <h4 className="font-semibold mb-2 text-purple-400">Доступ</h4>
          <p className="text-sm text-neutral-400">
            Двухфакторная аутентификация для сотрудников
          </p>
        </div>
      </div>
    </Section>

    <Section title="3. Ваши права">
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-neutral-900 rounded-lg">
          <div className="flex-shrink-0 w-8 h-8 bg-purple-400/10 rounded-full flex items-center justify-center">
            <FileText className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h4 className="font-semibold">Запрос данных</h4>
            <p className="text-sm text-neutral-400">
              Вы можете запросить полный архив ваших данных через поддержку
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-neutral-900 rounded-lg">
          <div className="flex-shrink-0 w-8 h-8 bg-purple-400/10 rounded-full flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h4 className="font-semibold">Удаление аккаунта</h4>
            <p className="text-sm text-neutral-400">
              Анонимизация данных в течение 30 дней после запроса
            </p>
          </div>
        </div>
      </div>
    </Section>
  </div>
);

const DocumentContent = ({ id }: { id: string }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = useCallback(async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, -heightLeft, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${id}-document.pdf`);
  }, [id]);

  const handlePrint = () => {
    if (contentRef.current) {
      const printWindow = window.open("", "_blank");

      printWindow?.document.write(contentRef.current.innerHTML);
      printWindow?.document.close();
      printWindow?.focus();
      printWindow?.print();
    }
  };

  return (
    <motion.div
      key={id}
      ref={contentRef}
      animate={{ opacity: 1, x: 0 }}
      className="p-8 bg-black/50 backdrop-blur-xl rounded-2xl border border-neutral-800 shadow-2xl"
      exit={{ opacity: 0, x: -50 }}
      initial={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      {id === "offer" && <OfferContent />}
      {id === "agreement" && <AgreementContent />}
      {id === "privacy" && <PrivacyContent />}

      <div className="mt-12 p-6 bg-neutral-900 rounded-xl border border-neutral-800 space-y-4">
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
            onClick={handleDownloadPDF}
          >
            <Download size={18} />
            Скачать PDF
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
            onClick={handlePrint}
          >
            <PrinterIcon size={18} />
            Печать
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function DocumentsPage() {
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [previewDoc] = useState<string | null>(null);
  const containerRef = useRef(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 to-black">
      <nav className="sticky top-0 z-50 border-b border-neutral-800 bg-black/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-blue-400/10 rounded-lg flex items-center justify-center group-hover:bg-blue-400/20 transition-colors">
              <FileText className="text-blue-400" />
            </div>
            <span className="text-xl font-semibold">Юридический портал</span>
          </div>

          <motion.div
            animate={{ opacity: 1 }}
            className="flex items-center gap-6"
            initial={{ opacity: 0 }}
          >
            <button className="flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors">
              <Download size={18} />
              Экспорт документов
            </button>
          </motion.div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-12 gap-8">
        <aside className="col-span-3 space-y-6 sticky top-24 h-[calc(100vh-200px)]">
          <div className="border border-neutral-800 rounded-xl p-4 bg-black/30 backdrop-blur-lg">
            <h3 className="text-sm font-semibold text-neutral-400 mb-4">
              Документация
            </h3>
            <div className="space-y-2">
              {documents.map((doc) => (
                <button
                  key={doc.id}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-lg",
                    "transition-colors hover:bg-neutral-900",
                    selectedDocId === doc.id ? "bg-neutral-900" : "",
                  )}
                  onClick={() => setSelectedDocId(doc.id)}
                >
                  <div className="flex items-center gap-3">
                    <doc.icon className={cn("w-5 h-5", doc.color)} />
                    <span>{doc.title}</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-neutral-500" />
                </button>
              ))}
            </div>
          </div>

          <motion.div
            animate={{ opacity: previewDoc ? 1 : 0 }}
            className="absolute left-full ml-4 w-72 bg-black/90 backdrop-blur-lg rounded-xl p-4 border border-neutral-800 shadow-xl"
            style={{ pointerEvents: previewDoc ? "auto" : "none" }}
          >
            {previewDoc && (
              <>
                <h4 className="text-sm font-semibold mb-2">
                  {documents.find((d) => d.id === previewDoc)?.title}
                </h4>
                <p className="text-xs text-neutral-400">
                  Последнее обновление:{" "}
                  {documents.find((d) => d.id === previewDoc)?.lastUpdate}
                </p>
                <div className="mt-4 pt-4 border-t border-neutral-800">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-neutral-400">Секций:</span>
                    <span className="text-blue-400">
                      {documents.find((d) => d.id === previewDoc)?.sections}
                    </span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </aside>

        <main ref={containerRef} className="col-span-9">
          <AnimatePresence mode="wait">
            {selectedDocId ? (
              <DocumentContent key={selectedDocId} id={selectedDocId} />
            ) : (
              <motion.div
                animate={{ opacity: 1 }}
                className="p-8 bg-black/50 backdrop-blur-xl rounded-2xl border border-neutral-800 shadow-2xl text-center text-neutral-500"
                initial={{ opacity: 0 }}
              >
                Выберите документ для просмотра
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,transparent_70%)]" />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0, 0.5, 0],
              transition: {
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 3,
              },
            }}
            className="absolute w-0.5 h-0.5 bg-blue-400/20 rounded-full"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
