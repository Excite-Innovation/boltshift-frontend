import type { Meta, StoryObj } from "@storybook/react";
import { ShippingDetailsCard } from "@/components/checkout/shipping-details";

const meta: Meta<typeof ShippingDetailsCard> = {
  title: "Components/Checkout/ShippingDetailsCard",
  component: ShippingDetailsCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ShippingDetailsCard>;

export const Default: Story = {
  render: () => (
    <div className="w-258">
      <ShippingDetailsCard />
    </div>
  ),
};

export const Filled: Story = {
  render: () => (
    <div className="w-258">
      <ShippingDetailsCard />
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
      <ShippingDetailsCard />
    </div>
  ),
};
