"use client";

import { useEffect, useRef } from "react";

// Props for Chart component
type Props = {
  theme: "light" | "dark";
};

// Extend window object to include TradingView
declare global {
  interface Window {
    TradingView: any;
  }
}

const Chart = ({ theme }: Props) => {
  //  Reference to chart container div
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    //  Exit if container is not available
    if (!containerRef.current) return;

    //  Clear previous chart before re-render (important on theme change)
    containerRef.current.innerHTML = "";

    //  Create TradingView script dynamically
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    // Once script loads → initialize widget
    script.onload = () => {
      //  Safety check
      if (!window.TradingView) return;

      // Create TradingView chart widget
      new window.TradingView.widget({
        container_id: containerRef.current?.id, // target container
        symbol: "BYBIT:BTCUSDT", // BTC/USDT pair
        interval: "1", // timeframe (1 minute)
        theme, // dynamic theme (light/dark)
        style: "1", // chart style
        width: "100%", // full width
        height: 500, // fixed height
      });
    };

    // Append script to container
    containerRef.current.appendChild(script);
  }, [theme]); // Re-run when theme changes

  //  Chart container
  return <div id="tradingview_chart" ref={containerRef} />;
};

export default Chart;