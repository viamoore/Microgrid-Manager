import { useState, useEffect } from "react";

import { weatherIcons } from "@/components/widget/svgImports";

interface WeatherData {
  detailedForecast: string;
  icon: string;
  id: number;
  name: string;
  number: number;
  probabilityOfPrecipitation: {
    unitCode: string;
    value: number | null;
  };
  shortForecast: string;
  startTime: string;
  temperature: number;
}

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/weather")
      .then((response) => response.json())
      .then((data) => setWeatherData(data));
  }, []);

  return (
    <section className="relative flex h-full w-full flex-col rounded-lg bg-white p-4 ring-1 ring-gray-100">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Weather</h2>

        <img
          src={
            weatherIcons[
              weatherData[0]?.shortForecast?.toLowerCase().includes("rain")
                ? "sunny-rainy-medium"
                : "sunny"
            ]
          }
          className="absolute right-0 top-0 m-2.5 h-10 w-10"
        />
      </div>

      <div className="mt-4 flex flex-col items-center sm:mt-10 lg:mt-6">
        <div>
          {weatherData
            .filter((_, index) => index % 2 === 0)
            .map((data, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <img
                  src={data.icon}
                  className="h-44 w-44 rounded-full bg-gray-100 shadow-sm ring-1 ring-gray-200 lg:h-32 lg:w-32"
                />
                <div className="mt-4 text-center sm:mt-10 lg:mt-4">
                  <p className="text-xs text-gray-600">
                    {new Date(data.startTime).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </p>
                  <p className="text-lg font-medium">{data.temperature}°F</p>
                  <p className="text-sm font-medium text-gray-500">
                    {data.shortForecast}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default WeatherWidget;
