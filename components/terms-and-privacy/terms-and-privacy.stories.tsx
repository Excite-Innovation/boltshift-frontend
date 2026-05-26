import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TermsAndPrivacy } from "@/components/terms-and-privacy/terms-and-privacy";

function TermsAndPrivacyCanvas({ className = "" }: { className?: string }) {
  return (
    <div className="min-h-screen w-full bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className={`mx-auto w-full max-w-3xl ${className}`}>
        <TermsAndPrivacy />
      </div>
    </div>
  );
}

const meta = {
  title: "Components/TermsAndPrivacy",
  component: TermsAndPrivacy,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TermsAndPrivacy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TermsAndPrivacyCanvas />,
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => <TermsAndPrivacyCanvas className="max-w-sm" />,
};
