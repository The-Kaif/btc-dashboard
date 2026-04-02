"use client";

type Props = {
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  status: string;
  isDark: boolean;
};

export default function Navbar({ theme, setTheme, status, isDark }: Props) {
  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b ${
        isDark ? "border-white/5 bg-[#0f1117]" : "border-gray-200 bg-white"
      }`}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#f7931a] rounded-xl flex items-center justify-center text-black font-bold">
          ₿
        </div>

        {/* Hide subtitle on small screens */}
        <div>
          <h1 className="text-sm sm:text-base font-semibold">
            CryptoFlow
          </h1>
          <p className="hidden sm:block text-xs text-gray-500">
            Live Market Data
          </p>
        </div>
      </div>

      {/*  Right side */}
      <div className="flex items-center gap-2 sm:gap-6">

        {/*  Status */}
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
          <span
            className={`w-2 h-2 rounded-full ${
              status === "connected"
                ? "bg-green-400"
                : status === "connecting"
                ? "bg-yellow-400"
                : "bg-red-400"
            }`}
          ></span>

          {/* Hide text on very small screens */}
          <span
            className={`hidden sm:block font-medium ${
              status === "connected"
                ? "text-green-400"
                : status === "connecting"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {status === "connected"
              ? "Connected"
              : status === "connecting"
              ? "Connecting..."
              : "Disconnected"}{" "}
          </span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border transition cursor-pointer ${
            isDark
              ? "bg-[#161a23] text-gray-400"
              : "bg-white text-gray-600"
          }`}
        >
          {/* Short label on mobile */}
          <span className="sm:hidden">
            {theme === "dark" ? "🌙" : "☀️"}
          </span>

          {/* Full label on desktop */}
          <span className="hidden sm:inline">
            {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </span>
        </button>
      </div>
    </div>
  );
}