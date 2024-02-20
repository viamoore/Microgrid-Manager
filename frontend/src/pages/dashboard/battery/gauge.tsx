import { useCallback, useState, useEffect } from "react";

import { ResponsiveRadialBar } from "@nivo/radial-bar";
import { cx } from "class-variance-authority";

import type { DataStream } from "./batteryChartTypes";

export default function BatteryGauge(props: {
  dataStream: DataStream;
  capacity: number;
}) {
  const { dataStream, capacity } = props;
  const [chartData, setChartData] = useState([
    {
      id: "batteryGauge",
      data: [
        {
          x: "",
          y: 0,
        },
      ],
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
    const projectedPercentage = projectedWatt / capacity;
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
        id: "batteryGauge",
        data: [
          {
            x: "",
            y: percentage * 100,
          },
        ],
      },
    ]);
  }, [dataStream, capacity]);

  useEffect(() => {
    updateConfig();
  }, [dataStream, capacity, updateConfig]);

  return (
    <div className="relative">
      <div className="relative flex h-80 w-full items-center justify-center">
        <ResponsiveRadialBar
          data={chartData}
          margin={{ top: 0, right: 0, bottom: -25, left: 0 }}
          valueFormat=">-.2f"
          maxValue={100}
          startAngle={225}
          endAngle={495}
          padding={0.75}
          cornerRadius={3}
          radialAxisStart={null}
          circularAxisOuter={null}
          enableCircularGrid={false}
          enableRadialGrid={false}
          colors="#34d399"
          tooltip={({ bar }) => {
            return (
              <div className="rounded bg-white px-2.5 py-0.5 shadow ring-1 ring-gray-100">
                <span className="text-xs">{bar.data.y}%</span>
              </div>
            );
          }}
        />
      </div>
      <div className="absolute left-1/2 top-1/2 mt-2.5 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        {!isNaN(config.percentage) && (
          <div>{(config.percentage * 100).toFixed(2)}%</div>
        )}
        {dataStream.pac !== undefined && (
          <div
            className={cx(
              dataStream.pac <= 0 ? "text-rose-500" : "text-emerald-500",
              "mt-1 text-4xl font-semibold",
            )}
          >
            {dataStream.pac} (W)
          </div>
        )}
        <div
          className={cx(
            !config.onGrid ? "text-rose-500" : "text-emerald-500",
            "mt-2.5 text-lg font-medium",
          )}
        >
          {config.onGrid ? "On grid" : "Off grid"}
        </div>
      </div>
    </div>
  );
}