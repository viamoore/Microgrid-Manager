import { Bell } from "lucide-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b px-6 py-3">
      <div>Header</div>
      <div>
        <div className="rounded-full p-2 ring-1 ring-gray-50">
          <Bell aria-label="Notifications" className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default Header;
