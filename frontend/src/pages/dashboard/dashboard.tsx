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
    <div className="flex h-full w-full flex-col gap-y-2 p-4">
      <div className="flex flex-col rounded-lg bg-gray-200 p-2 shadow-sm">
        <h1 className="mb-4 w-full rounded-sm bg-yellow-400 p-2 text-red-600">
          WORK IN PROGRESS
        </h1>
        <div>Recommendation:</div>
        <div>Body</div>
      </div>

      <div className="col-span-full col-start-1 rounded-lg shadow-sm">
        <ChartCarousel />
      </div>

      <div className="flex w-full flex-row gap-x-2">
        <div className="relative flex w-3/4 flex-col rounded-lg bg-gray-100 p-4 shadow-sm">
          <BatteryChart />
        </div>

        <div className="w-full rounded-lg bg-gray-200">
          <WidgetLayout widgets={widgets} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
