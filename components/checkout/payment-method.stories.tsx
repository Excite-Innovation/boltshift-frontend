import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PaymentMethodCard } from "@/components/checkout/payment-method";

const meta = {
  title: "Components/Checkout/PaymentMethod",
  component: PaymentMethodCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PaymentMethodCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[760px] max-w-[calc(100vw-2rem)]">
      <PaymentMethodCard />
    </div>
  ),
};
