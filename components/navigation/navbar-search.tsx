import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

export function NavbarSearch() {
  return (
    <Field
      orientation="horizontal"
      className="w-full max-w-[1002px] h-12 min-w-[320px] flex"
    >
      <InputGroup className="h-12 flex items-center justify-center bg-[#F5F5F5] border-none rounded-lg">
        <InputGroupInput
          placeholder="What are you looking for today?"
          className="flex-grow"
        />

        <InputGroupAddon>
          <Search />
        </InputGroupAddon>

        <InputGroupAddon align="inline-end" className="  ">
          <Button className="w-[69px] h-11 py-2 px-3 rounded-l-none rounded-r-lg -mr-[3px]">
            Search
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
