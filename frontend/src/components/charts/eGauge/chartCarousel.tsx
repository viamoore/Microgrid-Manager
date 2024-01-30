import { useEffect, useState, useRef } from "react";
import { readSSEResponse } from "./eGaugeDataRequester";
import useEGaugeConfigStore from "./store";

import PanelChart from "./panelChart";

import type { Config, eGaugeData, eGaugeDataStream } from "./eGaugeTypes";

interface ChartCarouselProps {
  height?: number;
  width?: number;
}

interface eGaugePannel {
  config: Config;
  data: eGaugeData[];
}

const firstLoadData = async (time: string, source: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/egaugetime?time=${time}&dataname=${source}`,
    );
    const data = await response.json();

    const dataWithDateObjects = data.map((item: eGaugeData) => ({
      ...item,
      dateTime: new Date(item.dateTime),
    }));

    return dataWithDateObjects;
  } catch (error) {
    return [];
  }
};

const ChartCarousel: React.FC<ChartCarouselProps> = () => {
  const { config } = useEGaugeConfigStore();

  const [eGaugeInfo, seteGaugeInfo] = useState<eGaugePannel[]>(
    config.map((eGaugeConfig: Config) => {
      return { config: eGaugeConfig, data: [] as eGaugeData[] };
    }),
  );
  const [eGaugeSources] = useState(
    config.map((eGaugeConfig: Config) => {
      return eGaugeConfig.source;
    }),
  );

  const eventSourceRef = useRef<EventSource | null>(null);

  // Load the data for the first time
  useEffect(() => {
    eGaugeSources.forEach((source) => {
      const eGaugeInstance = eGaugeInfo.find(
        (eGaugeInstance) => eGaugeInstance.config.source === source,
      );
      if (!eGaugeInstance) return;
      firstLoadData(
        eGaugeInstance.config.period,
        eGaugeInstance.config.source,
      ).then((data) => {
        seteGaugeInfo((prevInfo) => {
          const updatedInfo = prevInfo.map((eGaugeInstance) => {
            if (eGaugeInstance.config.source === source) {
              return {
                ...eGaugeInstance,
                data: data,
              };
            }
            return eGaugeInstance;
          });
          return updatedInfo;
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eGaugeSources]);

  // Create EventSource and read data from it
  useEffect(() => {
    if (!eventSourceRef.current) {
      eventSourceRef.current = readSSEResponse(
        new URL("http://localhost:8080/egauge"),
      );
      eventSourceRef.current.onmessage = (event) => {
        const parsedData: eGaugeDataStream = JSON.parse(event.data);
        const dateTime = new Date(parsedData.dateTime);
        eGaugeSources.forEach((source) => {
          const dataEntry = parsedData[source];
          const data = {
            dateTime: dateTime,
            value: dataEntry as number,
            unit: "W",
          };
          seteGaugeInfo((prevInfo) => {
            const updatedInfo = prevInfo.map((eGaugeInstance) => {
              if (eGaugeInstance.config.source === source) {
                return {
                  ...eGaugeInstance,
                  data: [...eGaugeInstance.data, data],
                };
              }
              return eGaugeInstance;
            });
            return updatedInfo;
          });
        });
      };
    }

    // Clean up the EventSource when the component is unmounted
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [eGaugeSources]);

  useEffect(() => {
    console.log(config);
  }, [config]);

  return (
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      {eGaugeInfo.map((eGaugeInstance, i) => (
        <PanelChart
          key={eGaugeInstance.config.name}
          index={i}
          data={eGaugeInstance.data}
        />
      ))}
    </dl>
  );
};

export default ChartCarousel;
