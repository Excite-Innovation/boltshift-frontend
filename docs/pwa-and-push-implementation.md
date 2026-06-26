# PWA and Push Notification Implementation

This document explains how Boltshift’s Progressive Web App setup works, where the key pieces live, and what is still needed for a production-ready push backend.

## Overview

The current implementation covers three areas:

1. App installation through the browser `beforeinstallprompt` flow.
2. Offline-friendly app shell behavior through a custom service worker.
3. Push notification subscription from a deliberate user action in the notifications drawer.

The install experience is intentionally separate from push permissions:

- The install popup only handles app installation.
- Push permissions are requested from the notifications drawer when the user taps the enable button.

## Main Files

- [`app/manifest.ts`](/home/denil/Boltshift/boltshift-frontend/app/manifest.ts)
  - Defines the PWA manifest metadata.
  - Sets the app name, scope, start URL, icons, screenshots, and display mode.

- [`app/layout.tsx`](/home/denil/Boltshift/boltshift-frontend/app/layout.tsx)
  - Mounts the global install prompt.
  - Ensures the PWA UI is available across the app.

- [`components/install-prompt.tsx`](/home/denil/Boltshift/boltshift-frontend/components/install-prompt.tsx)
  - Listens for the browser install prompt.
  - Shows a single install button plus a dismiss button.
  - Persists dismissal in `localStorage`.

- [`components/notification/notification-drawer.tsx`](/home/denil/Boltshift/boltshift-frontend/components/notification/notification-drawer.tsx)
  - Hosts the push permission control.
  - Keeps push opt-in inside the notifications UI rather than the install popup.

- [`components/push-notification-manager.tsx`](/home/denil/Boltshift/boltshift-frontend/components/push-notification-manager.tsx)
  - Requests notification permission from the browser or system.
  - Registers the service worker.
  - Subscribes and unsubscribes the user from push.

- [`public/sw.js`](/home/denil/Boltshift/boltshift-frontend/public/sw.js)
  - Implements caching, offline navigation handling, and push notification click behavior.

- [`lib/actions.ts`](/home/denil/Boltshift/boltshift-frontend/lib/actions.ts)
  - Stores the current push subscription in memory.
  - Sends test notifications through `web-push`.

- [`scripts/dev-pwa.sh`](/home/denil/Boltshift/boltshift-frontend/scripts/dev-pwa.sh)
  - Starts local development.
  - Defaults to plain HTTP for easier service worker registration.
  - Supports opt-in HTTPS through `USE_HTTPS=true`.

- [`next.config.ts`](/home/denil/Boltshift/boltshift-frontend/next.config.ts)
  - Sets cache-control headers for `/sw.js`.
  - Prevents the browser from holding on to stale service worker code.

## Install Flow

The install popup is driven by the browser’s `beforeinstallprompt` event.

Behavior:

1. The app listens for `beforeinstallprompt`.
2. When the event fires, the popup becomes interactive.
3. The user taps `Add to home screen`.
4. The browser shows its native install dialog.
5. If the user installs or dismisses, the prompt hides and stays dismissed in `localStorage`.

Notes:

- The popup does not show push controls.
- The popup can be dismissed permanently with the close button.
- The popup hides automatically when the app is already installed.

## Push Flow

Push notifications are triggered from the notifications drawer.

Behavior:

1. The user opens the notifications drawer.
2. They tap `Enable notifications`.
3. The browser or operating system shows its own permission prompt.
4. If permission is granted, the app registers the service worker and creates a push subscription.
5. The subscription is sent to the server action in `lib/actions.ts`.
6. The user can later disable push from the same control.

Notes:

- Permission requests only happen after a direct user action.
- This keeps the browser/system permission UI in the expected place.
- The current implementation supports a single active subscription in memory on the server.

## Service Worker Behavior

`public/sw.js` handles:

- Pre-caching the app shell and selected assets.
- Network-first navigation requests.
- Cache-first or stale-while-revalidate strategies for assets and images.
- Push payload handling.
- Notification click navigation and window focusing.

Important detail:

- The service worker is served from `/sw.js`.
- The config in `next.config.ts` makes sure `/sw.js` is not aggressively cached.

## Development Setup

Use the standard dev script:

```bash
npm run dev:pwa
```

By default, this runs on:

```text
http://localhost:3000
```

Why HTTP by default:

- Local HTTPS certificate trust can break service worker fetches in browsers.
- Plain localhost is enough for service workers during development.

Optional HTTPS mode:

```bash
USE_HTTPS=true npm run dev:pwa
```

That mode uses `mkcert` and is useful when you want to test local HTTPS behavior explicitly.

