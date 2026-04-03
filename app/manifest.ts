import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Boltshift",
        description: "Enjoy effortless shopping as you explore and discover your favorite stores in one convenient place.",
        start_url: "/",
        display: "standalone",
        display_override: ["minimal-ui", "fullscreen"],
        background_color: "#ffffff",
        theme_color: "#EE2255",
        icons: [
            // Standard icons
            {
                src: "/icons/standard/icon-72x72.png",
                sizes: "72x72",
                type: "image/png",
            },
            {
                src: "/icons/standard/icon-96x96.png",
                sizes: "96x96",
                type: "image/png",
            },
            {
                src: "/icons/standard/icon-128x128.png",
                sizes: "128x128",
                type: "image/png",
            },
            {
                src: "/icons/standard/icon-144x144.png",
                sizes: "144x144",
                type: "image/png",
            },
            {
                src: "/icons/standard/icon-152x152.png",
                sizes: "152x152",
                type: "image/png",
            },
            {
                src: "/icons/standard/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icons/standard/icon-384x384.png",
                sizes: "384x384",
                type: "image/png",
            },
            {
                src: "/icons/standard/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },

            // Maskable icons
            {
                src: "/icons/maskable/Variant=512-maskable.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/icons/maskable/Variant=icon-192-maskable.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable",
            },

            // Apple icons
            {
                src: "/icons/apple/Variant=apple-touch-icon-120x120.png",
                sizes: "120x120",
                type: "image/png",
            },
            {
                src: "/icons/apple/Variant=apple-touch-icon-167x167.png",
                sizes: "167x167",
                type: "image/png",
            },
            {
                src: "/icons/apple/Variant=apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
        screenshots: [
            {
                src: "/pwa/web/Desk-01-Home Screen.png",
                sizes: "1280x720",
                type: "image/png",
                form_factor: "wide",
                label: "Home screen showing main navigation and featured content",
            },
            {
                src: "/pwa/web/Desk-02-Product Listing.png",
                sizes: "1280x720",
                type: "image/png",
                form_factor: "wide",
                label: "Product listing page",
            },
            {
                src: "/pwa/web/Desk-03-Product Details.png",
                sizes: "1280x720",
                type: "image/png",
                form_factor: "wide",
                label: "Product details page",
            },
            {
                src: "/pwa/web/Desk-04-Wishlist.png",
                sizes: "1280x720",
                type: "image/png",
                form_factor: "wide",
                label: "Wishlist page",
            },
            {
                src: "/pwa/web/Desk-05-Checkout.png",
                sizes: "1280x720",
                type: "image/png",
                form_factor: "wide",
                label: "Checkout page",
            },

            // Mobile screens
            {
                src: "/pwa/mobile/Mob-01-Home Screen.png",
                sizes: "720x1280",
                type: "image/png",
                form_factor: "narrow",
                label: "Mobile Home Screen",
            },
            {
                src: "/pwa/mobile/Mob-02-Product Listing.png",
                sizes: "720x1280",
                type: "image/png",
                form_factor: "narrow",
                label: "Mobile Product Listing page",
            },
            {
                src: "/pwa/mobile/Mob-03-Product Details.png",
                sizes: "720x1280",
                type: "image/png",
                form_factor: "narrow",
                label: "Mobile Product Details page",
            },
            {
                src: "/pwa/mobile/Mob-04-Wishlist.png",
                sizes: "720x1280",
                type: "image/png",
                form_factor: "narrow",
                label: "Mobile Wishlist page",
            },
            {
                src: "/pwa/mobile/Mob-05-Checkout.png",
                sizes: "720x1280",
                type: "image/png",
                form_factor: "narrow",
                label: "Mobile Checkout page",
            },
        ],
    }
}
