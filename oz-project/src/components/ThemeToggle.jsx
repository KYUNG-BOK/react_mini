import { useTheme } from "../context/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";

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
