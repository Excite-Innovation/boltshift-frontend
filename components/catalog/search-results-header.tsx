import { ViewTransition } from "react";

interface SearchResultsHeaderProps {
  /** Total number of matching products. */
  count: number;
  /** The search query string. */
  query?: string;
}

/**
 * Displays a summary of search results.
 */
export function SearchResultsHeader({ count, query }: SearchResultsHeaderProps) {
  return (
    <ViewTransition
      key={`${count}-${query ?? ""}`}
      name="catalog-results-summary"
      share="auto"
      enter="auto"
      default="none"
    >
      <p className="flex gap-2.5 items-center basis-3/4">
        <span className="text-xs font-semibold text-muted-foreground md:text-sm lg:text-xl">
          <span className="hidden sm:inline">{count}</span>
          {query ? (
            <span className="hidden sm:inline"> results for the search of</span>
          ) : (
            <span className="hidden sm:inline"> products available</span>
          )}
        </span>
        {query && (
          <span className="hidden sm:inline text-xs font-semibold text-primary md:text-sm lg:text-xl">
            {query}
          </span>
        )}
      </p>
    </ViewTransition>
  );
}
