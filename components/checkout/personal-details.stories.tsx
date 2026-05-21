import type { Meta, StoryObj } from "@storybook/react";

import { PersonalDetailsCard } from "@/components/checkout/personal-details";

const meta: Meta<typeof PersonalDetailsCard> = {
  title: "Components/Checkout/PersonalDetailsCard",
  component: PersonalDetailsCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof PersonalDetailsCard>;

export const Default: Story = {};
