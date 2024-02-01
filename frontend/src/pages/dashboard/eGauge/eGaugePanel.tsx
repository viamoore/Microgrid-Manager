import { useState } from "react";
import useEGaugeConfigStore from "./store";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings } from "lucide-react";

import type { Config, eGaugeData } from "./eGaugeTypes";

interface EGaugePanelProps {
  index: number;
  data: eGaugeData[];
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
  { value: "30 seconds", label: "30 seconds" },
  { value: "1 minute", label: "1 minute" },
  { value: "5 minutes", label: "5 minutes" },
  { value: "10 minutes", label: "10 minutes" },
  { value: "15 minutes", label: "15 minutes" },
  { value: "30 minutes", label: "30 minutes" },
  { value: "1 hour", label: "1 hour" },
];

const EGaugePanel: React.FC<EGaugePanelProps> = ({ index, data }) => {
  const { config, saveConfigValues } = useEGaugeConfigStore();

  // const parentRef = useRef<HTMLDivElement | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [configState, setConfigState] = useState<Config>(config[index]);

  const handleEditInput = (key: string, value: string) => {
    setConfigState((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSave = () => {
    const isValid = Object.values(configState).every(
      (value) => value !== undefined && value !== null && value.length !== 0,
    );
    if (isValid) {
      saveConfigValues({ newConfigState: configState });

      setShowConfig(false);
      toast(`Successfully updated ${configState.name}`);
    } else {
      toast(`Failed to update ${configState.name}`, {
        description: "Invalid input.",
      });
    }
  };

  return (
    <div className="group relative bg-white">
      <div className="rounded-sm bg-gray-100">
        <div className="ml-1 flex justify-between bg-white pl-2">
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">{configState.name}</h3>
            <Button className="h-fit w-fit bg-transparent p-0 font-normal text-gray-400 hover:bg-transparent hover:text-gray-950">
              View more
            </Button>
          </div>

          <Popover
            open={showConfig}
            onOpenChange={(isOpen) => {
              if (!isOpen) setConfigState(config[index]);

              setShowConfig(isOpen);
            }}
          >
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="m-[5px] h-4 p-0 text-gray-500 hover:bg-transparent hover:text-gray-950"
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
                        onChange={(e) => handleEditInput(key, e.target.value)}
                      />
                    ) : (
                      <Select
                        value={configState["period"]}
                        defaultValue={value}
                        onValueChange={(value: string) =>
                          handleEditInput("period", value)
                        }
                      >
                        <SelectTrigger id={key}>
                          <SelectValue placeholder="How far back should the data be displayed" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Period</SelectLabel>
                            {displayOptions.map((option) => (
                              <SelectItem
                                value={option.value}
                                key={option.value}
                              >
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
        </div>
      </div>

      <div className="mt-2 pl-3 text-2xl font-medium">
        <span>
          {data.length > 0
            ? Number(data[data.length - 1].value).toFixed(2)
            : "0"}
        </span>
        <span>{data.length > 0 ? data[data.length - 1].unit : "W"}</span>
      </div>
    </div>
  );
};

export default EGaugePanel;
