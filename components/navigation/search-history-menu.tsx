"use client";

import { History, X } from "lucide-react";

import { Button } from "@/components/ui/button";

type SearchHistoryMenuProps = {
  items: string[];
  onSelect: (searchTerm: string) => void;
  onRemove: (searchTerm: string) => void;
};

export function SearchHistoryMenu({
  items,
  onSelect,
  onRemove,
}: SearchHistoryMenuProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg bg-background p-3 shadow-[0_12px_32px_rgba(15,23,42,0.16)]">
      <ul
        aria-label="Search history"
        className="max-h-[min(36rem,calc(60vh-8rem))] overflow-y-auto"
      >
        {items.map((searchTerm) => (
          <li
            key={searchTerm}
            className="group/history-item flex min-h-9 items-center rounded-md hover:bg-accent focus-within:bg-accent"
          >
            <Button
              type="button"
              variant="ghost"
              onClick={() => onSelect(searchTerm)}
              className="h-auto min-w-0 flex-1 justify-start gap-2 rounded-md bg-transparent px-2 py-2 text-sm hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <History
                className="size-6 shrink-0 text-foreground"
                aria-hidden="true"
              />
              <span className="truncate font-medium">{searchTerm}</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => onRemove(searchTerm)}
              className="size-8 shrink-0 text-muted-foreground opacity-0 transition-opacity hover:text-foreground focus-visible:opacity-100 group-hover/history-item:opacity-100 group-focus-within/history-item:opacity-100"
              aria-label={`Remove ${searchTerm} from search history`}
            >
              <X className="size-5" aria-hidden="true" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
