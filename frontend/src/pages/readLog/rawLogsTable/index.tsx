import { type Log, columns } from "./columns";
import { DataTable } from "./dataTable";

const getData = (): Log[] => {
  const mockLogData: Log[] = [];

  for (let i = 1; i <= 50; i++) {
    const dateTime = new Date();
    mockLogData.push({
      id: i,
      dateTime: new Date(dateTime.getTime() + 30 * 1000 * i),
      message: `Log ${i}`,
      deviceName: `Device ${i}`,
      status: `Status ${i}`,
    });
  }

  return mockLogData;
};

export default function RawLogsTable() {
  const data = getData();

  return (
    <div className="pb-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
