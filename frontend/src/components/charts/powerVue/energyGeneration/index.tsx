import { ResponsiveLine } from "@nivo/line";

export interface DataTypeWattHour {
  x: Date;
  y: number;
  source: string;
}

const date = new Date();
date.setHours(0, 0, 0, 0);
const dateTime: Date[] = [date];
for (let i = 1; i < 60; i++) {
  const time = new Date(date.getTime());
  time.setHours(i);
  dateTime.push(time);
}

const data1: DataTypeWattHour[] = dateTime.map((entry) => ({
  x: entry,
  y: Math.floor(Math.random() * 8001) - 3000,
  source: "eGauge",
}));

const data2: DataTypeWattHour[] = dateTime.map((entry) => ({
  x: entry,
  y: Math.floor(Math.random() * 5001),
  source: "Battery",
}));

const data3: DataTypeWattHour[] = dateTime.map((entry) => ({
  x: entry,
  y: Math.floor(Math.random() * 8001) - 3000,
  source: "PowerVue",
}));

const data = [
  {
    id: "eGauge",
    data: [...data1],
  },
  {
    id: "Battery",
    data: [...data2],
  },
  {
    id: "PowerVue",
    data: [...data3],
  },
];

const GenerationChart = () => {
  return (
    <div className="h-full w-full">
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
        xScale={{ type: "time", format: "%Y-%m-%dT%H:%M:%S.%L%Z" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="natural"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: "time",
          legendOffset: 36,
          legendPosition: "end",
          format: "%I:%M%p",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "(W)",
          legendOffset: -40,
          legendPosition: "end",
        }}
        colors={["#38bdf8", "#a78bfa", "#f472b6"]}
        enableGridX={false}
        lineWidth={2}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        enableArea={false}
        areaBlendMode="multiply"
        areaOpacity={0.1}
        useMesh={true}
        legends={[
          {
            anchor: "top-right",
            direction: "row",
            justify: false,
            translateX: 20,
            translateY: -10,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        tooltip={({ point }) => {
          const { x: date, y: watts } = point.data;
          const { serieId: source, serieColor: color } = point;

          return (
            <div className="rounded bg-white px-2.5 py-1 shadow-md ring-1 ring-gray-200">
              <div className="flex items-center gap-x-1">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm font-medium">{source}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold">
                  {watts.toString()} Watts
                </span>
                <span className="text-xs font-medium">
                  {new Date(date).toLocaleString()}
                </span>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default GenerationChart;
