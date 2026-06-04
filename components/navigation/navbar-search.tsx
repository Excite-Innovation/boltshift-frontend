"use client";

import {
  type KeyboardEvent,
  type SyntheticEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchHistoryMenu } from "@/components/navigation/search-history-menu";
import { Search } from "lucide-react";

const SEARCH_HISTORY = [
  "Wireless headphones",
  "Bluetooth speakers under $50",
  "Samsung Galaxy S23 phone case",
  "4K smart TV 55-inch",
  "Running shoes size 10",
  "Coffee maker with grinder",
  "Organic skincare products",
  "Laptop backpack waterproof",
  "Gaming mouse RGB",
  "Electric standing desk",
];

export function NavbarSearch() {
  const id = useId();
  const router = useRouter();
  const searchRef = useRef<HTMLFormElement>(null);
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState(SEARCH_HISTORY);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!searchRef.current?.contains(event.target as Node)) {
        setIsHistoryOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  function searchProducts(value: string) {
    const trimmedValue = value.trim();
    const url = trimmedValue
      ? `/catalog?q=${encodeURIComponent(trimmedValue)}`
      : "/catalog";

    setIsHistoryOpen(false);
    router.push(url);
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    searchProducts(query);
  }

  function handleHistorySelect(searchTerm: string) {
    setQuery(searchTerm);
    searchProducts(searchTerm);
  }

  function handleHistoryRemove(searchTerm: string) {
    setHistory((currentHistory) =>
      currentHistory.filter((historyItem) => historyItem !== searchTerm)
    );
  }

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key === "Escape") {
      setIsHistoryOpen(false);
    }
  }

  return (
    <form
      ref={searchRef}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      role="search"
      className="relative w-full max-w-250.5"
    >
      <Field orientation="horizontal" className="h-12 flex">
        <label htmlFor={id} className="sr-only">
          Search products
        </label>

        <InputGroup className="h-12 flex items-center justify-center bg-[#F5F5F5] border-none rounded-lg">
          <InputGroupInput
            id={id}
            name="q"
            type="search"
            autoComplete="on"
            placeholder="What are you looking for today?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsHistoryOpen(true)}
            onClick={() => setIsHistoryOpen(true)}
            className="flex-1 min-w-0 placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base"
          />

          <InputGroupAddon>
            <Search aria-hidden="true" />
          </InputGroupAddon>

          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="submit"
              variant="default"
              className="w-17.25 h-12 py-2 px-3 rounded-l-none rounded-r-lg -mr-1.25"
            >
              Search
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>

      {isHistoryOpen ? (
        <SearchHistoryMenu
          items={history}
          onSelect={handleHistorySelect}
          onRemove={handleHistoryRemove}
        />
      ) : null}
    </form>
  );
}
