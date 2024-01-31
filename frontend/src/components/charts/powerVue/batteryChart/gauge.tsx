import { ResponsiveRadialBar } from "@nivo/radial-bar";

const data = [
  {
    id: "batteryGauge",
    data: [
      {
        x: "",
        y: 28,
      },
    ],
  },
];

export default function BatteryGauge() {
  return (
    <div className="relative flex h-80 w-full items-center justify-center">
      <ResponsiveRadialBar
        data={data}
        margin={{ top: 0, right: 0, bottom: -100, left: 0 }}
        valueFormat=">-.2f"
        maxValue={100}
        startAngle={270}
        endAngle={450}
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
  );
}
