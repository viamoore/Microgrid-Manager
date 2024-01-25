import { Button } from "antd";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <span className="mb-4 text-2xl font-extrabold">Page Not Found</span>
      <Button>
        <Link to="/">Click to Return to Dashboard</Link>
      </Button>
    </div>
  );
};

export default Page404;
