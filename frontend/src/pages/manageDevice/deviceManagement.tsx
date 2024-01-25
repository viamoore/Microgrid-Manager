const DeviceManagement = () => {
  return (
    <div className="flex h-full w-full flex-col p-4">
      <h1 className="mb-4 w-full rounded-sm bg-yellow-400 p-2 text-red-600">
        WORK IN PROGRESS
      </h1>
      <div className="flex w-full flex-row justify-evenly">
        <div className="mx-4 flex h-32 w-full rounded-xl border bg-green-200 p-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-base font-semibold">Device Active</h1>
            <h2 className="flex gap-2 text-gray-700">
              <span className="block h-5 w-5 rounded-sm bg-green-500" />
              <span>Running</span>
              <span>- 2</span>
            </h2>
            <h2 className="flex gap-2 text-gray-700">
              <span className="block h-5 w-5 rounded-sm bg-red-500" />
              <span>Offline</span>
              <span>- 0</span>
            </h2>
          </div>
        </div>
        <div className="mx-4 flex h-32 w-full rounded-xl border bg-green-200 p-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-semibold">Device Status</h1>
            <h2 className="flex gap-2 text-gray-700">
              <span className="block h-5 w-5 rounded-sm bg-green-500" />
              <span>Normal</span>
              <span>- 2</span>
            </h2>
            <h2 className="flex gap-2 text-gray-700">
              <span className="block h-5 w-5 rounded-sm bg-yellow-500" />
              <span>Warning</span>
              <span>- 0</span>
            </h2>
            <h2 className="flex gap-2 text-gray-700">
              <span className="block h-5 w-5 rounded-sm bg-red-500" />
              <span>Critical</span>
              <span>- 0</span>
            </h2>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-wrap items-start justify-start gap-2 p-4">
        <div className="flex h-72 w-64 flex-col items-center rounded-md border p-4">
          <button className="flex aspect-square h-1/3 justify-center rounded-full bg-blue-400 text-7xl text-white">
            +
          </button>
          <h1 className="mt-4 text-lg text-gray-600">Enroll Device</h1>
        </div>
        <div className="flex h-72 w-64 flex-col items-center rounded-md border p-4">
          <div className="flex h-1/2 w-full items-center justify-center">
            <img src="" alt="" className="h-full w-1/2" />
          </div>
          <h1>Device Name</h1>
          <h2>Short Description</h2>
          <h2 className="mt-auto text-green-500">Status</h2>
        </div>
        <div className="flex h-72 w-64 flex-col items-center rounded-md border p-4">
          <div className="flex h-1/2 w-full items-center justify-center">
            <img src="" alt="" className="h-full w-1/2" />
          </div>
          <h1>Device Name</h1>
          <h2>Short Description</h2>
          <h2 className="mt-auto text-green-500">Status</h2>
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement;
