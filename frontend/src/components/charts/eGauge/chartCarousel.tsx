import { useEffect, useState, useRef } from "react";
import { readSSEResponse } from "./eGaugeDataRequester";
import useEGaugeConfigStore from "./store";

import PanelChart from "./panelChart";

import type { Config, eGaugeData, eGaugeDataStream } from "./eGaugeTypes";

interface eGaugePannel {
  config: Config;
  data: eGaugeData[];
}

const firstLoadData = async ({
  period,
  source,
}: {
  period: string;
  source: string;
}) => {
  try {
    const response = await fetch(
      `http://localhost:8080/egaugetime?time=${period}&dataname=${source}`,
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

const ChartCarousel: React.FC = () => {
  const { config } = useEGaugeConfigStore();
  const eGaugeSources = config.map((eGaugeConfig: Config) => {
    return eGaugeConfig.source;
  });

  const [dataLoaded, setDataLoaded] = useState(false);
  const [eGaugeInfo, seteGaugeInfo] = useState<eGaugePannel[]>(
    config.map((eGaugeConfig: Config) => {
      return { config: eGaugeConfig, data: [] as eGaugeData[] };
    }),
  );

  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Load the data for the first time
    if (!dataLoaded) {
      eGaugeSources.forEach((source) => {
        const eGaugeInstance = eGaugeInfo.find(
          (eGaugeInstance) => eGaugeInstance.config.source === source,
        );
        if (!eGaugeInstance) return;

        firstLoadData({
          period: eGaugeInstance.config.period,
          source: eGaugeInstance.config.source,
        }).then((data) => {
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

      setDataLoaded(true);
      return;
    }

    // Create EventSource and read data from it
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
  }, [eGaugeSources, dataLoaded]);

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
