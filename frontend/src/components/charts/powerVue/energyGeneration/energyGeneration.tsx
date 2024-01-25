import { useState } from "react";
import { DatePicker, Radio, RadioChangeEvent } from "antd";
import dayjs from "dayjs";
import EnergyUsageChart from "./overviewEnergyChart";

const EnergyUsage = () => {
  // const [data, setData] = useState([]);
  const [active, setActive] = useState("date");
  const [dateFormat, setDateFormat] = useState("YYYY-MM-DD");
  const [dateTime, setDateTime] = useState(dayjs());

  const handleActive = (event: RadioChangeEvent) => {
    setActive(event.target.value);
    switch (event.target.value) {
      case "date":
        setDateFormat("YYYY-MM-DD");
        setDateTime(dayjs().startOf("day"));
        break;
      case "month":
        setDateFormat("YYYY-MM");
        setDateTime(dayjs().startOf("month"));
        break;
      case "year":
        setDateFormat("YYYY");
        setDateTime(dayjs().startOf("year"));
        break;
      case "total":
        setDateFormat("----");
        break;
    }
  };

  return (
    <div className="flex h-full min-h-[500px] w-full flex-col p-2">
      <div className="text-lg">Energy Generation</div>
      <div className="my-2 h-0.5 border-t border-black" />
      <div className="mb-4 mt-2 flex w-full justify-between">
        <Radio.Group value={active} onChange={handleActive}>
          <Radio.Button value="date">Day</Radio.Button>
          <Radio.Button value="month">Month</Radio.Button>
          <Radio.Button value="year">Year</Radio.Button>
          <Radio.Button value="total">Total</Radio.Button>
        </Radio.Group>
        <DatePicker
          value={dateTime}
          format={dateFormat}
          onChange={(date) => setDateTime(date ? date : dateTime)}
          picker={active as "date" | "week" | "month" | "year" | undefined}
          disabled={active === "total"}
        />
      </div>
      <EnergyUsageChart />
    </div>
  );
};

export default EnergyUsage;
