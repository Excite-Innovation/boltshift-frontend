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
    defaultHideCardNumbers: true,
    step: 4,
    title: "Payment Card",
  },
} satisfies Meta<typeof PaymentCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-190 max-w-[calc(100vw-2rem)]">
      <PaymentCard {...args} />
    </div>
  ),
};

export const PrimarySelected: Story = {
  args: {
    defaultSelectedCardId: paymentCardExamples[0].id,
  },
  render: (args) => (
    <div className="w-190 max-w-[calc(100vw-2rem)]">
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
    <div className="w-95 max-w-[calc(100vw-2rem)]">
      <PaymentCard {...args} />
    </div>
  ),
};

export const NoCards: Story = {
  args: {
    cards: [],
    defaultSelectedCardId: "",
  },
  render: (args) => (
    <div className="w-95 max-w-[calc(100vw-2rem)]">
      <PaymentCard {...args} />
    </div>
  ),
};

export const CustomMerchant: Story = {
  args: {
    cards: [
      {
        ...paymentCardExamples[0],
        id: "boltshift-wallet",
        brand: "Boltshift",
        backgroundColor: "#075e54",
        merchantName: "M-Pesa Global",
        number: "5188 9231 7740 1159",
      },
      {
        ...paymentCardExamples[1],
        id: "market-card",
        brand: "MarketPay",
        backgroundColor: "#6d28d9",
        merchantName: "Boltshift",
        number: "4929 1804 5568 9072",
      },
    ],
    defaultSelectedCardId: "market-card",
  },
  render: (args) => (
    <div className="w-190 max-w-[calc(100vw-2rem)]">
      <PaymentCard {...args} />
    </div>
  ),
};

export const NumbersVisible: Story = {
  args: {
    defaultHideCardNumbers: false,
  },
  render: (args) => (
    <div className="w-190 max-w-[calc(100vw-2rem)]">
      <PaymentCard {...args} />
    </div>
  ),
};
