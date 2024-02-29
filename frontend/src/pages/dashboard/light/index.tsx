import { useEffect, useState } from "react";
import { cx } from "class-variance-authority";
import { Button } from "@/components/ui/button";

const LightSystem = ({ battery }: { battery: number }) => {
  const [systemState, setSystemState] = useState(0);

  // calculate
  useEffect(() => {
    setSystemState(battery);
  }, [battery]);

  return (
    <div
      className={cx(
        systemState > 60 && "from-green-700 to-green-400",
        systemState > 40 &&
          systemState <= 60 &&
          "from-yellow-700 to-yellow-400",
        systemState > 20 &&
          systemState <= 40 &&
          "from-orange-800 to-orange-500",
        systemState <= 20 && "from-red-800 to-red-500",
        "bg-gradient-to-br px-8 pb-12 pt-16 text-white shadow-md",
      )}
    >
      <h2 className="text-5xl font-semibold">Looking good</h2>
      <div className="mt-2 flex flex-col">
        <span className="text-lg">
          Battery: <span className="font-medium">{battery}%</span>
        </span>
        <span className="text-lg font-medium">Connected to grid</span>
      </div>

      <div className="mt-4 flex gap-x-4 text-black">
        <Button variant="outline" size="sm">
          Data view
        </Button>
        <Button variant="outline" size="sm">
          More info
        </Button>
      </div>
    </div>
  );
};

export default LightSystem;
