import { StoreContent } from "@/components/store-card/store-content";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const CategoryTabs = {
  home: "Home",
  women: "Women’s Fashion",
  men: "Men’s Fashion",
  boys: "Boy’s Fashion",
  girls: "Girls Fashion",
  baby: "Baby",
  "home-kitchen": "Home & Kitchen",
  games: "Video Games",
  electronics: "Electronics",
};

export function TabsLine() {
  const defaultValue = Object.keys(CategoryTabs)[0];
  return (
    <Tabs defaultValue={defaultValue} className="gap-12">
      <TabsList
        variant="line"
        className="h-8 gap-3 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide"
      >
        {Object.entries(CategoryTabs).map(([key, label]) => (
          <TabsTrigger
            key={key}
            value={key}
            className="flex-none! shrink-0 data-[state=active]:primary data-[state=active]:text-primary dark:data-[state=active]:text-primary hover:text-primary dark:hover:text-primary after:bg-primary"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      <Separator className="-mt-12" />

      <TabsContent value="home">
        <StoreContent />
      </TabsContent>

      <TabsContent value="women">
        <p>Women’s fashion items</p>
      </TabsContent>

      <TabsContent value="men">
        <p>Men’s fashion items</p>
      </TabsContent>

      <TabsContent value="boys">
        <p>Boy’s fashion items</p>
      </TabsContent>

      <TabsContent value="girls">
        <p>Girls fashion items</p>
      </TabsContent>

      <TabsContent value="baby">
        <p>Baby products</p>
      </TabsContent>

      <TabsContent value="home-kitchen">
        <p>Home & Kitchen items</p>
      </TabsContent>

      <TabsContent value="games">
        <p>Video games</p>
      </TabsContent>

      <TabsContent value="electronics">
        <p>Electronics</p>
      </TabsContent>

      <Separator className="-mb-8"/>
    </Tabs>
  );
}
