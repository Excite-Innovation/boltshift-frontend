import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AccountSidenav } from "@/components/accounts/account-sidenav";
import { OrdersDashboard } from "@/components/accounts/orders/orders-dashboard";

const meta = {
  title: "Components/Accounts/Orders/OrdersDashboard",
  component: OrdersDashboard,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OrdersDashboard>;

export default meta;

type Story = StoryObj<typeof meta>;

function OrdersDashboardCanvas() {
  return (
    <div className="flex flex-col gap-4 pb-12 lg:flex-row">
      <AccountSidenav />
      <main className="min-w-0 flex-1 p-6">
        <OrdersDashboard />
      </main>
    </div>
  );
}

export const Default: Story = {
  render: () => <OrdersDashboardCanvas />,
};

export const OrderTable: Story = {
  render: () => (
    <main className="min-w-0 flex-1 p-6">
      <OrdersDashboard />
    </main>
  ),
};
