"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type SelectListProps = {
  list: string[];
};

export function SelectList({ list }: SelectListProps) {
  const [item, setItem] = useState<string>(list.length ? list[0] : "");

  return (
    <Select value={item} onValueChange={setItem}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent position="popper" className="max-h-60 overflow-auto">
        <SelectGroup>
          {list.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
