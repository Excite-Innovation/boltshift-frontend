import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AvatarProfile } from "@/components/avatar/avatar";
import { Button } from "@/components/ui/button";
import { DropdownWrapper } from "@/components/user-profile/dropdown-wrapper";
import {
  DesktopGuestUser,
  MobileGuestUser,
  ProfileDropdown,
} from "@/components/user-profile/user-profile-dropdown";

const meta = {
  title: "Components/UserProfile/ProfileDropdown",
  component: ProfileDropdown,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProfileDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

function ProfileDropdownStory({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <DropdownWrapper
      defaultOpen={defaultOpen}
      trigger={
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 rounded-full border-2 p-0"
          aria-label="Open profile menu"
        >
          <AvatarProfile />
        </Button>
      }
    >
      <ProfileDropdown />
    </DropdownWrapper>
  );
}

export const Default: Story = {
  render: () => <ProfileDropdownStory />,
};

export const Open: Story = {
  render: () => <ProfileDropdownStory defaultOpen />,
};

export const Fullscreen: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="flex min-h-screen w-full items-start justify-end bg-muted/30 p-8">
      <ProfileDropdownStory defaultOpen />
    </div>
  ),
};

export const DesktopGuest: Story = {
  render: () => (
    <div className="w-64">
      <DesktopGuestUser />
    </div>
  ),
};

export const MobileGuest: Story = {
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <div className="flex h-screen w-full justify-end bg-muted/30">
      <MobileGuestUser />
    </div>
  ),
};
