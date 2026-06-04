import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Bell } from "lucide-react";

import { NotificationDrawer } from "@/components/notification/notification-drawer";
import { Button } from "@/components/ui/button";
import { DropdownWrapper } from "@/components/user-profile/dropdown-wrapper";

const meta = {
  title: "Components/Notification/NotificationDrawer",
  component: NotificationDrawer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NotificationDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

function NotificationDropdownStory({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
}) {
  return (
    <DropdownWrapper
      defaultOpen={defaultOpen}
      contentClassName="w-[480px] border-0 shadow-xl"
      trigger={
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
          aria-label="Open notifications"
        >
          <Bell className="size-6 stroke-[1.5]" aria-hidden="true" />
        </Button>
      }
    >
      <NotificationDrawer />
    </DropdownWrapper>
  );
}

export const Default: Story = {};

export const Empty: Story = {
  args: {
    variant: "empty",
  },
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <div className="w-full max-w-[480px]">
      <NotificationDrawer {...args} />
    </div>
  ),
};

export const Open: Story = {
  render: () => <NotificationDropdownStory defaultOpen />,
};

export const Fullscreen: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="flex min-h-screen w-full items-start justify-end bg-muted/30 p-8">
      <NotificationDropdownStory defaultOpen />
    </div>
  ),
};
