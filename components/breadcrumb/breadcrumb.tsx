import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbItemType = {
  label: string;
  href?: string;
};

type BreadcrumbComponentProps = {
  items: BreadcrumbItemType[];
};

export function BreadcrumbComponent({ items }: BreadcrumbComponentProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="p-4 sm:gap-4">
        <BreadcrumbItem>
          <BreadcrumbLink href="/"><Home /></BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <span key={index} className="contents">
              <BreadcrumbSeparator className="[&>svg]:size-4" />

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-sm font-medium">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href || "#"}>
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
