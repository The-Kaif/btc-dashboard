# 🚀 CryptoFlow — Real-Time BTC/USDT Dashboard

A modern, real-time Bitcoin (BTC/USDT) dashboard built using Next.js and the Bybit WebSocket API.  
Designed with a professional trading UI, live market updates, and light/dark theme support.

---

## ✨ Features

- 🔴 **Real-time data (WebSocket)**  
  - Live BTC price updates via Bybit API  
  - Auto-reconnect on connection drop  

- 📊 **Market Stats**  
  - Last traded price  
  - Mark price  
  - 24h High / Low  
  - 24h Volume  
  - 24h % Change  

- 📈 **TradingView Chart**  
  - Advanced BTC/USDT chart  
  - Syncs with light/dark mode  

- 🌗 **Light / Dark Mode**  
  - Fully theme-aware UI  
  - Consistent across all components  

- 📉 **Sparkline (Last 60 ticks)**  
  - Live price trend visualization  

- 🟢🔴 **Price Highlighting**  
  - Dynamic color + arrow based on price movement  

- 📱 **Responsive Design**  
  - Works across desktop and mobile devices  

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS  
- **Charts:** TradingView Widget, Recharts  
- **Data Source:** Bybit WebSocket API  

---

## 🔌 WebSocket Endpoint

wss://stream.bybit.com/v5/public/linear  

**Subscribed topic:** tickers.BTCUSDT  

---

## 🚀 Getting Started

### 1. Install dependencies  
npm install  

### 2. Run development server  
npm run dev  

### 3. Open in browser  
http://localhost:3000  

---

## 📂 Project Structure

app/  
 ├── components/  
 │   ├── Navbar.tsx  
 │   ├── HeroPrice.tsx  
 │   ├── StatCardPro.tsx  
 │   ├── Chart.tsx  
 │   ├── Sparkline.tsx  
 │  
 ├── hooks/  
 │   └── useWebSocket.ts  
 │  
 ├── utils/  
 │   └── format.ts  
 │  
 └── page.tsx  

---

## 🎯 Key Highlights

- Real-time WebSocket data handling  
- Auto reconnect mechanism  
- Clean and scalable component architecture  
- Professional trading dashboard UI  
- Fully responsive + theme support  

---

## 📦 Deployment

npm run build  
npm start  

Or deploy easily using Vercel.

---

## 🙌 Acknowledgements

- Bybit API  
- TradingView Widgets  
- Next.js  

---

## 📌 Author

**Mohd Kaif**  
Frontend Developer (React / Next.js)  
