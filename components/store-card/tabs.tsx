import { StoreContent } from "@/components/store-card/store-content";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Store } from "lucide-react";

export function TabsLine() {
  return (
    <Tabs defaultValue="home" className="w-full grid gap-12">
      <TabsList variant="line" className="flex gap-3">
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="women">Women’s Fashion</TabsTrigger>
        <TabsTrigger value="men">Men’s Fashion</TabsTrigger>
        <TabsTrigger value="boys">Boy’s Fashion</TabsTrigger>
        <TabsTrigger value="girls">Girls Fashion</TabsTrigger>
        <TabsTrigger value="baby">Baby</TabsTrigger>
        <TabsTrigger value="home-kitchen">Home & Kitchen</TabsTrigger>
        <TabsTrigger value="games">Video Games</TabsTrigger>
        <TabsTrigger value="electronics">Electronics</TabsTrigger>
      </TabsList>

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
    </Tabs>
  );
}