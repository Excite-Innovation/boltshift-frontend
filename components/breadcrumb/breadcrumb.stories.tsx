import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BreadcrumbComponent } from "@/components/breadcrumb/breadcrumb";

const meta = {
  title: "Components/Breadcrumb",
  component: BreadcrumbComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    items: [
      {
        label: "Catalog",
        href: "/catalog",
      },
      {
        label: "Electronics",
      },
    ],
  },
} satisfies Meta<typeof BreadcrumbComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CatalogCategory: Story = {
  args: {
    items: [
      {
        label: "Catalog",
        href: "/catalog",
      },
      {
        label: "Fashion",
      },
    ],
  },
};

export const ProductDetail: Story = {
  args: {
    items: [
      {
        label: "Catalog",
        href: "/catalog",
      },
      {
        label: "Electronics",
        href: "/catalog/electronics",
      },
      {
        label: "Headphones",
        href: "/catalog/electronics/headphones",
      },
      {
        label: "Wireless Noise Cancelling Headphones",
      },
    ],
  },
};

export const LongTrail: Story = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    items: [
      {
        label: "Catalog",
        href: "/catalog",
      },
      {
        label: "Home & Living",
        href: "/catalog/home-living",
      },
      {
        label: "Kitchen",
        href: "/catalog/home-living/kitchen",
      },
      {
        label: "Coffee Makers",
        href: "/catalog/home-living/kitchen/coffee-makers",
      },
      {
        label: "Compact Espresso Machine",
      },
    ],
  },
  render: (args) => (
    <div className="w-full max-w-5xl px-6">
      <BreadcrumbComponent {...args} />
    </div>
  ),
};
