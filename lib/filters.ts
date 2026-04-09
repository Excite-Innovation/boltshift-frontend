import { FilterSection } from "@/lib/type";



export const FilterData: FilterSection[] = [
    {
        id: "categories",
        type: "nested",
        title: "Categories",
        options: [
            { id: "automotive", label: "Automotive" },
            { id: "baby", label: "Baby" },
            { id: "beauty", label: "Beauty And Personal Care" },
            { id: "men", label: "Men's Fashion" },
            { id: "women", label: "Women's Fashion" },
            { id: "pets", label: "Pet Supplies" },
            { id: "health", label: "Health & Household" },
            { id: "home", label: "Home & Kitchen" },
            { id: "luggage", label: "Luggage" },
        ],
    },
    {
        id: "brands",
        type: "checkbox",
        title: "Brands",
        options: [
            { id: "3m", label: "3M Company", value: "3m" },
            { id: "apple", label: "Apple Computer, Inc.", value: "apple" },
            { id: "caterpillar", label: "Caterpillar Inc.", value: "caterpillar" },
            { id: "cocacola", label: "Coca-Cola Co.", value: "cocacola" },
            { id: "dell", label: "Dell Computer Corporation", value: "dell" },
            { id: "ea", label: "Electronic Arts Inc.", value: "ea" },
            { id: "ford", label: "Ford Motor Co", value: "ford" },
            { id: "gap", label: "Gap Inc.", value: "gap" },
            { id: "hershey", label: "Hershey Foods Corp.", value: "hershey" },
        ],
    },
    {
        id: "price",
        type: "range",
        title: "Price Range",
        minPlaceholder: "Kshs.",
        maxPlaceholder: "Kshs.",
    },
    {
        id: "rating",
        type: "rating",
        title: "Rating",
        options: [
            { id: "5-stars", stars: 5 },
            { id: "4-stars", stars: 4 },
            { id: "3-stars", stars: 3 },
            { id: "2-stars", stars: 2 },
            { id: "1-star", stars: 1 },
        ],
    },
    {
        id: "shipping",
        type: "checkbox",
        title: "Shipping",
        options: [
            { id: "fast", label: "Fast", value: "fast" },
            { id: "saving", label: "Saving", value: "saving" },
            { id: "free", label: "Free", value: "free" },
        ],
    },
    {
        id: "tags",
        type: "tags",
        title: "Popular Tags",
        options: [
            { id: "electronics", label: "Electronics", value: "electronics" },
            { id: "phones", label: "Phones", value: "phones" },
            { id: "tablets", label: "Tablets", value: "tablets" },
            { id: "tshirts", label: "T-shirts", value: "tshirts" },
            { id: "hoodies", label: "Hoodies", value: "hoodies" },
            { id: "watches", label: "Watches", value: "watches" },
            { id: "macbook", label: "MacBook Pro", value: "macbook" },
            { id: "earrings", label: "Earrings", value: "earrings" },
            { id: "gold", label: "Gold Bracelets", value: "gold" },
            { id: "keyboard", label: "Keyboard", value: "keyboard" },
            { id: "lampshade", label: "Lampshade", value: "lampshade" },
            { id: "bottle", label: "Water Bottle", value: "bottle" },
        ],
    },
    {
        id: "stock",
        type: "toggle",
        title: "Only in Stock",
    },
];