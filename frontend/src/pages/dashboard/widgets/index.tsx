import WeatherWidget from "./weatherWidget";
import WaterTankWidget from "./waterTankWidget";
import HVACWidget from "./hvacWidget";

const DashboardWidgets = () => {
  return (
    <>
      <div className="order-4 col-span-8 rounded-lg shadow md:col-span-4 lg:col-span-2">
        <WeatherWidget />
      </div>
      <div className="order-5 col-span-8 rounded-lg shadow lg:col-span-3">
        <WaterTankWidget />
      </div>
      <div className="order-6 col-span-8 rounded-lg shadow lg:col-span-3">
        <HVACWidget />
      </div>
    </>
  );
};

export default DashboardWidgets;
