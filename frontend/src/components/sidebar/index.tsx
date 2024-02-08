import { useNavigate } from "react-router-dom";

import { cx } from "class-variance-authority";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChartBig,
  ChevronDown,
  ChevronUp,
  FileClock,
  Home,
  Link,
  Monitor,
  PackagePlus,
  Settings,
  SlidersHorizontal,
  UploadCloud,
  type LucideIcon,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    children: [],
  },
  {
    name: "Sol-Ark",
    href: "/sol-ark",
    icon: Monitor,
    children: [
      {
        name: "Data view",
        href: "/data%20view",
        icon: BarChartBig,
      },
      {
        name: "Configure",
        href: "/config",
        icon: SlidersHorizontal,
      },
      {
        name: "Link",
        href: "OUTLINK",
        icon: Link,
      },
    ],
  },
  {
    name: "eGauge",
    href: "/egauge",
    icon: Monitor,
    children: [
      {
        name: "Data view",
        href: "/data%20view",
        icon: BarChartBig,
      },
      {
        name: "Configure",
        href: "/config",
        icon: SlidersHorizontal,
      },
      {
        name: "Link",
        href: "OUTLINK",
        icon: Link,
      },
    ],
  },
  {
    name: "Add device",
    href: "/add%20device",
    icon: PackagePlus,
    children: [],
  },
  {
    name: "Backup cloud",
    href: "/backup%20cloud",
    icon: UploadCloud,
    children: [],
  },
  {
    name: "Log",
    href: "/log",
    icon: FileClock,
    children: [],
  },
];

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate();
  const pathname = window.location.pathname.toLowerCase();

  const handleNavigation = (href: string) => {
    if (href.includes("OUTLINK")) {
      window.open("http://google.com");
      return;
    }

    navigate(href);
  };

  return (
    <div className="h-full bg-gray-100 px-4 text-sm">
      <div
        className={cx(
          "flex items-center gap-x-2.5",
          collapsed ? "justify-center py-4" : "justify-start py-5",
        )}
      >
        <div
          className={cx(
            "rounded-full bg-gray-200 shadow-sm ring-1 ring-gray-200",
            collapsed ? "h-8 w-8" : "h-6 w-6",
          )}
        />
        {!collapsed && (
          <span className="whitespace-nowrap font-medium">
            Microgrid Manager
          </span>
        )}
      </div>
      <Separator />

      <div className="mt-5 h-full">
        {!collapsed && (
          <span className="text-xs tracking-wide text-gray-500">
            NAVIGATION
          </span>
        )}

        <ul
          className={cx(
            "relative mt-2 h-full",
            collapsed ? "space-y-2" : "space-y-1",
          )}
        >
          {navigation.map((navItem) => {
            if (navItem.children.length > 0) {
              return (
                <NavItemWithChildren
                  pathname={pathname}
                  collapsed={collapsed}
                  navItem={navItem}
                  handleNavigation={handleNavigation}
                />
              );
            }
            return (
              <NavItem
                pathname={pathname}
                collapsed={collapsed}
                navItem={navItem}
                handleNavigation={handleNavigation}
              />
            );
          })}

          <NavItem
            pathname={pathname}
            collapsed={collapsed}
            navItem={{
              name: "Settings",
              href: "/settings",
              icon: Settings,
              children: [],
            }}
            handleNavigation={handleNavigation}
            className={`absolute left-0 w-full cursor-pointer ${collapsed ? "bottom-24" : "bottom-32"}`}
          />
        </ul>
      </div>
    </div>
  );
};

