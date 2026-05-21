import type { Meta, StoryObj } from "@storybook/react";

import { DeliveryMethodCard } from "@/components/checkout/delivery-method-card";
import { RadioGroup } from "@/components/ui/radio-group";

const meta: Meta<typeof DeliveryMethodCard> = {
  title: "Components/Checkout/DeliveryMethodCard",
  component: DeliveryMethodCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DeliveryMethodCard>;

export const Default: Story = {
  render: () => (
    <RadioGroup className="w-104" defaultValue="">
      <DeliveryMethodCard value="free-delivery" />
    </RadioGroup>
  ),
};

export const Hovered: Story = {
  render: () => (
    <RadioGroup className="w-104" defaultValue="">
      <DeliveryMethodCard value="free-delivery" forceHover />
    </RadioGroup>
  ),
};

export const Selected: Story = {
  render: () => (
    <RadioGroup className="w-104" defaultValue="free-delivery">
      <DeliveryMethodCard value="free-delivery" />
    </RadioGroup>
  ),
};

export const States: Story = {
  render: () => (
    <RadioGroup className="w-md bg-muted p-4" defaultValue="selected">
      <DeliveryMethodCard value="default" />
      <DeliveryMethodCard value="hovered" forceHover />
      <DeliveryMethodCard value="selected" />
    </RadioGroup>
  ),
};
