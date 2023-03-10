import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Bar,
} from "recharts";

type Props = {
  data: [];
  dataKey: string;
};

export default function Charts({ data, dataKey }: Props) {
  return (
    <div className="relative px-4 py-2 text-xs bg-white rounded-md md:text-base">
      <ResponsiveContainer
        height={350}
        className="!w-full md:!w-3/4 lg:!w-full"
      >
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset={"0%"} stopColor="#2451b7" stopOpacity={".8"} />
              <stop offset={"70%"} stopColor="#2451b7" stopOpacity={".05"} />
            </linearGradient>
          </defs>
          <Area
            type={"monotoneX"}
            dataKey={dataKey}
            stroke={"#2451b7"}
            fill="url('#color')"
            strokeWidth={2}
          />
          <XAxis dataKey="name" />
          <YAxis width={30} />
          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{ outline: "none" }}
          />
          <CartesianGrid opacity={0.05} vertical={false} />
          <Legend
            formatter={(value, entry, index) => {
              return (
                <span className="inline-block pt-8 text-black capitalize">
                  {value}
                </span>
              );
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

type CustomTooltipType = {
  active: boolean;
  payload: any;
  label: string;
};

const CustomTooltip: Function = ({
  active,
  payload,
  label,
}: CustomTooltipType) => {
  if (active) {
    return (
      <div className="px-4 py-2 text-white bg-[#313e4c] rounded-lg shadow-button">
        <h3 className="text-lg font-bold text-center">{label}</h3>
        <p className="text-sm opacity-80">
          {payload[0].name}: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};
