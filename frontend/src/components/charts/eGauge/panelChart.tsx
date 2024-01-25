import { useRef, useState } from "react";
import PanelChartSVG from "./panelChartSVG";

import { Config, eGaugeData } from "./eGaugeTypes";
import { SettingOutlined } from "@ant-design/icons";
import { Alert, Input, Select, Tooltip } from "antd";
import { useMicrogrid } from "../../../context/useMicrogridContext";

interface PanelChartProps {
  height?: number;
  width?: number;
  index: number;
  dataSet: eGaugeData[];
  collapsed: boolean;
}

type TooltipInfo = {
  source: string;
  title: string;
  period: string;
  [key: string]: string;
};

const tooltipInfo: TooltipInfo = {
  name: "Name of the Chart",
  source: "End point to get data from",
  title: "Source of the Data",
  period: "How far back should the data be displayed",
};

const displayOptions = [
  { value: "30 sec", label: "30 sec" },
  { value: "1 minute", label: "1 minute" },
  { value: "5 minute", label: "5 minute" },
  { value: "10 minute", label: "10 minute" },
  { value: "15 minute", label: "15 minute" },
  { value: "30 minute", label: "30 minute" },
  { value: "1 hour", label: "1 hour" },
];

const PanelChart: React.FC<PanelChartProps> = ({
  index,
  height = 300,
  width = 330,
  dataSet,
  collapsed,
}) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [showAlert, setShowAlert] = useState({ content: "", show: false });
  const { config, setConfig } = useMicrogrid();
  const [configState, setConfigState] = useState<Config>(
    config.chartCarouselConfigs[index],
  );

  const handleEditInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    setConfigState((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  const handleEditSelect = (value: string, target: string) => {
    setConfigState((prevState) => ({ ...prevState, [target]: value }));
  };

  const handleSave = () => {
    const isValid = Object.values(configState).every(
      (value) => value !== undefined && value !== null,
    );
    if (isValid) {
      const newChartCarouselConfigs = [...config.chartCarouselConfigs];
      newChartCarouselConfigs[index] = configState;
      setConfig((prevConfig) => ({
        ...prevConfig,
        chartCarouselConfigs: newChartCarouselConfigs,
      }));
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
    <div
      key="1"
      className={`w-[${width}px] group relative flex flex-col rounded-md bg-white`}
    >
      <div className="font-mediums flex h-auto items-center justify-between p-2 px-2 text-base">
        <p>
          <span>{configState.name}</span>
          <span>:</span>
          <span className="pl-2">
            {dataSet.length > 0
              ? Number(dataSet[dataSet.length - 1].value).toFixed(2)
              : "0"}
          </span>
          <span>
            {dataSet.length > 0 ? dataSet[dataSet.length - 1].unit : "W"}
          </span>
        </p>
        <button
          className={`${collapsed ? "hidden" : ""} pointer-events-none opacity-0 transition-opacity duration-200 ease-in-out group-hover:pointer-events-auto group-hover:opacity-100`}
          onClick={() => {
            setShowConfig(!showConfig);
          }}
        >
          <SettingOutlined />
        </button>
      </div>
      <div
        className={`${collapsed ? "pointer-events-none h-0 opacity-0" : "h-[" + height + "] mt-2 p-2 opacity-100"} relative w-full flex-grow transition-all duration-100`}
        ref={parentRef}
      >
        <PanelChartSVG
          height={150}
          width={250}
          data={dataSet}
          unit={"W"}
          parent={parentRef}
          config={configState}
        />
      </div>
      <div
        className={`absolute flex h-full w-full items-center justify-center ${showConfig ? "" : "hidden"}`}
      >
        <div className="flex h-full w-3/4 flex-col rounded-md bg-slate-200 p-4">
          <span>Modify Config</span>
          <div className="my-2 h-0.5 border-t border-black" />
          <div className="flex flex-col gap-y-2 overflow-auto">
            {Object.entries(configState).map(([key, value]) => (
              <div key={key}>
                <Tooltip title={tooltipInfo[key]}>{key}: </Tooltip>
                {key === "source" || key === "name" ? (
                  <Input
                    placeholder={value}
                    onChange={(e) => handleEditInput(e, key)}
                  />
                ) : (
                  <Select
                    className="w-full"
                    defaultValue={value}
                    options={displayOptions}
                    onChange={(value: string) =>
                      handleEditSelect(value, "period")
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-auto flex gap-4">
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
                setConfigState(config.chartCarouselConfigs[index]);
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

export default PanelChart;
