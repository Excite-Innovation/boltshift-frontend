import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "@/components/ui/input-group";
import { Search } from "lucide-react";

export function NavbarSearch() {
  return (
    <Field
      orientation="horizontal"
      className="w-full max-w-250.5 h-12 flex"
    >
      <InputGroup className="h-12 flex items-center justify-center bg-[#F5F5F5] border-none rounded-lg">
        <InputGroupInput
          type="search"
          placeholder="What are you looking for today?"
          className="flex-1 min-w-0 placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base"
        />

        <InputGroupAddon>
          <Search />
        </InputGroupAddon>

        <InputGroupAddon align="inline-end" className="  ">
          <InputGroupButton
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
