export const useSession = () => {
  const hasSession = !!localStorage.getItem("sessionToken"); // Пример проверки

  return { hasSession };
};
