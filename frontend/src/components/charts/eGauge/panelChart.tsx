import { useRef, useState } from "react";
import PanelChartSVG from "./panelChartSVG";

import { Config, eGaugeData } from "./eGaugeTypes";
import { Settings } from "lucide-react";
import { Alert } from "antd";
import { useMicrogrid } from "../../../context/useMicrogridContext";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="relative overflow-hidden rounded-lg bg-gray-100 px-4 py-5 shadow-sm sm:p-6">
      <dt className="truncate text-sm font-medium text-gray-500">
        {configState.name}
      </dt>
      <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
        <span>
          {dataSet.length > 0
            ? Number(dataSet[dataSet.length - 1].value).toFixed(2)
            : "0"}
        </span>
        <span>
          {dataSet.length > 0 ? dataSet[dataSet.length - 1].unit : "W"}
        </span>
      </dd>

      <Popover
        open={showConfig}
        onOpenChange={(isOpen) => {
          if (!isOpen) setConfigState(config.chartCarouselConfigs[index]);

          setShowConfig(isOpen);
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="absolute right-0 top-0 m-3.5"
            onClick={() => setShowConfig(!showConfig)}
          >
            <Settings
              className="h-4 w-4"
              aria-label={`${configState.name} settings`}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <span>{`${configState.name} settings`}</span>

          <div className="space-y-2">
            {Object.entries(configState).map(([key, value]) => (
              <div key={key}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor={key}>{key}</Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tooltipInfo[key]}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {key === "source" || key === "name" ? (
                  <Input
                    id={key}
                    placeholder={value}
                    onChange={(e) => handleEditInput(e, key)}
                  />
                ) : (
                  <Select
                    value={configState["period"]}
                    defaultValue={value}
                    onValueChange={(value: string) =>
                      handleEditSelect(value, "period")
                    }
                  >
                    <SelectTrigger id={key}>
                      <SelectValue placeholder="How far back should the data be displayed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Period</SelectLabel>
                        {displayOptions.map((option) => (
                          <SelectItem value={option.value}>
                            {option.value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 text-right">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* <div
        className={`${collapsed ? "pointer-events-none h-0 opacity-0" : "h-[" + height + "] mt-2 p-2 opacity-100"} 
        relative w-full flex-grow rounded-lg bg-white transition-all duration-100`}
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
      </div> */}

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
