import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ErrorPageView } from "@/components/error-page/error-page";

const meta = {
  title: "Components/Error Page",
  component: ErrorPageView,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorPageView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Error404: Story = {
  args: {
    variant: "404",
  },
};

export const Error403: Story = {
  args: {
    variant: "403",
  },
};

export const Error500: Story = {
  args: {
    variant: "500",
  },
};

export const Offline: Story = {
  args: {
    variant: "offline",
  },
};
