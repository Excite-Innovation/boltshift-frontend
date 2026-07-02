import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SignInDesktop } from "@/components/auth/desktop/sign_in";

const meta = {
  title: "Components/Auth/Desktop/SignIn",
  component: SignInDesktop,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SignInDesktop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
