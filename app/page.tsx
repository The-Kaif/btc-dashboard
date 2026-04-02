"use client";

import { useEffect, useState } from "react";
import { useWebSocket } from "./hooks/useWebSocket";
import Chart from "./components/Chart";
import Sparkline from "./components/Sparkline";
import Navbar from "./components/Navbar";
import HeroPrice from "./components/HeroPrice";
import StatCardPro from "./components/StatCardPro";
import { formatNumber } from "./utils/format";

export default function Home() {
  // WebSocket hook state
  const { data, status, history } = useWebSocket();

  //  Theme state
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Helper boolean for cleaner conditional classes
  const isDark = theme === "dark";

  const [prevPrice, setPrevPrice] = useState<number | null>(null);

  const currentPrice = Number(data.lastPrice || data.markPrice || 0);

  // compare price
  const isUp = prevPrice !== null ? currentPrice > prevPrice : undefined;

  // update previous price AFTER render
  useEffect(() => {
    if (currentPrice) {
      const timer = setTimeout(() => {
        setPrevPrice(currentPrice);
      }, 200); // delay for animation

      return () => clearTimeout(timer);
    }
  }, [currentPrice]);

  return (
    //  Root container with dynamic theme styles
    <div
      className={`min-h-screen transition-all ${
        isDark ? "bg-[#0f1117] text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/*  Centered layout container */}
      <div className="max-w-[1400px] mx-auto">
        <div
          className={`min-h-screen mb-5 ${
            isDark ? "bg-[#0f1117]" : "bg-gray-100"
          }`}
        >
          {/* Navbar */}
          <Navbar
            theme={theme}
            setTheme={setTheme}
            status={status}
            isDark={isDark}
          />

          {/* Hero section */}
          <HeroPrice
            price={currentPrice}
            change={Number(data.price24hPcnt || 0) * 100}
            isDark={isDark}
            isUp={isUp}
          />

          {/* Stats cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 px-4 sm:px-6">
            <StatCardPro
              title="Mark Price"
              value={formatNumber(data.markPrice) || "-"}
              color="blue"
              isDark={isDark}
            />

            <StatCardPro
              title="24h High"
              value={formatNumber(data.highPrice24h) || "-"}
              color="green"
              isDark={isDark}
            />

            <StatCardPro
              title="24h Low"
              value={formatNumber(data.lowPrice24h) || "-"}
              color="red"
              isDark={isDark}
            />

            <StatCardPro
              title="Volume"
              value={formatNumber(data.turnover24h) || "-"}
              color="orange"
              isDark={isDark}
            />

            <StatCardPro
              title="24h Change"
              value={
                data.price24hPcnt
                  ? (Number(data.price24hPcnt) * 100).toFixed(2) + "%"
                  : "-"
              }
              color="green"
              isDark={isDark}
            />
          </div>

          {/* TradingView Chart */}
          <div className="px-6 mt-6">
            <div
              className={`p-4 rounded-xl border ${
                isDark ? "bg-[#161a23]" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm text-gray-400">BTC/USDT</h2>
              </div>

              {/* External TradingView widget */}
              <Chart theme={theme} />
            </div>
          </div>

          {/* Sparkline (last 60 ticks price trend) */}
          <div className="px-6 mt-6">
            <div
              className={`p-4 rounded-xl border ${
                isDark ? "bg-[#161a23]" : "bg-white"
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm text-gray-400">
                  BTC Price Trend · Last 60 Seconds
                </h2>
              </div>

              {/* Mini chart */}
              <div
                className={`p-4 rounded-xl ${
                  isDark ? "bg-[#161a23]" : "bg-white"
                }`}
              >
                <Sparkline data={history} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
