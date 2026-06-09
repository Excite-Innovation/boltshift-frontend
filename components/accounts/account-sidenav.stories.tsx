import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AccountSidenav } from "@/components/accounts/account-sidenav";

const meta = {
  title: "Components/Accounts/AccountSidenav",
  component: AccountSidenav,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AccountSidenav>;

export default meta;
type Story = StoryObj<typeof meta>;

function AccountSidenavCanvas({ withContent = false }: { withContent?: boolean }) {
  return (
    <>
      <style>
        {`
          @media (min-width: 640px) {
            .account-sidenav-story > aside {
              display: flex !important;
            }
          }
        `}
      </style>
      <div className="account-sidenav-story flex min-h-screen w-full bg-background">
        <AccountSidenav />
        {withContent && (
          <main className="min-w-0 flex-1 p-6">
            <div className="h-full rounded-lg border border-dashed" />
          </main>
        )}
      </div>
    </>
  );
}

export const Default: Story = {
  render: () => <AccountSidenavCanvas />,
};

export const WithContent: Story = {
  render: () => <AccountSidenavCanvas withContent />,
};
