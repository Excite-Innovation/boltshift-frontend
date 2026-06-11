import type { Meta, StoryObj } from "@storybook/react";

import { EmptyOrderPage } from "@/components/accounts/orders/empty-order-page";
import { AccountSidenav } from "@/components/accounts/account-sidenav";

const meta: Meta<typeof EmptyOrderPage> = {
  title: "Components/Accounts/Orders/EmptyOrderPage",
  component: EmptyOrderPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof EmptyOrderPage>;

export const Default: Story = {
  render: () => <EmptyOrderPage />,
};

function WithSidebar() {
  return (
    <div className="flex flex-col gap-4 pb-12 lg:flex-row">
      <AccountSidenav />
      <main className="min-w-0 flex-1 p-6">
        <EmptyOrderPage />
      </main>
    </div>
  );
}

export const WithContent: Story = {
  render: () => <WithSidebar />,
};
