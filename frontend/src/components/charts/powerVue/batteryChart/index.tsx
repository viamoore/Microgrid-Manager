import { useEffect, useRef, useState } from "react";

import BatteryGauge from "./gauge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BatteryMedium, GaugeCircle } from "lucide-react";

import type { DataRequest_Once, DataStream } from "./batteryChartTypes";

const mockData: DataRequest_Once = {
  capacity: 15000,
};

const BatteryChart = () => {
  const eventSourceRef = useRef<EventSource | null>(null);
  const [dataStream, setDataSteam] = useState<DataStream>({} as DataStream);

  useEffect(() => {
    if (!eventSourceRef.current) {
      eventSourceRef.current = new EventSource(
        "http://localhost:8080/powerview",
      );
      eventSourceRef.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        setDataSteam(data);
      };
    }
  }, []);

  return (
    <div className="group flex h-auto w-full flex-grow flex-col rounded-lg bg-white p-4 shadow ring-1 ring-gray-100">
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">Solar & Battery Status</h2>
      </div>

      <BatteryGauge dataStream={dataStream} capacity={mockData.capacity} />

      <div className="-mt-2 flex items-center justify-evenly pb-2">
        <div className="flex flex-col items-center gap-x-2">
          <BatteryMedium className="h-5 w-5 scale-125 text-gray-500" />
          <span className="mt-1 text-2xl font-medium text-blue-600">
            {mockData.capacity / 1000}kWh
          </span>
          <h3 className="mt-0.5 text-sm text-gray-600">Capacity</h3>
        </div>

        <div className="flex flex-col items-center gap-x-2">
          <GaugeCircle className="h-5 w-5 text-gray-500" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="mt-1 text-2xl font-medium text-emerald-600">
                  Low risk
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Target battery charge: 100%</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <h3 className="mt-0.5 text-sm text-gray-600">Mode</h3>
        </div>
      </div>
    </div>
  );
};

export default BatteryChart;
