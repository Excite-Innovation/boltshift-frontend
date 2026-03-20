type Vendor = {
    id?: string;
    name: string;
    icon?: string;
};

type HeroItem = {
    id?: string;
    title: string;
    description: string;
    image: string;
    badge?: string;
};

type CategoryItem = {
    id?: string;
    image: string;
    name: string;
};

export type { Vendor, HeroItem, CategoryItem }
