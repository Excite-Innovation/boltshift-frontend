import { Vendor } from "@/lib/type";

type VendorCardProps = {
  vendor: Vendor;
};

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <div className="group w-16 h-21 flex flex-col gap-1 items-center cursor-pointer">
      <div className="w-16 h-16 rounded-full border border-border overflow-hidden flex items-center justify-center group-hover:ring-2 group-hover:ring-ring">
        <img src={vendor.icon} alt={`${vendor.name}'s icon`} />
      </div>

      <span className="w-16 h-4 max-w-32 text-center text-xs group-hover:text-primary truncate">
        {vendor.name}
      </span>
    </div>
  );
}