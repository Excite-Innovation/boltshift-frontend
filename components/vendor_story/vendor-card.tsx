import { Vendor } from "@/lib/type";

type VendorCardProps = {
  vendor: Vendor;
};

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={vendor.name}
      className="group w-16 h-21 flex flex-col gap-1 items-center cursor-pointer outline-none"
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-full border border-border overflow-hidden flex items-center justify-center group-hover:ring-2 group-hover:ring-ring group-focus-visible:ring-2 group-focus-visible:ring-ring transition-all duration-100 ease-out">
        <img src={vendor.icon} alt={`${vendor.name}'s icon`} />
      </div>

      {/* Label */}
      <span className="w-16 h-4 max-w-32 text-center text-xs truncate transition-colors duration-100 ease-out group-hover:text-primary group-focus-visible:text-primary">
        {vendor.name}
      </span>
    </div>
  );
}
