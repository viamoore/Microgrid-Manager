import { useEffect, useRef, useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Tooltip, Input, Alert } from "antd";

import BatteryCapacitySVG from "./batteryCapacitySVG";

import battery from "../../../../assets/battery.svg";
import timer from "../../../../assets/timer.svg";

import { Config, DataRequest_Once, DataStream } from "./batteryChartTypes";
import { useMicrogrid } from "../../../../context/useMicrogridContext";

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
  const [showAlert, setShowAlert] = useState({ content: "", show: false });
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
      setShowAlert({ content: "Success", show: true });
    } else {
      setShowAlert({ content: "Invalid Input", show: true });
    }
    setTimeout(() => {
      setShowAlert({ content: "", show: false });
    }, 2000);
  };

  return (
    <div className="relative flex h-auto w-full flex-grow flex-col">
      <div className="flex justify-between px-2 text-lg">
        <span>Solar & Battery Status</span>
        <button
          className="opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => {
            setShowConfig(!showConfig);
            setConfigState(config.batteryChartConfigs);
          }}
        >
          <SettingOutlined />
        </button>
      </div>
      <div className="my-2 h-0.5 border-t border-black" />
      <div className="h-full max-h-[350px] px-2 pt-2" ref={parentRef}>
        <BatteryCapacitySVG
          data={dataStream}
          height={dimensions.height}
          width={dimensions.width}
          capacity={mockData.capacity}
          config={config.batteryChartConfigs}
        />
      </div>
      <div className="flex justify-evenly gap-2 px-2">
        <div className="flex items-center gap-2">
          <img className="flex h-10 w-10 content-center" src={battery} />
          <div className="flex flex-col ">
            <span className="text-lg text-blue-300">
              {mockData.capacity / 1000}kWh
            </span>
            <span>Capacity</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src={timer} className="flex h-10 w-10 items-center" />
          <div className="flex flex-col ">
            <Tooltip
              className="text-lg text-green-400"
              title="Target Battery Charge: 100%"
            >
              Low Risk
            </Tooltip>
            <span>Mode</span>
          </div>
        </div>
      </div>
      <div
        className={`left absolute flex h-full w-full items-center justify-center ${showConfig ? "" : "hidden"}`}
      >
        <div className="flex h-full w-4/5 flex-col rounded-md bg-slate-200 p-4 sm:w-1/2">
          <span>Modify Config</span>
          <div className="my-2 h-0.5 border-t border-black" />
          <div className="flex flex-col gap-y-2 overflow-auto">
            {Object.entries(configState).map(([key, value]) => {
              return (
                <div key={key}>
                  <Tooltip title={tooltipInfo[key]}>{key}: </Tooltip>
                  <Input
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
          <div className="mt-auto flex justify-between gap-4">
            <button
              className="rounded-lg border border-black px-2 py-1 hover:bg-slate-100"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="rounded-lg border border-black px-2 py-1 hover:bg-slate-100"
              onClick={() => {
                setShowConfig(false);
                setConfigState({} as Config);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {showAlert.show && (
        <Alert
          className="absolute w-full"
          message={showAlert.content}
          type={showAlert.content === "Success" ? "success" : "error"}
          showIcon
        />
      )}
    </div>
  );
};

export default BatteryChart;
