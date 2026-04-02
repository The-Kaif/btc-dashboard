"use client";

type Props = {
  price: number;
  change: number;
  isDark: boolean;
  isUp?: boolean;
};

export default function HeroPrice({ price, change, isDark, isUp }: Props) {
  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6">
      {/*  Label */}
      <p className="text-xs sm:text-sm text-gray-400 mb-2">
        BTC / USDT · LAST TRADE
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        {/* PRICE + ARROW */}
        <div className="flex items-center gap-3">
          {/* Arrow */}
          {isUp !== undefined && (
            <span
              className={`text-xl sm:text-2xl ${
                isUp ? "text-green-400" : "text-red-400"
              }`}
            >
              {isUp ? "▲" : "▼"}
            </span>
          )}

          {/* Price */}
          {!isNaN(price) ? (
            <h1
              className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight transition-all duration-300 ${
                isUp === undefined
                  ? "text-[#f7931a]"
                  : isUp
                    ? "text-green-400 "
                    : "text-red-400 "
              }`}
            >
              ${price.toLocaleString()}
            </h1>
          ) : (
            <h1
              className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight transition-all duration-300 ${
                isUp === undefined
                  ? "text-[#f7931a]"
                  : isUp
                    ? "text-green-400 "
                    : "text-red-400 "
              }`}
            >
              ...
            </h1>
          )}
        </div>

        {/* CHANGE BADGE */}
        <div
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border text-center ${
            change >= 0
              ? isDark
                ? "bg-green-900/40 text-green-400 border-green-500/20"
                : "bg-green-100 text-green-600 border-green-200"
              : isDark
                ? "bg-red-900/40 text-red-400 border-red-500/20"
                : "bg-red-100 text-red-600 border-red-200"
          }`}
        >
          <div className="font-medium">
            {change >= 0 ? "+" : ""}
            {change.toFixed(2)}%
          </div>
          <div
            className={`text-[10px] sm:text-xs ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            24h Change
          </div>
        </div>

        {/* PAIR BADGE */}
        <div
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm text-center ${
            isDark
              ? "bg-[#161a23] text-gray-400"
              : "bg-white text-gray-600 border border-gray-200"
          }`}
        >
          BTC/USDT
        </div>
      </div>
    </div>
  );
}
