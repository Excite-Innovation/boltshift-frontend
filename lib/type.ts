type Vendor = {
    id?: string;
    name: string;
    icon?: string;
    alt: string;
};

type HeroItem = {
    id?: string;
    title: string;
    description: string;
    image: string;
    badge?: string;
    alt: string;
};

type CategoryItem = {
    id?: string;
    image: string;
    name: string;
};

export type { Vendor, HeroItem, CategoryItem };
