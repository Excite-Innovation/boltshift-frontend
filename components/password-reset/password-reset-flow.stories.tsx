import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PasswordResetFlow } from "@/components/password-reset/password-reset-flow";

const meta = {
  title: "Components/PasswordReset/PasswordResetFlow",
  component: PasswordResetFlow,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PasswordResetFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CheckYourEmail: Story = {
  render: () => <PasswordResetFlow step={2} />,
};
