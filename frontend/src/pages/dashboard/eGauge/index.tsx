import { useEffect, useState, useRef } from "react";
import { readSSEResponse } from "./eGaugeDataRequester";
import useEGaugeConfigStore from "./store";
import EGaugePanel from "./eGaugePanel";
import { Plus } from "lucide-react";

import type { Config, eGaugeData, eGaugeDataStream } from "./eGaugeTypes";

interface eGaugePanel {
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
  const [eGaugeInfo, seteGaugeInfo] = useState<eGaugePanel[]>(
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
    <div className="relative flex w-full flex-col rounded-lg bg-white p-4 ring-1 ring-gray-100">
      <h2 className="text-xl font-medium">EGauge Summary</h2>
      <p className="text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </p>

      <div className="mx-auto mt-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {eGaugeInfo.map((eGaugeInstance, i) => (
          <EGaugePanel
            key={eGaugeInstance.config.name}
            index={i}
            data={eGaugeInstance.data}
          />
        ))}

        <button
          type="button"
          className="relative flex w-full items-center justify-center gap-x-2 rounded-lg border-2 border-dashed border-gray-300 py-4 text-center hover:border-gray-400 focus:outline-none sm:flex-col sm:gap-x-0 sm:py-0"
        >
          <Plus
            aria-hidden="true"
            className="h-4 w-4 text-center sm:h-5 sm:w-5"
          />
          <span className="block text-sm font-medium text-gray-900 sm:mt-2">
            New source
          </span>
        </button>
      </div>
    </div>
  );
};

export default ChartCarousel;
