import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormInputField } from "@/components/checkout/form-input-field";
import {
  CountryDropdown,
  type Country,
} from "@/components/ui/country-dropdown";
import { Label } from "@/components/ui/label";
import { countries } from "country-data-list";

const countryOptions = countries.all.filter(
  (country: Country) =>
    country.emoji && country.status !== "deleted" && country.ioc !== "PRK",
);

export function ShippingDetailsCard() {
  return (
    <Card className="w-full py-4 flex flex-col gap-8 border-0 shadow-none">
      <CardHeader className="flex gap-4 px-0 items-center">
        {/* Title */}
        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-lg font-semibold text-card">
          2
        </div>

        <CardTitle className="text-lg font-semibold">
          Shipping Details
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <form className="flex flex-wrap justify-start gap-8">
          {/* Office/Apartment Details */}
          <FormInputField
            id="home-address"
            label="Office/Apartment Details"
            type="text"
            placeholder="Enter your home/office address"
          />

          {/* Street Address */}
          <FormInputField
            id="street-address"
            label="Street Address"
            type="text"
            placeholder="Enter your street address"
          />

          {/* Country */}
          <div className="w-full max-w-104 flex flex-col gap-1 text-muted-foreground text-xs font-medium">
            <Label>Country</Label>
            <CountryDropdown
              options={countryOptions}
              placeholder="Select your country"
            />
          </div>

          {/* City/Town */}
          <FormInputField
            id="city-town"
            label="City/Town"
            type="text"
            placeholder="Enter your street address"
          />
        </form>
      </CardContent>
    </Card>
  );
}
