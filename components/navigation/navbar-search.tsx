import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

export function NavbarSearch() {
  return (
    <Field orientation="horizontal">
      <InputGroup className="max-w-xs">
        <InputGroupInput placeholder="What are you looking for today?" />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <Button>Search</Button>
    </Field>
  );
}
