import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="flex h-full w-full flex-col gap-y-4 p-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <Alert variant="destructive">
        <AlertTitle>Work in progress</AlertTitle>
        <AlertDescription>Add details here</AlertDescription>
      </Alert>

      <div className="mx-auto w-full max-w-2xl pt-6">
        <div>
          <h3 className="text-lg font-medium">Notifications</h3>
          <p className="text-gray-500">
            Set the device permission in order to access the device.
            <br />
            This is required to access the device and update permission.
          </p>
        </div>

        <Separator className="mb-6 mt-8" />

        <div>
          <h3 className="text-lg font-medium">Clone database</h3>
          <p className="text-gray-500">Link to the dashboard of the device.</p>
        </div>

        <Separator className="mb-6 mt-8" />

        <div>
          <h3 className="text-lg font-medium">Clear database</h3>
          <p className="text-gray-500">
            If you want to stop or start the device, click the button to the
            side.
          </p>
        </div>
      </div>
    </div>
  );
}
