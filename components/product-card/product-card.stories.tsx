import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  HorizontalProfile as HorizontalProfileCard,
  ProductCard,
} from "@/components/product-card/product-card";
import { GetProductItems } from "@/lib/product-items";
import type { ProductVariant } from "@/types/type";

const products = GetProductItems();
const primaryProduct = products[0];

const cardWidths: Record<ProductVariant, string> = {
  default: "w-56",
  wide: "w-80",
  countdown: "w-72",
  horizontal: "w-96",
  centered: "w-72",
  catalog: "w-52",
};

function ProductCardCanvas({
  variant,
  product = primaryProduct,
}: {
  variant: ProductVariant;
  product?: typeof primaryProduct;
}) {
  return (
    <div className={cardWidths[variant]}>
      <ProductCard variant={variant} product={product} />
    </div>
  );
}

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "wide",
        "countdown",
        "horizontal",
        "centered",
        "catalog",
      ],
    },
  },
  args: {
    product: primaryProduct,
    variant: "default",
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ProductCardCanvas
      variant={args.variant ?? "default"}
      product={args.product}
    />
  ),
};

export const Wide: Story = {
  args: {
    variant: "wide",
    product: products[3],
  },
  render: (args) => <ProductCardCanvas variant="wide" product={args.product} />,
};

export const Countdown: Story = {
  args: {
    variant: "countdown",
    product: products[2],
  },
  render: (args) => (
    <ProductCardCanvas variant="countdown" product={args.product} />
  ),
};

export const Horizontal: Story = {
  args: {
    variant: "horizontal",
    product: products[3],
  },
  render: (args) => (
    <ProductCardCanvas variant="horizontal" product={args.product} />
  ),
};

export const Centered: Story = {
  args: {
    variant: "centered",
    product: products[4],
  },
  render: (args) => (
    <ProductCardCanvas variant="centered" product={args.product} />
  ),
};

export const Catalog: Story = {
  args: {
    variant: "catalog",
    product: products[5],
  },
  render: (args) => (
    <ProductCardCanvas variant="catalog" product={args.product} />
  ),
};

export const HorizontalProfile: Story = {
  args: {
    product: products[6],
  },
  render: (args) => (
    <div className="w-fit">
      <HorizontalProfileCard
        product={args.product}
        label={args.product.variants[0]?.sizes[0]}
        colorName="gold"
        colorValue="gold"
      />
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const variants: ProductVariant[] = [
      "default",
      "wide",
      "countdown",
      "horizontal",
      "centered",
      "catalog",
    ];

    return (
      <div className="grid gap-8 p-8 sm:grid-cols-2 xl:grid-cols-3">
        {variants.map((variant, index) => (
          <section key={variant} className="grid content-start gap-3">
            <h2 className="text-sm font-semibold capitalize text-muted-foreground">
              {variant}
            </h2>
            <ProductCardCanvas
              variant={variant}
              product={products[index % products.length]}
            />
          </section>
        ))}
      </div>
    );
  },
};
