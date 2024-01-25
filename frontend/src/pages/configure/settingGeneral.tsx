import { Button, Form, Input } from "antd";

type FieldType = {
  username?: string;
  password?: string;
};

const SettingGeneral = () => {
  const device = {
    status: true,
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex w-full flex-row justify-between p-2">
        <div className="flex w-full max-w-[60%] flex-col">
          <h1 className="text-xl font-bold">Device Name</h1>
          <h2 className="ml-2 mt-2 text-gray-400">
            Set the device name to something more meaningful.
          </h2>
        </div>
        <div className="mx-4 mr-4 flex w-full max-w-[40%] flex-col items-center gap-y-4 p-2">
          <Input placeholder="Device Name" className="" />
          <Button className="h-full rounded-3xl bg-gray-400 px-6 text-lg text-gray-100">
            Update
          </Button>
        </div>
      </div>
      <div className="my-2 h-0.5 border-t border-gray-200" />
      <div className="flex w-full flex-row justify-between p-2">
        <div className="flex w-full max-w-[60%] flex-col">
          <h1 className="text-xl font-bold">Permission</h1>
          <h2 className="ml-2 mt-2 text-gray-400">
            Set the device permission in order to access the device.
            <br />
            This is required to access the device and update permission.
          </h2>
        </div>
        <Form
          autoComplete="off"
          className="mx-4 mr-4 flex w-full max-w-[40%] flex-col items-center gap-y-1 p-2"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            className="w-full"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Password"
            name="password"
            className="w-full"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button className="h-full rounded-3xl bg-gray-400 px-6 text-lg text-gray-100">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="my-2 h-0.5 border-t border-gray-200" />
      <div className="flex w-full flex-row justify-between p-2">
        <div className="flex w-full max-w-[60%] flex-col">
          <h1 className="text-xl font-bold">Change Outlink</h1>
          <h2 className="ml-2 mt-2 text-gray-400">
            Link to the dashboard of the device.
          </h2>
        </div>
        <div className="mx-4 mr-4 flex w-full max-w-[40%] flex-col items-center gap-y-4 p-2">
          <Input placeholder="Outlink" />
          <Button className="h-full rounded-3xl bg-gray-400 px-6 text-lg text-gray-100">
            Update
          </Button>
        </div>
      </div>
      <div className="my-2 h-0.5 border-t border-gray-200" />
      <div className="flex w-full flex-row justify-between p-2">
        <div className="flex w-full max-w-[60%] flex-col">
          <h1 className="text-xl font-bold">Device Status</h1>
          <h2 className="ml-2 mt-2 text-gray-400">
            If you want to stop or start the device, click the button to the
            side.
          </h2>
        </div>
        <div className="mx-4 mr-4 flex w-full max-w-[40%] flex-col items-center justify-center">
          <Button className="h-fit rounded-3xl bg-gray-400 px-6 text-lg text-gray-100">
            {device.status ? "Turn Off" : "Turn On"}
          </Button>
        </div>
      </div>
      <div className="my-2 h-0.5 border-t border-gray-200" />
    </div>
  );
};

export default SettingGeneral;
