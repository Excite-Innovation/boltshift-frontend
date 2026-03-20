import { useId } from "react";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

export function NavbarSearch() {
  const id = useId();

  return (
    <Field orientation="horizontal" className="w-full max-w-250.5 h-12 flex">
      <label htmlFor={id} className="sr-only">
        Search products
      </label>

      <InputGroup className="h-12 flex items-center justify-center bg-[#F5F5F5] border-none rounded-lg">
        <InputGroupInput
          id={id}
          name="search"
          type="search"
          autoComplete="on"
          placeholder="What are you looking for today?"
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
  );
}
