import { useEffect, useState } from "react";
import { Widget } from "../../interfaces/JSXTypes";
import { waterTank } from "./svgImports";
import { Slider } from "antd";
import { SliderMarks } from "antd/es/slider";

interface WaterData {
  temperature: number;
  unit: string;
  metaData?: [];
}

// UNIT IS ONLY DISPLAY UNIT
// Temperature is always stored in Celsius
interface WaterTankConfig {
  name: string;
  relativeValue: number;
  temperature: number;
  unit: string;
  rule?: string[];
}

const mockWaterData: WaterData = {
  temperature: 20,
  unit: "F",
};

const mockWaterTankConfig: WaterTankConfig[] = [
  {
    name: "On Grid",
    relativeValue: 0,
    temperature: 100,
    unit: "F",
    rule: ["On Grid"],
  },
  {
    name: "Off Grid - On Solar",
    relativeValue: 10,
    temperature: 75,
    unit: "F",
    rule: ["Off Grid", "On Solar"],
  },
  {
    name: "Off Grid",
    relativeValue: 25,
    temperature: 60,
    unit: "F",
    rule: ["Off Grid", "Off Solar"],
  },
];

// Value must be between 0 and 100
// So it is in Celsius
const marks: SliderMarks = {
  0: {
    style: {
      color: "#f50",
    },
    label: <strong>212°F</strong>, // 100°C
  },
  25: "167°F", // 25°C
  50: "122°F", // 50°C
  75: "77°F", // 75°C
  100: "32°F", // 0°C
};

const WaterTankWidget: React.FC<Widget> = () => {
  const [waterData, setWaterData] = useState<WaterData>({
    temperature: 0,
    unit: "F",
  } as WaterData);
  const [waterTankConfig, setWaterTankConfig] = useState<WaterTankConfig[]>([]);
  useEffect(() => {
    // Make API call to get data should be some form of SSE
    setWaterData(mockWaterData);
  }, []);

  useEffect(() => {
    // Make API call to get the config
    setWaterTankConfig(mockWaterTankConfig);
  }, []);

  return (
    <div className="group/internal hover:scale-101 pointer-events-auto flex transform flex-col rounded-md bg-slate-50 p-4 px-2 text-lg transition-all duration-300 ease-in-out hover:flex-grow">
      <div className="flex w-full items-center justify-between">
        <img src={waterTank} className="h-10 w-10" />
        <span className="mr-2 flex">
          <p className="mr-8">Water Tank</p>
          <p>
            {waterData.temperature}°{waterData.unit}
          </p>
        </span>
      </div>
      <div className="pointer-events-none h-0 opacity-0 group-hover/internal:pointer-events-auto group-hover/internal:h-auto group-hover/internal:p-2 group-hover/internal:opacity-100">
        <div className="my-2 h-0.5 border-t border-black" />
        <div className="flex h-auto w-full flex-row justify-evenly">
          <div className="flex h-full w-full flex-col text-sm">
            {waterTankConfig.map((config, index) => {
              return (
                <div key={index} className="flex flex-col p-1 shadow-sm">
                  <div>{config.name}</div>
                  <Slider
                    reverse={true}
                    marks={marks}
                    tooltip={{
                      formatter: (value?: number) => {
                        if (value === undefined) {
                          return "";
                        }
                        // Calculate the Fahrenheit temperature for the current value
                        const fahrenheit = ((100 - value) * 9) / 5 + 32;
                        return `${fahrenheit}°F`;
                      },
                    }}
                    value={config.relativeValue}
                    onChange={(value: number) =>
                      setWaterTankConfig((prevState) => {
                        const newState = [...prevState];
                        newState[index].relativeValue = value;
                        return newState;
                      })
                    }
                    onAfterChange={(value: number) =>
                      setWaterTankConfig((prevState) => {
                        const newState = [...prevState];
                        newState[index].temperature = value;
                        return newState;
                      })
                    }
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

export default WaterTankWidget;
