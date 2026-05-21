import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PaymentCard } from "@/components/payment-card/payment-card";
import { paymentCardExamples } from "@/components/payment-card/lib/payment-card-examples";

const meta = {
  title: "Components/PaymentCard",
  component: PaymentCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    cards: paymentCardExamples,
    defaultSelectedCardId: paymentCardExamples[1].id,
    step: 4,
    title: "Payment Card",
  },
} satisfies Meta<typeof PaymentCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[760px] max-w-[calc(100vw-2rem)]">
      <PaymentCard {...args} />
    </div>
  ),
};

export const PrimarySelected: Story = {
  args: {
    defaultSelectedCardId: paymentCardExamples[0].id,
  },
  render: (args) => (
    <div className="w-[760px] max-w-[calc(100vw-2rem)]">
      <PaymentCard {...args} />
    </div>
  ),
};

export const SingleCard: Story = {
  args: {
    cards: [paymentCardExamples[0]],
    defaultSelectedCardId: paymentCardExamples[0].id,
  },
  render: (args) => (
    <div className="w-[380px] max-w-[calc(100vw-2rem)]">
      <PaymentCard {...args} />
    </div>
  ),
};
