"use client";

type Props = {
  title: string;
  value: string;
  color?: "green" | "red" | "blue" | "orange";
  isDark: boolean;
};

export default function StatCardPro({ title, value, color, isDark }: Props) {
  // Border accent color mapping
  const colorMap = {
    green: "border-green-500",
    red: "border-red-500",
    blue: "border-blue-500",
    orange: "border-[#f7931a]",
  };

  return (
    // Individual stat card
    <div
      className={`p-3 sm:p-4 rounded-xl border transition-all ${
        colorMap[color || "blue"]
      } ${isDark ? "bg-[#161a23]" : "bg-white"}`}
    >
      {/*  Title */}
      <p
        className={`text-[10px] sm:text-xs ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {title}
      </p>

      {/* Value */}
      <h2 className="text-sm sm:text-lg font-bold mt-1 break-words">{value}</h2>
    </div>
  );
}
