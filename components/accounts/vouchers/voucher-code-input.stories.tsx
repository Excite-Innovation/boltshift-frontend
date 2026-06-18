import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { VoucherCodeInput } from "@/components/accounts/vouchers/voucher-code-input";

const meta = {
  title: "Components/Accounts/Vouchers/VoucherCodeInput",
  component: VoucherCodeInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    value: "",
    placeholder: "Enter a Voucher Code",
  },
} satisfies Meta<typeof VoucherCodeInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[420px] max-w-[calc(100vw-2rem)]">
      <VoucherCodeInput {...args} />
    </div>
  ),
};

export const Filled: Story = {
  args: {
    value: "CO-4321-8765",
  },
  render: (args) => (
    <div className="w-[420px] max-w-[calc(100vw-2rem)]">
      <VoucherCodeInput {...args} />
    </div>
  ),
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Paste voucher code here",
  },
  render: (args) => (
    <div className="w-[420px] max-w-[calc(100vw-2rem)]">
      <VoucherCodeInput {...args} />
    </div>
  ),
};
