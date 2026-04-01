import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PopularCardContent } from "@/components/popular-products/content";
import { Separator } from "@/components/ui/separator";

const CategoryTabs = {
  feature: "Feature Products",
  topRated: "Top Rated Products",
  onsale: "Onsale Products",
};

export function PopularProductsCard() {
  const defaultValue = Object.keys(CategoryTabs)[0];

  return (
    <Tabs defaultValue={defaultValue} className="gap-10">
      <TabsList variant="line" className="h-8 gap-3 overflow-x-scroll scroll-smooth scrollbar-hide">
        {Object.entries(CategoryTabs).map(([key, label]) => (
          <TabsTrigger
            key={key}
            value={key}
            className="hover:cursor-pointer data-[state=active]:primary data-[state=active]:text-primary dark:data-[state=active]:text-primary hover:text-primary dark:hover:text-primary after:bg-primary"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      <Separator className="-mt-10" />

      <TabsContent value="feature">
        <PopularCardContent />
      </TabsContent>

      <TabsContent value="topRated">
        <PopularCardContent />
      </TabsContent>

      <TabsContent value="onsale">
        <PopularCardContent />
      </TabsContent>
    </Tabs>
  );
}
