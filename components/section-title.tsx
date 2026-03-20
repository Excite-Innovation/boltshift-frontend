import { cn } from "@/lib/utils";

type titleProps = {
  alt: string;
  icon: string;
  title: string;
  className?: string;
};

export function SectionTitle({ alt, icon, title, className }: titleProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="w-8 h-8 flex items-center justify-center">
        <img src={icon} alt={alt} />
      </div>

      <span className="h-8 font-semibold text-2xl">{title}</span>
    </div>
  );
}
