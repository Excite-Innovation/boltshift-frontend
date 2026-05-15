"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function OrderSummary() {
  return (
    <Card className="w-84 p-6 border rounded-xl flex flex-col gap-8 md:flex-row">
      <CardHeader className="py-2 px-4">
        <CardTitle className="flex items-center gap-1 text-2xl font-semibold">
          <img
            src="/section-title-icons/Clipboard.svg"
            alt="Clipboard icon"
            className="h-8 w-8"
          />
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="w-72 flex flex-col gap-4">
        <div className="w-full py-1 flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>Kshs. 92,372</span>
        </div>

        <div className="w-full py-1 flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>Kshs. 54,436</span>
        </div>

        <div className="w-full py-1 flex justify-between text-muted-foreground">
          <span>Tax</span>
          <span>Kshs. 63,073 (14%)</span>
        </div>

        {/* Voucher */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input placeholder="CO-4321-8765" />

            <Select>
              <SelectTrigger className="w-27.5">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voucher1">Voucher 1</SelectItem>
                <SelectItem value="voucher2">Voucher 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Discount */}
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Discount</span>
          <span>Kshs. 80,020 (7%)</span>
        </div>
      </CardContent>

      <Separator />

      <CardFooter>
        {/* Total */}
        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>Kshs. 70,977</span>
        </div>

        {/* Checkout */}
        <Button>Check Out →</Button>
      </CardFooter>
    </Card>
  );
}
