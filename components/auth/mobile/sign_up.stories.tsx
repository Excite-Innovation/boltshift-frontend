import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SignUpMobile } from "@/components/auth/mobile/sign_up";

const meta = {
  title: "Components/Auth/Mobile/SignUp",
  component: SignUpMobile,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SignUpMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

