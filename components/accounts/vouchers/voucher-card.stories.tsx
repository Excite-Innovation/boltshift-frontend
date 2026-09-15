import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { VoucherCard } from "@/components/accounts/vouchers/voucher-card";

const meta = {
  title: "Components/Accounts/Vouchers/VoucherCard",
  component: VoucherCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    imageSrc: "/account/voucher/Delivery-truck.png",
    imageAlt: "Delivery truck voucher",
    code: "CO-4321-8765",
    discount: "40% off Shipping",
    minimumSpend: 5000,
    expiryDate: "15th Aug, 2023",
  },
} satisfies Meta<typeof VoucherCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[420px] max-w-[calc(100vw-2rem)]">
      <VoucherCard {...args} />
    </div>
  ),
};

export const LongDiscountLabel: Story = {
  args: {
    discount: "65% off Ladies Innerwear and Seasonal Essentials",
    minimumSpend: 25000,
    expiryDate: "20th Jan, 2026",
  },
  render: (args) => (
    <div className="w-[420px] max-w-[calc(100vw-2rem)]">
      <VoucherCard {...args} />
    </div>
  ),
};

export const CustomImageAlt: Story = {
  args: {
    imageSrc: "/account/voucher/Watch.png",
    imageAlt: "Luxury watch voucher",
    discount: "5% off Watches",
    minimumSpend: 65000,
    expiryDate: "18th Nov, 2026",
  },
  render: (args) => (
    <div className="w-[420px] max-w-[calc(100vw-2rem)]">
      <VoucherCard {...args} />
    </div>
  ),
};
