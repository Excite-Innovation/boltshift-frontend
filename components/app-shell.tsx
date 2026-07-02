"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { SidebarProvider } from "@/components/ui/sidebar";

type AppShellProps = Readonly<{
  children: ReactNode;
}>;

const AUTH_ROUTES = new Set(["/sign-in", "/sign-up"]);

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isAuthRoute = pathname ? AUTH_ROUTES.has(pathname) : false;

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-360 m-auto p-4 md:px-4 md:pb-4 md:pt-0">
      <SidebarProvider>{children}</SidebarProvider>
    </div>
  );
}
