import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { GradientSelectorModal } from "@/components/color-picker/color-picker";

const meta = {
  title: "Components/ColorPicker/GradientSelectorModal",
  component: GradientSelectorModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    defaultOpen: true,
  },
} satisfies Meta<typeof GradientSelectorModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="min-h-screen bg-[#e8edf3]">
      <p className="fixed left-2 top-1 z-[60] text-xs leading-none text-slate-400">
        Gradient Selector Overlay
      </p>
      <GradientSelectorModal {...args} />
    </div>
  ),
};
