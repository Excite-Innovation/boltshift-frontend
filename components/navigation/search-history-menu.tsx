"use client";

import { History, X } from "lucide-react";

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
    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[min(28rem,calc(100vh-10rem))] overflow-y-auto rounded-lg bg-background p-3 shadow-[0_12px_32px_rgba(15,23,42,0.16)]">
      <ul className="flex flex-col gap-1" aria-label="Search history">
        {items.map((searchTerm) => (
          <li key={searchTerm} className="flex min-h-9 items-center gap-2">
            <button
              type="button"
              onClick={() => onSelect(searchTerm)}
              className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <History
                className="size-6 shrink-0 text-foreground"
                aria-hidden="true"
              />
              <span className="truncate">{searchTerm}</span>
            </button>
            <button
              type="button"
              onClick={() => onRemove(searchTerm)}
              className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Remove ${searchTerm} from search history`}
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
