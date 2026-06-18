"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VoucherCodeInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onAdd?: () => void;
  placeholder?: string;
}

export function VoucherCodeInput({
  value = "",
  onChange,
  onAdd,
  placeholder = "Enter a Voucher Code",
}: VoucherCodeInputProps) {
  return (
    <div className="w-full grid gap-1">
      <Label
        htmlFor="voucher-code"
        className="text-sm font-medium text-muted-foreground"
      >
        Voucher Code
      </Label>

      <div className="flex w-full pl-3 gap-2 overflow-hidden rounded-lg border">
        <Input
          id="voucher-code"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="border-0 rounded-none shadow-none focus-visible:ring-0"
        />

        <Button
          type="button"
          onClick={onAdd}
          className="rounded-none"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
