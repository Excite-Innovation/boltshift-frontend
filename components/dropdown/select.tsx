"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectListProps = {
  list: string[];
  value?: string;
  onValueChange?: (value: string) => void;
};

export function SelectList({ list, value, onValueChange }: SelectListProps) {
  const selectedItem = value ?? (list.length ? list[0] : "");

  return (
    <Select value={selectedItem} onValueChange={onValueChange}>
      <SelectTrigger className="w-full cursor-pointer">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent position="popper" className="max-h-60 overflow-auto">
        <SelectGroup>
          {list.map((opt) => (
            <SelectItem key={opt} value={opt} className="cursor-pointer">
              {opt}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
