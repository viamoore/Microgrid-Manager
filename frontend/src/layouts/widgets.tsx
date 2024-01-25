import React from "react";
import { Widget, WidgetComponent } from "../interfaces/JSXTypes";

interface WidgetLayoutProps {
  widgets: React.ReactElement<Widget, WidgetComponent>[];
  className?: string;
}

const WidgetLayout: React.FC<WidgetLayoutProps> = ({
  widgets,
  className = "col-start-1 col-span-full",
}) => {
  return (
    <div
      className={`${className} group pointer-events-none col-span-full flex h-[500px] transform flex-col justify-evenly rounded-lg p-4 shadow-sm transition-all duration-300 ease-in-out`}
    >
      {widgets.map((widget, index) => (
        <React.Fragment key={index}>{widget}</React.Fragment>
      ))}
    </div>
  );
};

export default WidgetLayout;
