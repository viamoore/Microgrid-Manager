import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const options = [
  { value: "1 seconds", label: "1 seconds" },
  { value: "2 seconds", label: "2 seconds" },
  { value: "3 seconds", label: "3 seconds" },
  { value: "5 seconds", label: "5 seconds" },
  { value: "10 seconds", label: "10 seconds" },
  { value: "30 seconds", label: "30 seconds" },
  { value: "1 minute", label: "1 minute" },
  { value: "2 minute", label: "2 minute" },
  { value: "5 minute", label: "5 minute" },
];

export default function ConfigPage() {
  return (
    <Tabs defaultValue="general" className="relative mr-auto w-full pt-2">
      <div className="flex flex-col items-center justify-between pb-3">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="log">Log</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="w-full max-w-2xl px-6 pt-6">
          <div>
            <h3 className="text-lg font-medium">Device name</h3>
            <p className="text-gray-500">
              Set the device name to something more meaningful.
            </p>

            <div className="mt-4 flex items-center gap-x-4">
              <Input placeholder="Device name" />
              <Button>Update</Button>
            </div>
          </div>

          <Separator className="mb-6 mt-8" />

          <div>
            <h3 className="text-lg font-medium">Permissions</h3>
            <p className="text-gray-500">
              Set device permissions required to access the device. These
              credentials will be required to access the device and update
              permissions once set.
            </p>

            <div className="mt-4 flex items-center gap-x-4">
              <Input placeholder="Username" />
              <Input placeholder="Password" />
              <Button>Update</Button>
            </div>
          </div>

          <Separator className="mb-6 mt-8" />

          <div>
            <h3 className="text-lg font-medium">Outlink</h3>
            <p className="text-gray-500">
              Link to the dashboard of the device.
            </p>

            <div className="mt-4 flex items-center gap-x-4">
              <Input placeholder="Outlink" type="url" />
              <Button>Update</Button>
            </div>
          </div>

          <Separator className="mb-6 mt-8" />

          <div>
            <h3 className="text-lg font-medium">Device status</h3>
            <p className="text-gray-500">
              Used to toggle the device on or off.
            </p>

            <div className="mt-4 flex items-center gap-x-4">
              <Button variant="destructive">Turn off</Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="log" className="w-full max-w-2xl px-6 pt-6">
          <div>
            <h3 className="text-lg font-medium">Log frequency</h3>
            <p className="text-gray-500">How often data should be logged.</p>

            <div className="mt-4 flex items-center gap-x-4">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Frequency</SelectLabel>
                    {options.map((option) => (
                      <SelectItem value={option.value} key={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button>Update</Button>
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
