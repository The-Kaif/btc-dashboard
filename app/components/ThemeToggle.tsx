"use client";

type Props = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

const ThemeToggle = ({ theme, setTheme }: Props) => {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;