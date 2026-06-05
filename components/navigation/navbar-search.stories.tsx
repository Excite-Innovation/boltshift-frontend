import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { NavbarSearch } from "@/components/navigation/navbar-search";

const meta = {
  title: "Components/Navigation/NavbarSearch",
  component: NavbarSearch,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavbarSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

function SearchCanvas() {
  return (
    <div className="min-h-screen bg-muted/30 p-6 sm:p-8">
      <div className="flex min-h-24 items-start rounded-lg border bg-background p-4 shadow-sm">
        <NavbarSearch />
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <SearchCanvas />,
};
