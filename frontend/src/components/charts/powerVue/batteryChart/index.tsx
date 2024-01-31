import { useEffect, useRef, useState } from "react";
import { useMicrogrid } from "../../../../context/useMicrogridContext";

import BatteryCapacitySVG from "./batteryCapacitySVG";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Settings } from "lucide-react";
import battery from "@/assets/battery.svg";
import timer from "@/assets/timer.svg";

import type { Config, DataRequest_Once, DataStream } from "./batteryChartTypes";
import BatteryGauge from "./gauge";

const mockData: DataRequest_Once = {
  capacity: 15000,
};

type TooltipInfo = {
  warning: string;
  danger: string;
  animationSpeed: string;
  [key: string]: string;
};

const tooltipInfo: TooltipInfo = {
  warning: "The yellow when battery is at __% capacity",
  danger: "The red when battery is at __% capacity",
  animationSpeed:
    "The speed at which the battery animation plays in ms (between 1000 and 10000)",
};

const BatteryChart = () => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const { config, setConfig } = useMicrogrid();
  const [configState, setConfigState] = useState(config.batteryChartConfigs);
  const [dataStream, setDataSteam] = useState<DataStream>({} as DataStream);
  const [showConfig, setShowConfig] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (parentRef.current) {
      setDimensions({
        width: parentRef.current.offsetWidth,
        height: parentRef.current.offsetHeight,
      });
    }
  }, [parentRef]);

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

  const handleSave = () => {
    const isValid = Object.values(configState).every(
      (value) => value !== undefined && value !== null,
    );
    const isWarningValid = configState.warning >= 0 && configState.warning <= 1;
    const isDangerValid = configState.danger >= 0 && configState.danger <= 1;
    const isAnimationSpeedValid =
      configState.animationSpeed >= 1000 && configState.animationSpeed <= 10000;

    if (isValid && isWarningValid && isDangerValid && isAnimationSpeedValid) {
      setConfig({ ...config, batteryChartConfigs: configState });
      setConfigState({} as Config);
      setShowConfig(false);
      toast("Success", { description: "Saved new config settings." });
    } else {
      toast("Error", { description: "Invalid input." });
    }
  };

  return (
    <div className="group flex h-auto w-full flex-grow flex-col rounded-lg bg-white p-4 shadow ring-1 ring-gray-100">
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">Solar & Battery Status</h2>

        <Popover
          open={showConfig}
          onOpenChange={(isOpen) => {
            if (!isOpen) setConfigState({} as Config);

            setShowConfig(isOpen);
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="m-1.5 h-4 p-0 text-gray-500 hover:bg-transparent hover:text-gray-950"
              onClick={() => {
                setShowConfig(!showConfig);
                setConfigState(config.batteryChartConfigs);
              }}
            >
              <Settings
                className="h-4 w-4 text-gray-400 group-hover:text-gray-950"
                aria-label="Solar and battery status settings"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <span>Modify Config</span>

            <div className="flex flex-col gap-y-2 overflow-auto">
              {Object.entries(configState).map(([key, value]) => {
                return (
                  <div key={key}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor={key}>{key}</Label>
                        </TooltipTrigger>
                        <TooltipContent>{tooltipInfo[key]}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Input
                      id={key}
                      name={key}
                      placeholder={value}
                      onChange={(e) => {
                        setConfigState((prevState) => ({
                          ...prevState,
                          [key]: e.target.value,
                        }));
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-auto flex justify-between gap-4 pt-4">
              <button
                className="rounded-lg border border-black px-2 py-1 hover:bg-slate-100"
                onClick={() => {
                  setShowConfig(false);
                  setConfigState({} as Config);
                }}
              >
                Cancel
              </button>
              <button
                className="rounded-lg border border-black px-2 py-1 hover:bg-slate-100"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <BatteryGauge />

      {/* <div className="h-full max-h-[350px] px-2 pt-6" ref={parentRef}>
        <BatteryCapacitySVG
          data={dataStream}
          height={dimensions.height}
          width={dimensions.width}
          capacity={mockData.capacity}
          config={config.batteryChartConfigs}
        />
      </div> */}

      <div className="flex items-center justify-evenly gap-2 px-2">
        <div className="flex items-center gap-x-2">
          <img className="flex h-8 w-8 content-center" src={battery} />
          <div className="flex flex-col">
            <span className="text-lg text-blue-400">
              {mockData.capacity / 1000}kWh
            </span>
            <h3>Capacity</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <img src={timer} className="flex h-8 w-8 items-center" />
          <div className="flex flex-col">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-lg text-green-400">Low risk</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Target battery charge: 100%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <h3>Mode</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryChart;
