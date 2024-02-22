import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export type Log = {
  id: number;
  dateTime: Date;
  message: string;
  deviceName: string;
  status: string;
};

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "dateTime",
    header: () => {
      return (
        <Button variant="ghost">
          Timestamp
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "device",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Device
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
];
