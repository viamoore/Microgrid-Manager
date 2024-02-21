export interface WeatherData {
  detailedForecast: string;
  dewpoint: {
    unitCode: string;
    value: number;
  };
  endTime: string;
  isDaytime: boolean;
  name: string;
  probabilityOfPrecipitation: {
    unitCode: string;
    value: number | null;
  };
  relativeHumidity: {
    unitCode: string;
    value: number;
  };
  shortForecast: string;
  startTime: string;
  temperature: number;
  temperatureUnit: string;
  windDirection: string;
  windSpeed: string;
}
