"use client";

import { ChevronDown } from "lucide-react";

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
import { ButtonGroup } from "@/components/ui/button-group";
import { Label } from "@/components/ui/label";

export function OrderSummary() {
  return (
    <Card className="w-84 p-6 border rounded-xl flex flex-col gap-8">
      <CardHeader className="py-2 px-0">
        <CardTitle className="flex items-center gap-1 text-2xl font-semibold">
          <img
            src="/section-title-icons/Clipboard.svg"
            alt="Clipboard icon"
            className="h-8 w-8"
          />
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="w-72 p-0 flex flex-col gap-4">
        <div className="w-full py-1 flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>
            Kshs. <span className="font-semibold text-sm text-foreground">92,372</span>
          </span>
        </div>

        <div className="w-full py-1 flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>
            Kshs. <span className="font-semibold text-sm text-foreground">54,436</span>
          </span>
        </div>

        <div className="w-full py-1 flex justify-between text-muted-foreground">
          <span>Tax</span>
          <span>
            Kshs. <span className="font-semibold text-sm text-foreground">63,073 (14%)</span>
          </span>
        </div>

        {/* Voucher */}
        <div className="space-y-2">
          <Label htmlFor="voucher-code" className="text-muted-foreground">
            Voucher Code
          </Label>
          <ButtonGroup className="h-11 w-full overflow-hidden rounded-lg border">
            <Input
              id="voucher-code"
              placeholder="Add a voucher"
              className="h-full rounded-lg"
            />

            <Button type="button" className="h-full rounded-none px-5">
              Select
              <ChevronDown className="size-5" />
            </Button>
          </ButtonGroup>
        </div>

        {/* Discount */}
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Discount</span>
          <span>
            Kshs. <span className="font-semibold text-sm text-foreground">80,020 (7%)</span>
          </span>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="w-full p-0 flex flex-col gap-8">
        {/* Total */}
        <div className="w-full py-1 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>Kshs. 70,977</span>
        </div>

        {/* Checkout */}
        <Button size="lg" className="w-full">Check Out →</Button>
      </CardFooter>
    </Card>
  );
}
