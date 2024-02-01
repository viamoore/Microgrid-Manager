import EGauge from "./eGauge";
import Battery from "./battery";
import EnergyGeneration from "./energyGeneration";
import { WidgetLayout } from "../../layouts";
import WeatherWidget from "../../components/widget/weather";
import WaterTankWidget from "../../components/widget/waterTank";
import HVACWidget from "../../components/widget/hvac";
import { Widget, WidgetComponent } from "../../interfaces/JSXTypes";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DashboardPage = () => {
  const widgets: React.ReactElement<Widget, WidgetComponent>[] = [
    <WeatherWidget />,
    <WaterTankWidget />,
    <HVACWidget />,
  ];

  return (
    <div className="flex h-full w-full flex-col gap-y-4 p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <Alert variant="destructive">
        <AlertTitle>Work in progress</AlertTitle>
        <AlertDescription className="mt-2 rounded bg-red-100/50 px-4 py-2">
          <div>Recommendation:</div>
          <div>Body</div>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
        <div className="col-span-1 rounded-lg shadow sm:col-span-2 md:col-span-5">
          <EGauge />
        </div>
        <div className="col-span-1 rounded-lg shadow sm:col-span-1 md:col-span-2">
          <Battery />
        </div>
        <div className="col-span-1 rounded-lg shadow sm:col-span-1 md:col-span-3">
          <EnergyGeneration />
        </div>

        <div className="col-span-1 rounded-lg shadow sm:col-span-1 md:col-span-3">
          <WidgetLayout widgets={widgets} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
