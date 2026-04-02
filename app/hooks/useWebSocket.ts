"use client";

import { useEffect, useRef, useState } from "react";

// Types
type TickerData = {
  lastPrice?: string;
  markPrice?: string;
  highPrice24h?: string;
  lowPrice24h?: string;
  turnover24h?: string;
  price24hPcnt?: string;
};

export const useWebSocket = () => {
  // Live ticker data
  const [data, setData] = useState<TickerData>({});

  // Connection status for UI feedback
  const [status, setStatus] = useState<
    "connected" | "disconnected" | "connecting"
  >("connecting");

  // Last 60 price points for sparkline
  const [history, setHistory] = useState<number[]>([]);

  // Persist WebSocket instance across renders
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let reconnectTimer: NodeJS.Timeout;

    // Establish WebSocket connection
    const connect = () => {
      setStatus("connecting");

      const ws = new WebSocket("wss://stream.bybit.com/v5/public/linear");
      wsRef.current = ws;

      // On connection open → subscribe to BTCUSDT ticker
      ws.onopen = () => {
        console.log("WS Connected");
        setStatus("connected");

        // slight delay to ensure connection stability
        setTimeout(() => {
          ws.send(
            JSON.stringify({
              op: "subscribe",
              args: ["tickers.BTCUSDT"],
            }),
          );

          console.log("Subscribed to BTCUSDT");
        }, 500);
      };

      // Handle incoming messages
      ws.onmessage = (event: MessageEvent) => {
        try {
          const parsed = JSON.parse(event.data);

          // ignore unrelated topics
          if (parsed.topic !== "tickers.BTCUSDT") return;

          const ticker = parsed.data;
          if (!ticker) return;

          // Merge partial updates (Bybit sends delta updates)
          setData((prev) => ({
            ...prev,

            // fallback mapping (important for different payload shapes)
            lastPrice: ticker.lastPrice || ticker.lp || prev.lastPrice,
            markPrice: ticker.markPrice || prev.markPrice,
            highPrice24h: ticker.highPrice24h || ticker.hp || prev.highPrice24h,
            lowPrice24h: ticker.lowPrice24h || ticker.lp || prev.lowPrice24h,
            turnover24h:
              ticker.turnover24h || ticker.volume || prev.turnover24h,
            price24hPcnt:
              ticker.price24hPcnt || ticker.chp || prev.price24hPcnt,
          }));

          // Extract price for sparkline
          const price = Number(
            ticker.lastPrice || ticker.lp || ticker.markPrice,
          );

          // Maintain rolling history (last 60 ticks)
          if (price) {
            setHistory((prev) => {
              const updated = [...prev, price];
              return updated.slice(-60);
            });
          }
        } catch (err) {
          console.error("WS Error:", err);
        }
      };

      // Handle errors → close socket
      ws.onerror = (err) => {
        console.error("WS Error:", err);
        ws.close();
      };

      // Auto-reconnect on disconnect
      ws.onclose = () => {
        console.log("WS Disconnected");
        setStatus("disconnected");

        reconnectTimer = setTimeout(connect, 3000);
      };
    };

    // Initial connection
    connect();

    // Cleanup on unmount
    return () => {
      wsRef.current?.close();
      clearTimeout(reconnectTimer);
    };
  }, []);

  return { data, status, history };
};