import { useTheme } from "../context/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";   // 리액트 아이콘 라이브러리 사용

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded transition-colors duration-300 ${
        theme === "light"
          ? "bg-gray-200 text-black"
          : "bg-gray-700 text-white"
      }`}
    >
        {theme === "dark" ? <FiSun size={24} /> : <FiMoon size={24} />}
    </button>
  );
}
