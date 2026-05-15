import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { OrderSummary } from "@/components/cart-quantity/cart-order-summary";

const meta = {
  title: "Components/CartQuantity/OrderSummary",
  component: OrderSummary,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OrderSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CheckoutPanel: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="flex min-h-screen w-full items-start justify-center bg-muted/30 p-8">
      <OrderSummary />
    </div>
  ),
};
