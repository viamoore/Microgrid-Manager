import EnergyGenerationChart from "./energyGenerationChart";

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
  source: "eGuage",
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
      <EnergyGenerationChart data={data} />
    </div>
  );
};

export default GenerationChart;
