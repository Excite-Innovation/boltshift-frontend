import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SignInMobile } from "@/components/auth/mobile/sign_in";

const meta = {
  title: "Components/Auth/Mobile/SignIn",
  component: SignInMobile,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SignInMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