## Production Notes

The PWA install experience can work in production now if the app is served over HTTPS.

The push flow is not production-complete yet.

Current limitation:

- [`lib/actions.ts`](/home/denil/Boltshift/boltshift-frontend/lib/actions.ts) keeps the push subscription in a module-level variable.
- That means the subscription is lost when the server restarts.
- It also does not scale to multiple instances or users.

## Database Integration

To make push production-ready, store subscriptions durably in a database and associate them with a user or device record.

### Suggested Table Shape

A single `push_subscriptions` table is enough to start:

```ts
{
  id: string;
  user_id: string | null;
  device_id: string | null;
  endpoint: string;
  auth: string;
  p256dh: string;
  expiration_time: string | null;
  user_agent: string | null;
  created_at: Date;
  updated_at: Date;
}
```

Recommended constraints:

- `endpoint` should be unique.
- `user_id` should be indexed if subscriptions are tied to accounts.
- `device_id` should be indexed if you want one row per browser/device session.

### Example SQL

```sql
CREATE TABLE push_subscriptions (
  id uuid PRIMARY KEY,
  user_id uuid NULL,
  device_id text NULL,
  endpoint text NOT NULL UNIQUE,
  auth text NOT NULL,
  p256dh text NOT NULL,
  expiration_time timestamptz NULL,
  user_agent text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX push_subscriptions_user_id_idx ON push_subscriptions(user_id);
CREATE INDEX push_subscriptions_device_id_idx ON push_subscriptions(device_id);
```

### Subscription Flow

1. The browser creates a `PushSubscription`.
2. The client sends the serialised subscription to a server action or API route.
3. The server upserts the subscription by `endpoint`.
4. The server associates the row with the current user, session, or device.
5. When sending a notification, the server loads all matching subscriptions from the database.
6. The server sends the payload to each subscription through `web-push`.
7. If a send returns `410 Gone` or `404 Not Found`, the subscription should be removed from the database.

### Unsubscribe Flow

1. The browser calls `subscription.unsubscribe()`.
2. The client notifies the server.
3. The server deletes the matching row by `endpoint` and `user_id` or `device_id`.

### Server Action Changes

`lib/actions.ts` should move from module-level state to database lookups:

- `subscribeUser(sub)` becomes an upsert into `push_subscriptions`.
- `unsubscribeUser()` becomes a delete against the matching row.
- `sendNotification(message)` queries all active subscriptions and sends the payload to each one.

### Example Pseudocode

```ts
async function subscribeUser(subscription, userId, deviceId) {
  await db.pushSubscriptions.upsert({
    where: { endpoint: subscription.endpoint },
    create: {
      userId,
      deviceId,
      endpoint: subscription.endpoint,
      auth: subscription.keys.auth,
      p256dh: subscription.keys.p256dh,
      expirationTime: subscription.expirationTime ? new Date(subscription.expirationTime) : null,
      userAgent: headers().get("user-agent"),
    },
    update: {
      userId,
      deviceId,
      auth: subscription.keys.auth,
      p256dh: subscription.keys.p256dh,
      expirationTime: subscription.expirationTime ? new Date(subscription.expirationTime) : null,
      updatedAt: new Date(),
    },
  });
}

async function sendNotification(message) {
  const subscriptions = await db.pushSubscriptions.findMany();

  for (const subscription of subscriptions) {
    try {
      await webpush.sendNotification(subscriptionToWebPush(subscription), payload);
    } catch (error) {
      if (isGoneOrNotFound(error)) {
        await db.pushSubscriptions.delete({ where: { endpoint: subscription.endpoint } });
      }
    }
  }
}
```

### Data Ownership Options

- Per-user subscriptions work best when users sign in.
- Per-device subscriptions work well for guest checkout or anonymous users.
- You can combine both by storing `user_id` when available and falling back to `device_id`.

## Troubleshooting

If install does not appear:

- Make sure the app is not already installed.
- Make sure the install prompt was not dismissed previously in `localStorage`.
- Wait for the browser to emit `beforeinstallprompt`.

If push permission does not appear:

- Open the notifications drawer and tap `Enable notifications`.
- Confirm the browser supports notifications and push.
- Make sure the browser can reach its push service.

If push registration fails with `AbortError`:

- Try a browser with working push support.
- Disable VPN or proxy filtering temporarily.
- Confirm the app is running from a secure origin in production.

## Maintenance Checklist

- Keep the manifest icons and screenshots up to date.
- Keep `/sw.js` headers configured for no-cache.
- Revisit the push storage model before production launch.
- Re-test install and push flows in Chrome, Edge, and Safari/iOS.
