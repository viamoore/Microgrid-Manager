import { useEffect, useRef, useState } from "react";
import { Widget } from "../../interfaces/JSXTypes";
import { weatherIcons } from "./svgImports";

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

const WeatherWidget: React.FC<Widget> = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const parentRef = useRef<HTMLDivElement>(null);
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/weather")
      .then((response) => response.json())
      .then((data) => setWeatherData(data));
  }, []);

  useEffect(() => {
    if (weatherData.length !== 0 && parentRef && parentRef.current) {
      const parentWidth = parentRef.current.offsetWidth;
      const itemWidth = 100; // replace with the width of a single item
      setItemsCount(Math.floor(parentWidth / itemWidth));
    }
  }, [weatherData, parentRef.current?.offsetWidth]);

  return (
    <div className="group/internal hover:scale-101 pointer-events-auto flex transform flex-col rounded-md bg-slate-50 p-4 px-2 text-lg transition-all duration-300 ease-in-out hover:flex-grow">
      <div className="flex w-full items-center justify-between">
        <img
          src={
            weatherIcons[
              weatherData[0]?.shortForecast?.toLowerCase().includes("rain")
                ? "sunny-rainy-medium"
                : "sunny"
            ]
          }
          className="h-10 w-10"
        />
        <span className="mr-2 flex">
          <p className="mr-8">{weatherData[0]?.shortForecast}</p>
          <p>{weatherData[0]?.temperature}°F</p>
        </span>
      </div>
      <div className="pointer-events-none h-0 opacity-0 group-hover/internal:pointer-events-auto group-hover/internal:h-auto group-hover/internal:p-2 group-hover/internal:opacity-100">
        <div className="my-2 h-0.5 border-t border-black" />
        <div
          className="flex h-auto w-full flex-row justify-evenly"
          ref={parentRef}
        >
          {weatherData
            .splice(0, itemsCount * 2)
            .filter((_, index) => index % 2 === 0)
            .map((data, index) => (
              <div
                key={index}
                className="flex h-full w-20 flex-col items-center justify-center text-center text-sm"
              >
                <img src={data.icon} className="h-20 w-20" />
                <p>
                  {new Date(data.startTime).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </p>
                <p>{data.temperature}°F</p>
                <p className="text-xs">{data.shortForecast}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
