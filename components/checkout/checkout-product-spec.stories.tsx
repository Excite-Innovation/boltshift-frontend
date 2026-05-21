import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CheckoutProductCard } from "@/components/checkout/checkout-product-spec";
import { GetProductItems } from "@/lib/product-items";

const meta = {
  title: "Components/Checkout/CheckoutProductCard",
  component: CheckoutProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CheckoutProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const [product] = GetProductItems();

export const Default: Story = {
  args: {
    product,
    quantity: 1,
  },
};

export const Panel: Story = {
  args: {
    product,
    quantity: 2,
  },
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="flex min-h-screen w-full items-start justify-center bg-muted/30 p-8">
      <CheckoutProductCard product={product} quantity={2} />
    </div>
  ),
};
