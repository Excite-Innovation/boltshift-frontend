# PWA Overview

This is the quick summary for Boltshift’s PWA setup.

For the full implementation guide, see:

- [`docs/pwa-and-push-implementation.md`](/home/denil/Boltshift/boltshift-frontend/docs/pwa-and-push-implementation.md)

## What It Includes

- App installation through the browser install prompt.
- A custom service worker for caching and offline navigation.
- Offline cart and wishlist persistence backed by IndexedDB, with localStorage as a fallback.
- An offline recovery page plus an app-shell status banner for connection loss.
- Push notification opt-in from the notifications drawer.
- Local development support with an HTTP-first workflow and optional HTTPS mode.

## Important Notes

- The install popup is install-only and can be dismissed.
- Push permission is requested only after an explicit user action.
- Production push subscriptions still need durable storage before launch.
