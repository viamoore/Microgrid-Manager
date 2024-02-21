import React, { useState, useLayoutEffect } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const MIN_SIZE_IN_PIXELS = 100;

const CoreLayout = ({ children }: { children: React.ReactNode }) => {
  const [minSize, setMinSize] = useState(10);

  useLayoutEffect(() => {
    const panelGroup: HTMLDivElement | null = document.querySelector(
      '[data-panel-group-id="layout"]',
    );
    const resizeHandles: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      "[data-panel-resize-handle-id]",
    );
    if (!panelGroup) return;

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
    <div className="flex h-auto min-h-screen w-full font-display">
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
        <ResizableHandle className="bg-gray-100" />
        <ResizablePanel
          order={1}
          className="flex min-h-screen w-full flex-col justify-between"
        >
          <div className="h-screen w-full bg-gray-100 py-2 pr-2">
            <div className="flex h-full min-h-full max-w-7xl flex-col overflow-y-scroll rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
              <Header />
              {children}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CoreLayout;
