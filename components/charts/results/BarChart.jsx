import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiRadarLine } from "react-icons/ri";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const colorsList = [
  "#6B8E9E",
  "#6FA8D6",
  "#7A9EDC",
  "#8A7DBA",
  "#9A8DC3",
  "#7A6EB8",
  "#D9C26B",
  "#D1B05A",
  "#D1A27A",
  "#D19A6B",
  "#D18A9A",
  "#D19AB6",
  "#B9A27A",
  "#A88B6A",
  "#B5B8C1",
  "#8A9BA6",
  "#7A8B9B",
  "#7AB3B0",
  "#8AC5D6",
  "#9AD6D6",
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip flex flex-col gap-2 bg-white p-2 rounded-md shadow-md border border-gray-200">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{label} : </p>
          <p className="text-sm">{payload[0].value} Domains</p>
        </div>
        {/* <p className="text-[12px] font-light">Click to expand results</p> */}
      </div>
    );
  }
  return null;
};

function generateUniqueColors() {
  const minHue = 113;
  const maxHue = 340;
  const saturation = 41;
  const lightness = 51;
  const colorCount = 20;
  const hueStep = (maxHue - minHue) / (colorCount - 1);

  const colors = [];
  for (let i = 0; i < colorCount; i++) {
    const hue = minHue + i * hueStep;
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}

const uniqueColors = generateUniqueColors();

const chartData = [
  {
    label: "January",
    value: 186,
    fill: "linear-gradient(to bottom, red, yellow)",
  },
  { label: "February", value: 305, fill: uniqueColors[4] },
  { label: "March", value: 237, fill: uniqueColors[8] },
  { label: "April", value: 73, fill: uniqueColors[15] },
  { label: "May", value: 209, fill: uniqueColors[18] },
  { label: "June", value: 214, fill: uniqueColors[1] },
  { label: "February", value: 305, fill: uniqueColors[4] },
  { label: "March", value: 237, fill: uniqueColors[8] },
];

const chartConfig = {
  value: {
    label: "Exposure",
    color: "#ffffff",
  },
};

const BarChartComponent = ({
  data = [],
  title = "",
  openSheet,
  containerClassName = "",
}) => {
  let chartData = data.map((item, itemIndex) => ({
    label: item.label,
    value: item.value,
    data: item.data,
    // fill: colorsList[itemIndex % colorsList.length],
  }));

  const handleClick = (val, index) => {
    console.log("Clicked point payload:", val?.activePayload?.[0]?.payload);
    openSheet(
      val?.activePayload?.[0]?.payload?.data,
      "table",
      `Exposure By Source: ${val?.activePayload?.[0]?.payload?.label}`
    );
  };
  return (
    <ChartContainer
      config={chartConfig}
      className="w-[100%] h-[300px] overflow-x-scroll"
    >
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
        }}
        onClick={handleClick}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(0, 4)}
        />
        <ChartTooltip cursor={false} content={<CustomTooltip />} />
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#788aff" stopOpacity={1} />
            <stop offset="100%" stopColor="#788aff" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        {/* <Bar dataKey="desktop" fill="url(#barGradient)" radius={5} /> */}
        <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="url(#barGradient)">
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default BarChartComponent;
