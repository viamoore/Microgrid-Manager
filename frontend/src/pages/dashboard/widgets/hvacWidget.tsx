import { useEffect, useState } from "react";

import { Slider } from "antd";
import { SliderMarks } from "antd/es/slider";
import { hvac } from "@/components/widget/svgImports";

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

const HVACWidget = () => {
  const [hvacConfig, setHVACConfig] = useState<HVACConfig[]>([]);
  useEffect(() => {
    // Make API call to get the config
    setHVACConfig(mockHVACConfig);
  }, []);

  return (
    <section className="relative flex h-full w-full flex-col rounded-lg bg-white p-4 ring-1 ring-gray-100">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">HVAC</h2>

        <div className="flex items-center gap-x-2.5">
          <span className="text-lg font-medium">
            {hvacData?.temperature}°{hvacData?.unit}
          </span>
          <img src={hvac} className="h-8 w-8" />
        </div>
      </div>

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
    </section>
  );
};

export default HVACWidget;
