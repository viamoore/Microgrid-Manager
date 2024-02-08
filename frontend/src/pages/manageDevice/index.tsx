import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Plus } from "lucide-react";

const mockDevices = [
  {
    id: 0,
    name: "Device name",
    description: "Device description",
    imageUrl: "",
    status: "Active",
  },
  {
    id: 1,
    name: "Device name",
    description: "Device description",
    imageUrl: "",
    status: "Active",
  },
  {
    id: 2,
    name: "Device name",
    description: "Device description",
    imageUrl: "",
    status: "Active",
  },
  {
    id: 3,
    name: "Device name",
    description: "Device description",
    imageUrl: "",
    status: "Active",
  },
  {
    id: 4,
    name: "Device name",
    description: "Device description",
    imageUrl: "",
    status: "Active",
  },
];

export default function ManageDevicePage() {
  return (
    <div className="flex h-full w-full flex-col gap-y-4 p-6">
      <h1 className="text-2xl font-semibold">Device Management</h1>

      <Alert variant="destructive">
        <AlertTitle>Work in progress</AlertTitle>
        <AlertDescription>Add details here</AlertDescription>
      </Alert>

      <div>
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              Running devices
            </dt>
            <dt className="mt-2 space-y-0.5 text-sm">
              <div className="flex items-center gap-x-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />{" "}
                <span>Running: 2</span>
              </div>
              <div className="flex items-center gap-x-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500" />{" "}
                <span>Offline: 0</span>
              </div>
            </dt>
          </div>

          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              Device status
            </dt>
            <dt className="mt-2 space-y-0.5 text-sm">
              <div className="flex items-center gap-x-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />{" "}
                <span>Normal: 2</span>
              </div>
              <div className="flex items-center gap-x-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />{" "}
                <span>Warning: 0</span>
              </div>
              <div className="flex items-center gap-x-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500" />{" "}
                <span>Critical: 0</span>
              </div>
            </dt>
          </div>
        </dl>
      </div>

      <div className="mt-5 pb-6">
        <h2 className="text-lg font-medium leading-6 text-gray-900">Devices</h2>

        <ul
          role="list"
          className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <li className="opacity-85 col-span-1 flex flex-col rounded-lg border-2 border-dashed border-gray-200 bg-white text-center hover:border-gray-300 hover:opacity-100 focus:outline-none">
            <button
              type="button"
              className="relative flex h-full w-full flex-col items-center justify-center rounded-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
                <Plus />
              </div>
              <h3 className="mt-4 text-sm text-gray-900">Enroll new device</h3>
            </button>
          </li>

          {mockDevices.map((device) => (
            <li
              key={device.id}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
            >
              <div className="flex flex-1 flex-col p-8">
                <img
                  className="mx-auto h-32 w-32 flex-shrink-0 rounded-full bg-gray-50 shadow-sm ring-1 ring-gray-300"
                  src={device.imageUrl}
                  alt=""
                />
                <h3 className="mt-6 text-sm font-medium text-gray-900">
                  {device.name}
                </h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dt className="sr-only">Description</dt>
                  <dd className="text-sm text-gray-500">
                    {device.description}
                  </dd>
                  <dt className="sr-only">Status</dt>
                  <dd className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {device.status}
                    </span>
                  </dd>
                </dl>
              </div>
              {/* <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${device.email}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  Email
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`tel:${device.telephone}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  Call
                </a>
              </div>
            </div>
          </div> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
