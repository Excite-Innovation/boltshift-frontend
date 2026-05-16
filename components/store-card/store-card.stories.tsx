import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FeaturedStoreCard } from "@/components/store-card/store-card";
import { Toaster } from "@/components/ui/sonner";

function FeaturedStoreCardCanvas() {
  return (
    <div className="min-h-screen w-full bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <FeaturedStoreCard />
      </div>
      <Toaster />
    </div>
  );
}

const meta = {
  title: "Components/StoreCard/FeaturedStoreCard",
  component: FeaturedStoreCard,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FeaturedStoreCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FeaturedStoreCardCanvas />,
};
