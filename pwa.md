# PWA Implementations

This project now has a fuller Progressive Web App setup built around Next.js App Router metadata and a custom service worker.

## What Was Added

- App manifest metadata in [`app/manifest.ts`](/home/denil/Boltshift/boltshift-frontend/app/manifest.ts)
  - Uses the Next.js App Router manifest route.
  - Declares the app name, short name, launch scope, start URL, theme color, and screenshots.
  - Includes standard, Apple, and maskable icons so the app installs cleanly across platforms.

- Root PWA entry point in [`app/layout.tsx`](/home/denil/Boltshift/boltshift-frontend/app/layout.tsx)
  - Mounts the PWA install and push UI globally so users can find it from any page.
  - Keeps the experience available without needing to visit a specific settings page.

- Install flow in [`components/install-prompt.tsx`](/home/denil/Boltshift/boltshift-frontend/components/install-prompt.tsx)
  - Listens for the browser install prompt.
  - Shows only a single install button with a dismiss control when the prompt is available.
  - Remembers dismissal in local storage so the popup does not keep returning.
  - Hides itself once the app is installed.

- Push notifications in [`components/push-notification-manager.tsx`](/home/denil/Boltshift/boltshift-frontend/components/push-notification-manager.tsx)
  - Registers the service worker.
  - Requests notification permission.
  - Subscribes and unsubscribes the user from push notifications.
  - Supports sending a test notification for quick verification.
  - Uses VAPID-based subscription handling through the existing server actions.
  - Is separate from the install popup so the browser or system permission UI can handle notification prompts naturally.

- Service worker caching in [`public/sw.js`](/home/denil/Boltshift/boltshift-frontend/public/sw.js)
  - Pre-caches key app shell assets.
  - Uses network-first navigation handling so page loads stay fresh when online.
  - Uses cache-first / stale-while-revalidate behavior for static assets and images.
  - Removes old cache versions during activation.
  - Handles push payloads and notification clicks.

- Cache-control header in [`next.config.ts`](/home/denil/Boltshift/boltshift-frontend/next.config.ts)
  - Ensures `/sw.js` is not aggressively cached by the browser or intermediary caches.
  - Helps the browser pick up service worker updates more reliably.

- Local dev server in [`scripts/dev-pwa.sh`](/home/denil/Boltshift/boltshift-frontend/scripts/dev-pwa.sh)
  - Runs Next.js over plain `http://localhost:3000` by default so service worker registration does not depend on a trusted local HTTPS certificate.
  - Keeps an opt-in HTTPS mode available via `USE_HTTPS=true` for anyone who still wants to test with `mkcert`.

## Behavior Summary

- Online browsing stays responsive because static assets and images are cached.
- Navigation falls back to cached content when the network is unavailable.
- The app can be installed to the home screen with the browser install prompt.
- Push notifications can be enabled and tested from the built-in PWA panel.
- Notification clicks open the app and focus the active window when possible.

## Notes

- The push subscription is still stored in memory in the current server action setup, so it is suitable for local development and demos.
- For production, push subscriptions should be stored in a durable database and associated with user accounts.
- The official Next.js metadata and manifest conventions were used as the base for the manifest setup.
