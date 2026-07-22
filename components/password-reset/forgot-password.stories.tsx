import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ForgotPassword } from "@/components/password-reset/forgot-password";

const meta = {
  title: "Components/PasswordReset/ForgotPassword",
  component: ForgotPassword,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ForgotPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LimitedWidth: Story = {
  render: () => (
    <div className="w-84 m-auto">
      <ForgotPassword defaultEmail="paul@excite.company" />
    </div>
  ),
};
