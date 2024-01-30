import { Carousel } from "antd";
import { useEffect, useState, useRef } from "react";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import PanelChart from "./panelChart";
import { useMicrogrid } from "../../../context/useMicrogridContext";
import { readSSEResponse } from "./eGaugeDataRequester";
import { Config, eGaugeData, eGaugeDataStream } from "./eGaugeTypes";
import useEGaugeConfigStore from "./store";

interface ChartCarouselProps {
  height?: number;
  width?: number;
}

interface eGaugePannel {
  config: Config;
  data: eGaugeData[];
}

const PADDING_Y = 16;
const PADDING_X = 5;

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

const ChartCarousel: React.FC<ChartCarouselProps> = ({
  height = 300,
  width = 330,
}) => {
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

  const [divs, setDivs] = useState<JSX.Element[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const resizeObserver = useRef<ResizeObserver | undefined>(undefined);
  const [carouselWidth, setCarouselWidth] = useState(0);
  // const { config } = useMicrogrid();
  const eventSourceRef = useRef<EventSource | null>(null);

  // const [eGaugeInfo, seteGaugeInfo] = useState<eGaugePannel[]>(
  //   config.chartCarouselConfigs.map((eGaugeConfig: Config) => {
  //     return { config: eGaugeConfig, data: [] as eGaugeData[] };
  //   }),
  // );

  // const [eGaugeSources] = useState(
  //   config.chartCarouselConfigs.map((eGaugeConfig: Config) => {
  //     return eGaugeConfig.source;
  //   }),
  // );

  // const updateSize = () => {
  //   if (carouselRef.current) {
  //     setCarouselWidth(carouselRef.current.offsetWidth);
  //   }
  // };

  // Make sure that the carousel is dependent on the size of the screen and its parent
  // useEffect(() => {
  //   const currentCarouselRef = carouselRef.current;
  //   resizeObserver.current = new ResizeObserver(updateSize);
  //   if (currentCarouselRef) {
  //     resizeObserver.current.observe(currentCarouselRef);
  //   }
  //   return () => {
  //     if (resizeObserver.current && currentCarouselRef) {
  //       resizeObserver.current.unobserve(currentCarouselRef);
  //     }
  //   };
  // }, []);

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

  // Loading the charts and the plus button
  // useEffect(() => {
  //   if (carouselRef.current) {
  //     const heightWithGap = height + PADDING_Y;
  //     const widthWithGap = width + PADDING_X;
  //     const noPlus = true; // False if you want to show the plus button on new slides
  //     const newDivArray: JSX.Element[] = [];
  //     const divsPerSlide = Math.max(
  //       1,
  //       Math.floor(carouselWidth / widthWithGap),
  //     );
  //     let divsInThisSlide: JSX.Element[] = [];
  //     eGaugeInfo.forEach((eGaugeInstance, index) => {
  //       divsInThisSlide.push(
  //         <PanelChart
  //           key={index}
  //           index={index}
  //           dataSet={eGaugeInstance.data}
  //           collapsed={isCollapsed}
  //         />,
  //       );
  //       if (divsInThisSlide.length === divsPerSlide) {
  //         newDivArray.push(
  //           <div
  //             key={`slide-${index}`}
  //             className="!flex flex-row justify-evenly p-2 pt-3"
  //           >
  //             {divsInThisSlide}
  //           </div>,
  //         );
  //         divsInThisSlide = [];
  //       }
  //     });

  //     if (divsInThisSlide.length > 0) {
  //       const fillerCount = divsPerSlide - divsInThisSlide.length;
  //       if (fillerCount > 0) {
  //         const fillerDivs = Array.from({ length: fillerCount }, (_, index) => (
  //           <div
  //             key={`filler-${index}`}
  //             className={`w-[${width}px] group flex items-center justify-center`}
  //           >
  //             <button className="h-8 w-20 rounded-full bg-white opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
  //               <PlusOutlined />
  //             </button>
  //           </div>
  //         ));
  //         divsInThisSlide = [...divsInThisSlide, ...fillerDivs];
  //         // noPlus = true;
  //       }
  //       newDivArray.push(
  //         <div
  //           key={`slide-${eGaugeInfo.length}`}
  //           className={`h-[${heightWithGap}px] !flex flex-row justify-evenly p-2 pt-3`}
  //         >
  //           {divsInThisSlide}
  //         </div>,
  //       );
  //     }

  //     if (!noPlus) {
  //       let divsInThisSlide: JSX.Element[] = [];
  //       for (let i = 0; i < divsPerSlide; i++) {
  //         const fillerDivs = Array.from(
  //           { length: divsPerSlide - divsInThisSlide.length },
  //           (_, index) => (
  //             <div
  //               key={`filler-${index}`}
  //               className="flex h-[300px] w-[330px] items-center justify-center"
  //             >
  //               {" "}
  //               <button className="h-16 w-16 rounded-full bg-white">
  //                 <PlusOutlined />
  //               </button>{" "}
  //             </div>
  //           ),
  //         );
  //         divsInThisSlide = [...divsInThisSlide, ...fillerDivs];
  //       }
  //       newDivArray.push(
  //         <div
  //           key={`slide-${2}`}
  //           className={`h-[${heightWithGap}px] !flex flex-row justify-evenly p-2 pt-3`}
  //         >
  //           {divsInThisSlide}
  //         </div>,
  //       );
  //     }

  //     setDivs(newDivArray);
  //   }
  // }, [carouselWidth, eGaugeInfo, height, isCollapsed, width]);

  return (
    // <div
    //   className="group relative col-span-full col-start-1 w-full rounded-md py-2 shadow-sm"
    //   ref={carouselRef}
    // >
    //   <div className="h-full w-full">
    //     <div className="carousel-parent">
    //       <Carousel className="pb-8">
    //         {divs.map((divElement) => divElement)}
    //       </Carousel>
    //     </div>
    //   </div>
    //   <div className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center opacity-0 transition-all duration-200 group-hover:opacity-100">
    //     <button
    //       className="h-full w-full rounded-full"
    //       onClick={() => setIsCollapsed(!isCollapsed)}
    //     >
    //       {isCollapsed ? <CaretDownOutlined /> : <CaretUpOutlined />}
    //     </button>
    //   </div>
    // </div>
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      {eGaugeInfo.map((eGaugeInstance, i) => (
        <PanelChart key={i} index={i} dataSet={eGaugeInstance.data} />
      ))}

      {/* {EGaugeConfig.map((eGaugeInstance, i) => (
        <PanelChart dataSet={eGaugeInstance} />
      ))} */}
    </dl>
  );
};

export default ChartCarousel;
