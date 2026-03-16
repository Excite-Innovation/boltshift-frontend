import { VendorsList } from "@/lib/vendors";
import { VendorCard } from "./vendor-card";

export function VendorScroller() {
  return (
    <div className="w-full h-26 pt-4 px-4 pb-1 overflow-x-auto flex gap-5 scrollbar-hide">
      {VendorsList.map((vendor) => (
        <div key={vendor.id} className="">
          <VendorCard vendor={vendor} />
        </div>
      ))}
    </div>
  );
}
