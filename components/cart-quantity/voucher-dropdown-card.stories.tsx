import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { VoucherDropdownMenu } from "@/components/cart-quantity/voucher-dropdown-card";

const meta = {
  title: "Components/CartQuantity/VoucherDropdownCard",
  component: VoucherDropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VoucherDropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-11">
      <VoucherDropdownMenu />
    </div>
  ),
};

export const Fullscreen: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="flex min-h-screen w-full items-start justify-center bg-muted/30 p-8">
      <div className="h-11">
        <VoucherDropdownMenu />
      </div>
    </div>
  ),
};
