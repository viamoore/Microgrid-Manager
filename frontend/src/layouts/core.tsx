import { useState, useLayoutEffect } from "react";

import { Content } from "antd/es/layout/layout";
import RoutesProvider from "../routes/routes";
import { Header, Sidebar } from "../components";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const MIN_SIZE_IN_PIXELS = 100;

const CoreLayout = () => {
  const [minSize, setMinSize] = useState(10);

  useLayoutEffect(() => {
    const panelGroup = document.querySelector('[data-panel-group-id="layout"]');
    const resizeHandles = document.querySelectorAll(
      "[data-panel-resize-handle-id]",
    );
    const observer = new ResizeObserver(() => {
      let width = panelGroup.offsetWidth;

      resizeHandles.forEach((resizeHandle) => {
        width -= resizeHandle.offsetWidth;
      });

      // Minimum size in pixels is a percentage of the PanelGroup's width,
      // less the (fixed) width of the resize handles.
      setMinSize((MIN_SIZE_IN_PIXELS / width) * 100);
    });
    observer.observe(panelGroup);
    resizeHandles.forEach((resizeHandle) => {
      observer.observe(resizeHandle);
    });

    return () => {
      observer.unobserve(panelGroup);
      resizeHandles.forEach((resizeHandle) => {
        observer.unobserve(resizeHandle);
      });
      observer.disconnect();
    };
  }, []);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="font-display flex h-auto min-h-screen w-full">
      <ResizablePanelGroup direction="horizontal" id="layout">
        <ResizablePanel
          order={0}
          minSize={minSize}
          defaultSize={20}
          maxSize={25}
          collapsible={true}
          collapsedSize={Math.floor(minSize)}
          onCollapse={() => setCollapsed(true)}
          onExpand={() => setCollapsed(false)}
        >
          <Sidebar collapsed={collapsed} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          order={1}
          className="flex min-h-screen w-full flex-col justify-between"
        >
          <div className="h-screen w-full bg-gray-100 p-2">
            <div className="h-full w-full overflow-y-scroll rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
              <Header />
              <RoutesProvider />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CoreLayout;
