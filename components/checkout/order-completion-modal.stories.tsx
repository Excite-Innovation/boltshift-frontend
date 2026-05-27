import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { OrderCompletionModal } from "@/components/checkout/order-completion-modal";

const meta = {
  title: "Components/Checkout/OrderCompletionModal",
  component: OrderCompletionModal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    open: true,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OrderCompletionModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="min-h-screen w-full bg-muted/40">
      <OrderCompletionModal {...args} />
    </div>
  ),
};
