"use client";

import React, { useCallback, useState, useEffect, useRef, FormEvent } from "react";
import { loadFull } from "tsparticles";
import type { Engine } from "@tsparticles/engine";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiCpu, FiX } from "react-icons/fi";

// Компонент для отображения "пилюльки" (например, технология, навык)
const SkillPill = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        className="px-5 py-2 bg-black bg-opacity-30 rounded-full border border-purple-700/50 text-sm flex items-center gap-2 drop-shadow-md"
    >
        <FiStar className="text-purple-400" />
        <span>{children}</span>
    </motion.div>
);

interface SectionProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    icon: React.ReactNode;
    headerImage?: string;
    bgGradient?: string;
    extraContent?: React.ReactNode;
}

const Section = ({
                     title,
                     subtitle,
                     children,
                     icon,
                     headerImage,
                     bgGradient = "bg-gradient-to-r from-purple-900 to-purple-700",
                     extraContent,
                 }: SectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [showMore, setShowMore] = useState(false);

    return (
        <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-8 bg-black bg-opacity-80 backdrop-blur-lg rounded-3xl border border-purple-700/50 mt-10 shadow-2xl overflow-hidden"
        >
            {headerImage && (
                <div className="mb-4">
                    <img
                        src={headerImage}
                        alt={`${title} header`}
                        className="w-full h-48 object-cover rounded-t-3xl"
                    />
                </div>
            )}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                <div className="p-4 bg-gray-800/50 rounded-full text-4xl">{icon}</div>
                <div>
                    <h3 className="text-3xl font-extrabold text-white drop-shadow-lg">
                        {title}
                    </h3>
                    {subtitle && <p className="mt-1 text-lg text-gray-300">{subtitle}</p>}
                </div>
            </div>
            <div>{children}</div>
            {extraContent && (
                <>
                    <motion.button
                        onClick={() => setShowMore(!showMore)}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 inline-flex items-center text-purple-300 font-semibold"
                    >
                        {showMore ? "Свернуть" : "Читать подробнее"}
                    </motion.button>
                    <AnimatePresence>
                        {showMore && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 text-gray-200"
                            >
                                {extraContent}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </motion.div>
    );
};

export interface Vacancy {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    headerImage: string;
    bgGradient: string;
    requirements: string[];
    techStack: string[];
    createdAt: string;
    updatedAt: string;
}

const VacancyCard = ({ vacancy }: { vacancy: Vacancy }) => {
    return (
        <Section
            title={vacancy.title}
            subtitle={vacancy.subtitle}
            icon={<FiCpu />}
            headerImage={
                vacancy.headerImage ||
                "https://via.placeholder.com/800x200.png?text=Vacancy+Header"
            }
            bgGradient={vacancy.bgGradient || "bg-gradient-to-r from-purple-900 to-purple-700"}
            extraContent={
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-xl font-bold text-purple-300 mb-2">Описание</h4>
                        <p className="text-gray-300">{vacancy.description}</p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-purple-300 mb-2">Требования</h4>
                        <ul className="list-disc ml-6 text-gray-300">
                            {vacancy.requirements.map((req, idx) => (
                                <li key={idx}>{req}</li>
                            ))}
                        </ul>
                        <h4 className="text-xl font-bold text-purple-300 mt-4 mb-2">Технологии</h4>
                        <div className="flex flex-wrap gap-2">
                            {vacancy.techStack.map((tech, idx) => (
                                <SkillPill key={idx}>{tech}</SkillPill>
                            ))}
                        </div>
                    </div>
                </div>
            }
        >
            <p className="text-gray-300">
                Нажмите "Читать подробнее" для просмотра полного описания вакансии.
            </p>
        </Section>
    );
};

interface ApplicationFormData {
    vacancyId: string;
    name: string;
    primaryContact: string;
    additionalContacts: string[]; // теперь ссылки
    about: string;
    salaryExpectation: string;
    availableFrom: string;
}

const ApplicationModal = ({
                              vacancies,
                              onClose,
                          }: {
    vacancies: Vacancy[];
    onClose: () => void;
}) => {
    const [formData, setFormData] = useState<ApplicationFormData>({
        vacancyId: vacancies.length > 0 ? String(vacancies[0].id) : "",
        name: "",
        primaryContact: "",
        additionalContacts: [],
        about: "",
        salaryExpectation: "",
        availableFrom: "",
    });
    const [newContactType, setNewContactType] = useState<string>("tg");
    const [newContactValue, setNewContactValue] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Функция для формирования ссылки по типу контакта и введённому значению
    const getContactLink = (type: string, value: string) => {
        const trimmed = value.trim();
        switch (type) {
            case "tg":
                return `https://t.me/${trimmed}`;
            case "discord":
                return `https://discord.com/users/${trimmed}`;
            case "vk":
                return `https://vk.com/${trimmed}`;
            case "element":
                return `https://app.element.io/#/user/${trimmed}`;
            case "свое":
                return trimmed;
            default:
                return trimmed;
        }
    };

    const addAdditionalContact = () => {
        if (newContactValue.trim() !== "") {
            const link = getContactLink(newContactType, newContactValue);
            setFormData((prev) => ({
                ...prev,
                additionalContacts: [...prev.additionalContacts, link],
            }));
            setNewContactValue("");
        }
    };

    const removeAdditionalContact = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            additionalContacts: prev.additionalContacts.filter((_, idx) => idx !== index),
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        // Простая валидация обязательных полей
        if (
            !formData.vacancyId ||
            !formData.name.trim() ||
            !formData.primaryContact.trim() ||
            !formData.about.trim() ||
            !formData.availableFrom
        ) {
            setErrorMsg("Пожалуйста, заполните все обязательные поля.");
            return;
        }

        setSubmitting(true);
        setSuccessMsg("");
        try {
            const res = await fetch("https://vacansiesservice.riseoftheblacksun.eu/api/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    vacancyId: parseInt(formData.vacancyId, 10),
                }),
            });
            if (res.ok) {
                setSuccessMsg("Ваша заявка успешно отправлена!");
            } else {
                setErrorMsg("Ошибка при отправке заявки.");
            }
        } catch (err) {
            console.error("Ошибка отправки заявки:", err);
            setErrorMsg("Ошибка при отправке заявки.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-gray-900 text-white p-8 rounded-2xl w-full max-w-lg relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl hover:text-gray-400"
                >
                    <FiX />
                </button>
                <h2 className="text-2xl font-bold mb-4">Откликнуться на вакансию</h2>
                {errorMsg && <p className="mb-2 text-red-400 text-center">{errorMsg}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Вакансия</label>
                        <select
                            name="vacancyId"
                            value={formData.vacancyId}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        >
                            {vacancies.map((vac) => (
                                <option key={vac.id} value={vac.id}>
                                    {vac.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Ваше имя*</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Email*</label>
                        <input
                            type="email"
                            name="primaryContact"
                            value={formData.primaryContact}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Дополнительные контакты</label>
                        <div className="flex gap-2 mb-2">
                            <select
                                value={newContactType}
                                onChange={(e) => setNewContactType(e.target.value)}
                                className="p-2 rounded bg-gray-800 border border-gray-700"
                            >
                                <option value="tg">tg</option>
                                <option value="discord">discord</option>
                                <option value="vk">vk</option>
                                <option value="element">element</option>
                                <option value="свое">свое</option>
                            </select>
                            <input
                                type="text"
                                value={newContactValue}
                                onChange={(e) => setNewContactValue(e.target.value)}
                                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                                placeholder="Введите контакт (логин или URL)"
                            />
                            <button
                                type="button"
                                onClick={addAdditionalContact}
                                className="px-3 py-2 bg-green-600 rounded"
                            >
                                Добавить
                            </button>
                        </div>
                        {formData.additionalContacts.length > 0 && (
                            <ul className="list-disc ml-6 text-gray-300">
                                {formData.additionalContacts.map((contact, idx) => (
                                    <li key={idx}>
                                        <a href={contact} target="_blank" rel="noreferrer" className="underline">
                                            {contact}
                                        </a>{" "}
                                        <button
                                            type="button"
                                            onClick={() => removeAdditionalContact(idx)}
                                            className="text-red-400 ml-2"
                                        >
                                            X
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1">О себе*</label>
                        <textarea
                            name="about"
                            value={formData.about}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                            rows={3}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Ожидаемая зарплата</label>
                        <input
                            type="text"
                            name="salaryExpectation"
                            value={formData.salaryExpectation}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Доступен с*</label>
                        <input
                            type="date"
                            name="availableFrom"
                            value={formData.availableFrom}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl font-bold text-2xl mt-4"
                    >
                        {submitting ? "Отправка..." : "Отправить заявку"}
                    </button>
                    {successMsg && <p className="mt-2 text-center text-green-400">{successMsg}</p>}
                </form>
            </motion.div>
        </div>
    );
};

const JobPage = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch("https://vacansiesservice.riseoftheblacksun.eu/api/vacancies", { mode: "cors" })
            .then((res) => res.json())
            .then((data) => {
                if (data?.vacancies) {
                    const parsedVacancies = data.vacancies.map((vac: any) => ({
                        ...vac,
                        requirements:
                            typeof vac.requirements === "string" ? JSON.parse(vac.requirements) : vac.requirements,
                        techStack:
                            typeof vac.techStack === "string" ? JSON.parse(vac.techStack) : vac.techStack,
                    }));
                    setVacancies(parsedVacancies);
                }
            })
            .catch((err) => console.error("Ошибка получения вакансий:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-black">
            <div className="relative z-20 max-w-7xl mx-auto px-6 py-24">
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center mb-16"
                >
                    <motion.img
                        src="/logo_tab.png"
                        alt="Логотип"
                        className="w-auto max-w-full drop-shadow-2xl"
                    />
                </motion.div>
                {loading ? (
                    <p className="text-center text-gray-300">Загрузка вакансий...</p>
                ) : vacancies.length === 0 ? (
                    <div className="text-center p-12 bg-gray-800 bg-opacity-70 rounded-3xl border border-purple-700/50 shadow-2xl">
                        <h2 className="text-3xl font-bold text-purple-300 mb-4">
                            Пока персонал не нужен!
                        </h2>
                        <p className="text-gray-300">
                            Следите за обновлениями – возможно, в ближайшее время у нас откроются новые возможности.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {vacancies.map((vacancy) => (
                            <VacancyCard key={vacancy.id} vacancy={vacancy} />
                        ))}
                    </div>
                )}
                {vacancies.length > 0 && (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="mt-16 p-8 bg-black bg-opacity-50 backdrop-blur-lg rounded-2xl border border-purple-700/50 shadow-xl text-center"
                    >
                        <button
                            onClick={() => setShowModal(true)}
                            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl font-extrabold text-2xl flex items-center justify-center gap-4 drop-shadow-lg"
                        >
                            Откликнуться на вакансию 🚀
                        </button>
                    </motion.div>
                )}
            </div>
            <AnimatePresence>
                {showModal && (
                    <ApplicationModal
                        vacancies={vacancies}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default JobPage;
