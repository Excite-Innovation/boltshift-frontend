# Boltshift Frontend

![Boltshift Preview](./app/opengraph-image.png)

# Features

- User Authentication: Secure user accounts and authentication to manage profiles and track order history.
- Product Catalog: A comprehensive listing of products, organized into categories for easy navigation.
- Search and Filters: Effortlessly find products using the search functionality & apply filters to narrow down choices.
- Shopping Cart: Add products to cart, review before purchasing, and easily adjust quantities.
- Wishlist: Curate shopping desires! Collect and save items they love-your personalized shopping inspiration.
- Secure Payments: Multiple payment options with enhanced security to ensure safe transactions.
- Order Tracking: Track the status of orders from purchase to delivery.
- Responsive Design: Enjoy a consistent experience across various devices, from smartphones to desktops.
- Live Chat: Connect with customer service representatives in real-time to address queries and resolve issues.

# Technologies

- Next.js 16: React framework used for routing and app structure
- React 19: UI library
- TypeScript: Static typing
- Tailwind CSS v4: Utility-first styling
- shadcn/ui: Reusable component setup
- Radix UI: Accessible UI primitives
- next-themes: Theme management
- ESLint: Code linting

# Product Engineering Team

- Special Contributions: Denil Anyonyi & Paul Mbingu
- Product Design & Research: Paul Mbingu
- Frontend Engineers: Denil Anyonyi

# How to Run


1. Clone the repository:

```bash
git clone https://github.com/Excite-Innovation/boltshift-frontend.git
cd boltshift-frontend
```

## Run Locally

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev:pwa
```

4. Open in browser:

```text
https://localhost:3000
```

## Run with Docker (Production)

```bash
npm run docker
```

## Run with Docker (Development — Hot Reload)

This setup is recommended for designers and developers who want to see changes reflected instantly without rebuilding the container. It mounts your local source code into the container so Next.js hot-reload works on every file save.

**Prerequisites:** Docker and Docker Compose installed.

1. Pull the latest changes from the remote branch:

```bash
git pull origin <branch-name>
```

2. Start the dev server in detached mode (runs in the background):

```bash
docker compose -f docker-compose.yml up -d
```

3. Open in browser:

```text
http://localhost:3000
```

4. To see logs from the running container:

```bash
docker compose -f docker-compose.yml logs -f
```

5. To stop the dev server:

```bash
docker compose -f docker-compose.yml down
```

> **Note:** The first run will take a moment as it installs dependencies inside the container. Subsequent starts are fast.
>
> Once the container is running, `git pull` changes are reflected automatically via hot-reload; no restart needed. The only exception is when a pull includes new packages (`package.json` changed), in which case restart the container so dependencies are installed:
>
> ```bash
> docker compose -f docker-compose.yml down && docker compose -f docker-compose.yml up -d
> ```

# Useful Scripts

```bash
npm run docker # Build and run the application
npm run dev:pwa # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run lint checks
```
