import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeliveryMethodCard } from "@/components/checkout/delivery-method-card";
import { RadioGroup } from "@/components/ui/radio-group";

export function ShippingMethodCard() {
  return (
    <Card className="w-full py-4 flex flex-col gap-8 border-0 shadow-none">
      <CardHeader className="flex gap-4 px-0 items-center">
        {/* Title */}
        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-lg font-semibold text-card">
          3
        </div>

        <CardTitle className="text-lg font-semibold">
          Shipping Method
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <RadioGroup className="flex flex-wrap justify-start gap-8">
          <DeliveryMethodCard
            value="free-delivery"
            iconSrc="/delivery-method/Bicycle.svg"
            title="Free Delivery Kshs 0"
            description="5 – 7 Days Delivery"
          />
          <DeliveryMethodCard
            value="standard-delivery"
            iconSrc="/delivery-method/Delivery-truck.svg"
            title="Standard Delivery Kshs 70,721"
            description="3 – 4 Days Delivery"
          />
          <DeliveryMethodCard
            value="express-delivery"
            iconSrc="/delivery-method/Rocket.svg"
            title="Express Delivery Kshs 120,000"
            description="Same day – 2 Days Delivery"
          />
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
