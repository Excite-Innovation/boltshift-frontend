import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CartPage from "@/app/cart/page";
import { SidebarProvider } from "@/components/ui/sidebar";

const CART_STORAGE_KEY = "boltshift:cart";

function seedCart(items: Array<{ productId: number; quantity: number }>) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

function CartPageCanvas({
  cartItems,
}: {
  cartItems: Array<{ productId: number; quantity: number }>;
}) {
  seedCart(cartItems);

  return (
    <SidebarProvider>
      <div className="w-full px-6">
        <CartPage />
      </div>
    </SidebarProvider>
  );
}

const meta = {
  title: "Pages/Cart",
  component: CartPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CartPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilledCart: Story = {
  render: () => (
    <CartPageCanvas
      cartItems={[
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
      ]}
    />
  ),
};

export const EmptyCart: Story = {
  render: () => <CartPageCanvas cartItems={[]} />,
};
