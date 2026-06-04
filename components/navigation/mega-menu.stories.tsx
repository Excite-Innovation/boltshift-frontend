import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MegaMenu } from "@/components/navigation/mega-menu";

const meta = {
  title: "Components/Navigation/MegaMenu",
  component: MegaMenu,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MegaMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

function MegaMenuCanvas({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <div className="min-h-screen bg-muted/30 p-8">
      <div className="flex h-16 items-center gap-4 rounded-lg border bg-background px-4 shadow-sm">
        <MegaMenu defaultOpen={defaultOpen} />
        <div className="text-sm font-semibold text-foreground">Boltshift</div>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <MegaMenuCanvas />,
};

export const Open: Story = {
  render: () => <MegaMenuCanvas defaultOpen />,
};