const NavItem = ({
  pathname,
  collapsed,
  navItem,
  handleNavigation,
  className,
}: {
  pathname: string;
  collapsed: boolean;
  navItem: {
    name: string;
    href: string;
    icon: LucideIcon;
    children: { name: string; href: string; icon: LucideIcon }[];
  };
  handleNavigation: (href: string) => void;
  className?: string;
}) => {
  if (!collapsed) {
    return (
      <li
        key={navItem.name}
        className={cx(
          "cursor-pointer rounded-md px-3 py-1.5",
          (pathname.includes(navItem.href) && pathname !== "/") ||
            (pathname === "/" && navItem.href === "/dashboard")
            ? "bg-white font-medium text-black shadow-sm"
            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700",
          className,
        )}
        onClick={() => handleNavigation(navItem.href)}
      >
        <div className={cx("flex items-center justify-start gap-x-2")}>
          <navItem.icon className="h-4 w-4" />
          <span className="mt-0.5">{navItem.name}</span>
        </div>
      </li>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <li
            key={navItem.name}
            className={cx(
              "cursor-pointer rounded-md px-3 py-1.5",
              (pathname.includes(navItem.href) && pathname !== "/") ||
                (pathname === "/" && navItem.href === "/dashboard")
                ? "bg-white font-medium text-black shadow-sm"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700",
              className,
            )}
            onClick={() => handleNavigation(navItem.href)}
          >
            <div className={cx("flex items-center justify-center gap-x-2")}>
              <navItem.icon className="h-[18px] w-[18px]" />
            </div>
          </li>
        </TooltipTrigger>
        <TooltipContent side="right">{navItem.name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const NavItemWithChildren = ({
  pathname,
  collapsed,
  navItem,
  handleNavigation,
}: {
  pathname: string;
  collapsed: boolean;
  navItem: {
    name: string;
    href: string;
    icon: LucideIcon;
    children: { name: string; href: string; icon: LucideIcon }[];
  };
  handleNavigation: (href: string) => void;
}) => {
  if (!collapsed) {
    return (
      <Collapsible className="w-full">
        <CollapsibleTrigger className="group w-full">
          <li
            key={navItem.name}
            className={cx(
              "flex w-full items-center justify-between rounded-md px-3 py-1.5",
              pathname.includes(navItem.href)
                ? "bg-white font-medium text-black shadow-sm"
                : "text-gray-500",
            )}
          >
            <div className="flex items-center gap-x-2">
              <navItem.icon className="h-4 w-4" />
              <span className="mt-0.5">{navItem.name}</span>
            </div>

            <ChevronDown className="h-4 w-4 group-data-[state=closed]:hidden" />
            <ChevronUp className="h-4 w-4 group-data-[state=open]:hidden" />
          </li>
        </CollapsibleTrigger>
        <CollapsibleContent className="my-2 space-y-2 pl-9">
          {navItem.children.map((navItemChildren) => (
            <div
              key={`${navItem.href}${navItemChildren.href}`}
              role="link"
              className={cx(
                "flex cursor-pointer items-center gap-x-2",
                pathname === `${navItem.href}${navItemChildren.href}`
                  ? "font-medium"
                  : "text-gray-500",
              )}
              onClick={() =>
                handleNavigation(`${navItem.href}${navItemChildren.href}`)
              }
            >
              <navItemChildren.icon className="h-4 w-4" />

              <span className="mt-0.5">{navItemChildren.name}</span>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Menubar className="my-0 h-fit border-none bg-transparent px-0 py-0">
      <MenubarMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <MenubarTrigger
                className={cx(
                  "flex w-full items-center justify-center rounded-md px-3 py-1.5",
                  pathname.includes(navItem.href)
                    ? "bg-white font-medium text-black shadow-sm data-[state=open]:bg-white data-[state=open]:text-black"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700 data-[state=open]:bg-gray-50 data-[state=open]:text-gray-700",
                )}
              >
                <navItem.icon className="h-[18px] w-[18px]" />
              </MenubarTrigger>
            </TooltipTrigger>
            <TooltipContent side="right">{navItem.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <MenubarContent side="right">
          <span className="px-2 text-sm">{navItem.name}</span>

          <ul className="mt-1 space-y-1 px-2 text-sm">
            {navItem.children.map((navItemChildren) => (
              <li
                key={`${navItem.href}${navItemChildren.href}`}
                role="link"
                className={cx(
                  "flex cursor-pointer items-center gap-x-2",
                  pathname === `${navItem.href}${navItemChildren.href}`
                    ? "font-medium"
                    : "text-gray-500",
                )}
                onClick={() =>
                  handleNavigation(`${navItem.href}${navItemChildren.href}`)
                }
              >
                <navItemChildren.icon className="h-4 w-4" />

                <span className="mt-0.5">{navItemChildren.name}</span>
              </li>
            ))}
          </ul>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Sidebar;
