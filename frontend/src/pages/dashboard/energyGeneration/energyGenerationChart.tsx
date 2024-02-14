import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import type { DataTypeWattHour } from ".";

const EnergyGenerationChart = (props: {
  data: {
    id: string;
    data: DataTypeWattHour[];
  }[];
}) => {
  const calculateTickValues = () => {
    const { data } = props;
    const allTimes = data.flatMap((dataset) =>
      dataset.data.map((point) => point.x.getTime())
    );

    const sortedTimes = allTimes.sort((a, b) => a - b);
    const interval = Math.ceil(sortedTimes.length / 5); // Calculate interval

    const ticks = sortedTimes.filter((time, index) => index % interval === 0);

    // Include the last time in the ticks
    ticks.push(sortedTimes[sortedTimes.length - 1]);

    return ticks;
  };

  return (
    <LineChart
      width={700}
      height={400}
      data={props.data.flatMap((dataset) =>
        dataset.data.map((point) => ({ ...point, x: point.x.getTime() }))
      )}
      margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="x"
        type="number"
        domain={['dataMin', 'dataMax']}
        tickFormatter={(tick) =>
          new Date(tick).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
          })
        }
        ticks={calculateTickValues()}
      />
      <YAxis />
      <Tooltip
        formatter={(value, name, props) => [`${value} Watts`, name]}
        labelFormatter={(label) => new Date(label).toLocaleString()}
      />
      <Legend verticalAlign="top" height={36} />
      {props.data.map((dataset) => (
        <Line
          key={dataset.id}
          type="monotone"
          data={dataset.data.map((point) => ({
            ...point,
            x: point.x.getTime(),
          }))}
          dataKey="y"
          name={dataset.id}
          stroke={getColorForId(dataset.id)}
          strokeWidth={2}
          dot={false}
        />
      ))}
    </LineChart>
  );
};

const getColorForId = (id: string) => {
  const colorMap: Record<string, string> = {
    eGauge: "#38bdf8",
    Battery: "#a78bfa",
    PowerVue: "#f472b6",
  };

  return colorMap[id] || "#000000";
};

export default EnergyGenerationChart;
