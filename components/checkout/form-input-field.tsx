import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormInputFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
};

export function FormInputField({
  id,
  label,
  type = "text",
  placeholder,
  className,
  inputClassName,
}: FormInputFieldProps) {
  return (
    <div
      className={cn(
        "w-full max-w-104 flex flex-col gap-1 text-muted-foreground text-xs font-medium",
        className,
      )}
    >
      <Label htmlFor={id}>{label}</Label>

      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={cn(
          "hover:ring-1 hover:ring-ring hover:ring-offset-2",
          inputClassName,
        )}
      />
    </div>
  );
}
