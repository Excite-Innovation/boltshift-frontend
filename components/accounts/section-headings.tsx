import { cn } from "@/lib/utils";

type sectionProps = {
  icon: string;
  alt: string;
  title: String;
};

export function SectionHeadings({ icon, alt, title }: sectionProps) {
  return (
    <div className={cn("flex items-center gap-2")}>
      <div className="flex items-center justify-center">
        <img src={icon} alt={alt} className="w-6 h-6" />
      </div>

      <span className="h-8 font-semibold text-2xl">{title}</span>
    </div>
  );
}
