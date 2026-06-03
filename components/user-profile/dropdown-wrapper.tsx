import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownWrapperProps extends React.ComponentProps<
  typeof DropdownMenu
> {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function DropdownWrapper({
  trigger,
  children,
  ...props
}: DropdownWrapperProps) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 overflow-hidden rounded-xl bg-background p-0"
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
