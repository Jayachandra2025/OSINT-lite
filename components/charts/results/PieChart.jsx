import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const mockData = [
  {
    label: "Bureau van Dijk",
    value: 150,
    percentage: 25,
    fill: "#4285f4",
    opacity: 1,
  },
  {
    label: "DemandScience by Pure Incubation",
    value: 120,
    percentage: 20,
    fill: "#5a78f0",
    opacity: 1,
  },
  {
    label: "AntiPublic",
    value: 90,
    percentage: 15,
    fill: "#7e57c2",
    opacity: 1,
  },
  {
    label: "Collections",
    value: 60,
    percentage: 10,
    fill: "#d81b60",
    opacity: 1,
  },
  {
    label: "Apollo",
    value: 90,
    percentage: 15,
    fill: "#e91e63",
    opacity: 1,
  },
  {
    label: "Other",
    value: 90,
    percentage: 15,
    fill: "#f06292",
    opacity: 1,
  },
];

const colorArr = [
  "#FF6F61",
  "#FFB347",
  "#FFD700",
  "#66CDAA",
  "#4682B4",
  "#8A2BE2",
  "#FF69B4",
  "#32CD32",
  "#FFA07A",
  "#FF8C00",
  "#1E90FF",
  "#FFD700",
  "#20B2AA",
  "#FF1493",
  "#9370DB",
  "#4682B4",
  "#FFA500",
  "#3CB371",
  "#FFD700",
  "#CD5C5C",
];

const chartConfig = {
  value: {
    label: "Percentage",
    color: "#ffffff",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

const CustomTooltip = ({ active, payload, label, color }) => {
  if (active && payload && payload.length) {
    // console.log(payload[0]);
    return (
      <div className="custom-tooltip bg-white p-2 shadow-md flex flex-row items-center">
        <span
          style={{ backgroundColor: `${payload[0].payload.fill}` }}
          className="mr-2 inline-block h-5 w-5 rounded-sm"
        ></span>
        <div className="flex gap-3">
          <span className="text-sm text-black">
            {payload[0]?.payload?.label} :{" "}
          </span>
          <span className="text-sm font-semibold text-black">
            {payload[0]?.payload?.value}
          </span>
        </div>
      </div>
    );
  }
};

const PieChartComponent = ({ data = [], title = "" }) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-sm text-gray-500">No data available</span>
      </div>
    );
  }
  const totalOfValues = data.reduce((acc, curr) => acc + curr.value, 0);
  data = data.map((item, index) => ({
    ...item,
    percentage: Number(((item.value / totalOfValues) * 100).toFixed(2)),
    fill: colorArr[index % colorArr.length],
    opacity: 1,
  }));
  console.log(data);
  // if (!data) {
  //   return null;
  // }
  // const totalOfValues = React.useMemo(() => {
  //     return data.reduce((acc, curr) => acc + curr.value, 0);
  // }, [data]);

  return (
    <>
      <ChartContainer
        config={chartConfig}
        className=" aspect-square max-h-[400px] mx-auto"
      >
        <PieChart>
          <ChartTooltip cursor={false} content={<CustomTooltip />} />
          <Pie
            data={data}
            dataKey="percentage"
            nameKey="label"
            innerRadius={90}
            strokeWidth={5}
            isAnimationActive={false}
            //   gap={10}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-black text-lg font-semibold tracking-tighter"
                      >
                        {totalOfValues.toLocaleString()}
                        {" " + title}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-white"
                      >
                        Passwords
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
          {/* Arrows from slices to legend */}
          <g>
            {data.map((entry, index) => {
              const angle =
                ((data.slice(0, index).reduce((a, b) => a + b.value, 0) +
                  entry.value / 2) /
                  total) *
                2 *
                Math.PI;

              const x1 = 150 + Math.cos(angle) * 120;
              const y1 = 150 + Math.sin(angle) * 120;
              const x2 = 150 + Math.cos(angle) * 150;
              const y2 = 150 + Math.sin(angle) * 150;

              return (
                <polyline
                  key={index}
                  points={`${x1},${y1} ${x2},${y2}`}
                  stroke={entry.color}
                  strokeWidth={2}
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              );
            })}

            {/* Arrowhead definition */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="2"
                orient="auto"
              >
                <path d="M0,0 L0,4 L6,2 Z" fill="currentColor" />
              </marker>
            </defs>
          </g>
        </PieChart>
      </ChartContainer>
      <div className="flex flex-row gap-2 w-full justify-center flex-wrap">
        {data?.map((item, index) => (
          <div key={index} className="flex items-center">
            <span
              style={{ backgroundColor: item.fill }}
              className="inline-block w-4 h-4 mr-2 rounded-sm"
            ></span>
            <span className="text-sm text-nowrap">
              {item.label} : {item.value}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default PieChartComponent;
