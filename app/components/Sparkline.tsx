"use client";

import { ResponsiveContainer, AreaChart, Area, YAxis } from "recharts";

// Props
type Props = {
  data: number[];
};

const Sparkline = ({ data }: Props) => {
  //  Don't render if not enough data points
  if (!data || data.length < 2) return null;

  //  Convert raw array into chart-friendly format
  const chartData = data.map((value, index) => ({
    value,
    index,
  }));

  //  Determine trend direction (used for color)
  const isUp = data[data.length - 1] > data[0];

  return (
    //  Chart container (fixed height, full width)
    <div className="w-full h-28">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          {/*  Gradient fill based on price trend */}
          <defs>
            <linearGradient id="color">
              <stop
                offset="0%"
                stopColor={isUp ? "#22c55e" : "#ef4444"}
                stopOpacity={0.4}
              />
              <stop
                offset="100%"
                stopColor={isUp ? "#22c55e" : "#ef4444"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          {/* Hidden Y-axis with dynamic scaling */}
          <YAxis
            strokeWidth={2.5}
            domain={["dataMin - 5", "dataMax + 5"]}
            hide
          />

          {/*  Area chart line */}
          <Area
            type="monotone" // smooth curve
            dataKey="value"
            stroke={isUp ? "#22c55e" : "#ef4444"} // line color
            strokeWidth={2}
            fill="url(#color)" // gradient fill
            dot={false} // hide points
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Sparkline;
