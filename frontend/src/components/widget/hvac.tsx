import { useEffect, useState } from "react";
import { Widget } from "../../interfaces/JSXTypes";
import { hvac } from "./svgImports";
import { Slider } from "antd";
import { SliderMarks } from "antd/es/slider";

interface HVACData {
  dateTime: Date;
  status: boolean;
  temperature: number;
  unit: string;
  metaData?: [];
}

// UNIT IS ONLY DISPLAY UNIT
// Temperature is always stored in Celsius
interface HVACConfig {
  name: string;
  minTemperature: number;
  maxTemperature: number;
  unit: string;
  rule?: string[];
}

const mockHVACConfig: HVACConfig[] = [
  {
    name: "On Grid",
    minTemperature: 20,
    maxTemperature: 50,
    unit: "F",
    rule: ["On Grid"],
  },
  {
    name: "Off Grid - On Solar",
    minTemperature: 20,
    maxTemperature: 56,
    unit: "F",
    rule: ["Off Grid", "On Solar"],
  },
  {
    name: "Off Grid",
    minTemperature: 10,
    maxTemperature: 90,
    unit: "F",
    rule: ["Off Grid", "Off Solar"],
  },
];

const hvacData: HVACData = {
  dateTime: new Date(),
  status: true,
  temperature: 15,
  unit: "F",
};

// Value must be between 0 and 100
// So it is in Celsius
const marks: SliderMarks = {
  0: "32°F", // 0°C
  25: "77°F", // 25°C
  50: "122°F", // 50°C
  75: "167°F", // 75°C
  100: {
    style: {
      color: "#f50",
    },
    label: <strong>212°F</strong>, // 100°C
  },
};

const HVACWidget: React.FC<Widget> = () => {
  const [hvacConfig, setHVACConfig] = useState<HVACConfig[]>([]);
  useEffect(() => {
    // Make API call to get the config
    setHVACConfig(mockHVACConfig);
  }, []);

  return (
    <div className="group/internal hover:scale-101 pointer-events-auto flex transform flex-col rounded-md bg-slate-50 p-4 px-2 text-lg transition-all duration-300 ease-in-out hover:flex-grow">
      <div className="flex w-full items-center justify-between">
        <img src={hvac} className="h-10 w-10" />
        <span className="mr-2 flex">
          <p className="mr-8">HVAC</p>
          <p>
            {hvacData?.temperature}°{hvacData?.unit}
          </p>
        </span>
      </div>
      <div className="pointer-events-none h-0 opacity-0 group-hover/internal:pointer-events-auto group-hover/internal:h-auto group-hover/internal:p-2 group-hover/internal:opacity-100">
        <div className="my-2 h-0.5 border-t border-black" />
        <div className="flex h-auto w-full flex-row justify-evenly">
          <div className="flex h-full w-full flex-col text-sm">
            {hvacConfig.map((config, index) => {
              return (
                <div key={index} className="flex flex-col p-1 shadow-sm">
                  <div>{config.name}</div>
                  <Slider
                    range
                    marks={marks}
                    tooltip={{
                      formatter: (value?: number) => {
                        if (value === undefined) {
                          return "";
                        }
                        // Calculate the Fahrenheit temperature for the current value
                        const fahrenheit = (value * 9) / 5 + 32;
                        return `${fahrenheit}°F`;
                      },
                    }}
                    value={[config.minTemperature, config.maxTemperature]}
                    onChange={(value: number[]) => {
                      setHVACConfig((prevState) => {
                        const newState = [...prevState];
                        newState[index].minTemperature = value[0];
                        newState[index].maxTemperature = value[1];
                        return newState;
                      });
                    }}
                    onAfterChange={(value) => console.log(value)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HVACWidget;
