import WeatherWidget from "../../components/widget/weather";
import { WidgetLayout } from "../../layouts";
import ChartCarousel from "../../components/charts/eGauge/chartCarousel";
import { Widget, WidgetComponent } from "../../interfaces/JSXTypes";
import { BatteryChart } from "../../components";
import WaterTankWidget from "../../components/widget/waterTank";
import HVACWidget from "../../components/widget/hvac";
// import GenerationChart from "../../components/charts/powerVue/energyGeneration/overviewEnergyChart";

// Dashboard is grid composed of 12 columns.
const Dashboard = () => {
  const widgets: React.ReactElement<Widget, WidgetComponent>[] = [
    <WeatherWidget />,
    <WaterTankWidget />,
    <HVACWidget />,
  ];

  return (
    <div className="flex h-full w-full flex-col gap-y-4 px-4 py-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* <div className="flex flex-col rounded-lg p-2 shadow ring-1 ring-gray-100">
        <h2 className="mb-4 w-full rounded-sm bg-yellow-400 p-2 text-red-600">
          WORK IN PROGRESS
        </h2>

        <div>Recommendation:</div>
        <div>Body</div>
      </div> */}

      <div className="rounded-lg shadow">
        <ChartCarousel />
      </div>

      <div className="mt-2 flex w-full flex-row gap-x-6">
        <div className="w-3/4">
          <BatteryChart />
        </div>

        <div className="w-full">
          <WidgetLayout widgets={widgets} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
