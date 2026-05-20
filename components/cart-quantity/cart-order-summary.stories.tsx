import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { OrderSummary } from "@/components/cart-quantity/cart-order-summary";
import { CheckoutProductCard } from "@/components/checkout/checkout-product-spec";
import { GetProductItems } from "@/lib/product-items";

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

const products = GetProductItems();
const sampleItems = [
  { product: products[0], quantity: 1 },
  { product: products[1], quantity: 2 },
].filter(({ product }) => product);

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const CheckoutPanel: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="flex min-h-screen w-full items-start justify-center bg-muted/30 p-8">
      <OrderSummary items={sampleItems} />
    </div>
  ),
};

export const WithChildren: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="flex min-h-screen w-full items-start justify-center bg-muted/30 p-8">
      <OrderSummary items={sampleItems}>
        <div className="flex flex-col">
          {sampleItems.map(({ product, quantity }) => (
            <CheckoutProductCard
              key={product.id}
              product={product}
              quantity={quantity}
            />
          ))}
        </div>
      </OrderSummary>
    </div>
  ),
};
