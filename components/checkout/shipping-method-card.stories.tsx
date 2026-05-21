import type { Meta, StoryObj } from "@storybook/react";

import { ShippingMethodCard } from "@/components/checkout/shipping-method-card";

const meta: Meta<typeof ShippingMethodCard> = {
  title: "Components/Checkout/ShippingMethodCard",
  component: ShippingMethodCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ShippingMethodCard>;

export const Default: Story = {
  render: () => (
    <div className="w-258">
      <ShippingMethodCard />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <div className="w-90">
      <ShippingMethodCard />
    </div>
  ),
};
