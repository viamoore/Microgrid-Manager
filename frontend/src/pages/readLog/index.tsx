import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import RawLogsTable from "./rawLogsTable";

const LogPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-y-4 p-6">
      <h1 className="text-2xl font-semibold">Raw logs</h1>

      <Alert variant="destructive">
        <AlertTitle>Work in progress</AlertTitle>
        <AlertDescription>Add details here</AlertDescription>
      </Alert>

      <RawLogsTable />
    </div>
  );
};

export default LogPage;
