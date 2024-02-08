import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Bell, Boxes } from "lucide-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b px-6 py-[11px]">
      <div>Header</div>
      <div className="flex items-center gap-x-3">
        <Processes />
        <Notifications />
      </div>
    </div>
  );
};

const Processes = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-fit rounded-full px-2">
          <Boxes aria-label="Processes" className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="text-xs">
        <span className="font-medium">Processes</span>
        <div className="mt-1">
          <div className="py-2">
            <p>No running processes.</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Notifications = () => {
  const [notifs, setNotifs] = useState([
    "Expect heavy rainfull and low visability",
  ]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-fit rounded-full px-2">
          <Bell aria-label="Notifications" className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="text-xs">
        <span className="font-medium">Notifications</span>
        {notifs.length ? (
          <>
            <div className="mt-1">
              {notifs.map((notif) => (
                <div key={notif} className="rounded-sm bg-gray-50 px-2 py-2">
                  <p>{notif}</p>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setNotifs([])}
              size="sm"
              className="mt-4 w-full text-sm"
            >
              Clear
            </Button>
          </>
        ) : (
          <div className="mt-1 py-2">
            <p>No notifications.</p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Header;
