import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Apply theme to <html> tag
    document.documentElement.setAttribute("data-theme", theme);
    // Store in localStorage for persistence
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="ml-4 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md transition duration-200"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
