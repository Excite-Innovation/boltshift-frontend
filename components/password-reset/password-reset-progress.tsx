import { cn } from "@/lib/utils";

type PasswordResetProgressProps = {
  step: 1 | 2 | 3 | 4;
};

export function PasswordResetProgress({ step }: PasswordResetProgressProps) {
  const activeIndex = step - 1;

  return (
    <div className="flex justify-center gap-2">
      {[0, 1, 2, 3].map((index) => (
        <span
          key={index}
          className={cn(
            "h-1.5 w-7.5 rounded-full",
            index <= activeIndex ? "bg-primary" : "bg-muted",
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
