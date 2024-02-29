import EGauge from "./eGauge";
import Battery from "./battery";
import EnergyGeneration from "./energyGeneration";
import Widgets from "./widgets";
import LightSystem from "./light";

const DashboardPage = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <LightSystem battery={100} />

      <div className="mt-8 gap-y-4 px-6">
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
    </div>
  );
};

export default DashboardPage;
