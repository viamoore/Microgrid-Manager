import { useCallback, useState, useEffect } from "react";
import { RadialBarChart, RadialBar } from "recharts";
import { cx } from "class-variance-authority";

import type { DataStream } from "./batteryChartTypes";

export default function BatteryGauge(props: {
  dataStream: DataStream;
  capacity: number;
}) {
  const { dataStream, capacity } = props;
  const [chartData, setChartData] = useState([
    {
      name: "batteryGauge",
      value: 0,
    },
  ]);

  const [config, setConfig] = useState({
    onGrid: false,
    percentage: 0,
    projectedWatt: 0,
    projectedPercentage: 0,
    isCharging: false,
  });

  const updateConfig = useCallback(() => {
    const onGrid = dataStream.gridTo || dataStream.toGrid;
    const percentage = dataStream.soc / 100;
    const projectedWatt = dataStream.battPower + capacity * percentage;
    const projectedPercentage = (projectedWatt / capacity) * 100;
    const isCharging = projectedWatt > capacity * percentage;

    setConfig({
      onGrid,
      percentage,
      projectedWatt,
      projectedPercentage,
      isCharging,
    });
    setChartData([
      {
        name: "batteryGauge",
        value: percentage * 100,
      },
    ]);
  }, [dataStream, capacity]);

  useEffect(() => {
    updateConfig();
  }, [dataStream, capacity, updateConfig]);

  return (
    <div className="relative">
      <div className="relative flex h-200 w-200 items-center justify-center">
        <RadialBarChart
          width={500}
          height={500}
          innerRadius="65%"
          outerRadius="80%"
          data={chartData}
          startAngle={315}
          endAngle={585}
        >
          <RadialBar
            label={{ position: "insideStart", fill: "#fff" }}
            background
            dataKey="value"
            fill="#34d399"
          />
        </RadialBarChart>
      </div>
      <div className="absolute left-1/2 top-1/2 mt-2.5 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        {!isNaN(config.percentage) && (
          <div className="text-lg">{(config.percentage)*100}%</div>
        )}
        {dataStream.pac !== undefined && (
          <div
            className={cx(
              dataStream.pac <= 0 ? "text-rose-500" : "text-emerald-500",
              "mt-1 text-3xl font-semibold",
            )}
          >
            {dataStream.pac} (W)
          </div>
        )}
        <div
          className={cx(
            !config.onGrid ? "text-rose-500" : "text-emerald-500",
            "mt-2.5 text-md font-medium",
          )}
        >
          {config.onGrid ? "On grid" : "Off grid"}
        </div>
      </div>
    </div>
  );
}
