import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DropdownWrapperProps extends React.ComponentProps<
  typeof DropdownMenu
> {
  trigger: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
}

export function DropdownWrapper({
  trigger,
  children,
  contentClassName,
  ...props
}: DropdownWrapperProps) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={cn(
          "overflow-hidden rounded-xl bg-background p-0",
          !contentClassName && "w-64",
          contentClassName,
        )}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
