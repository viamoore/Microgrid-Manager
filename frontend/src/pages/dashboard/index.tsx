import EGauge from "./eGauge";
import Battery from "./battery";
import EnergyGeneration from "./energyGeneration";
import Widgets from "./widgets";
import PowerStatusComponent from "@/components/powerStatus";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DashboardPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-y-4 p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* <Alert variant="destructive">
        <AlertTitle>Work in progress</AlertTitle>
        <AlertDescription className="mt-2 rounded bg-red-100/50 px-4 py-2">
          <div>Recommendation:</div>
          <div>Body</div>
        </AlertDescription>
      </Alert> */}

      <PowerStatusComponent/>

      <div className="grid grid-cols-8 gap-4 pb-6">
        <div className="order-1 col-span-8 rounded-lg shadow">
          <EGauge />
        </div>
        <div className="order-2 col-span-8 rounded-lg shadow md:order-3 md:col-span-4 lg:order-2 lg:col-span-3">
          <Battery />
        </div>
        <div className="order-3 col-span-8 h-96 rounded-lg shadow md:order-2 md:col-span-8 md:h-full lg:order-3 lg:col-span-5">
          <EnergyGeneration />
        </div>

        <Widgets />
      </div>
    </div>
  );
};

export default DashboardPage;
