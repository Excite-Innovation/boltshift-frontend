const CACHE_VERSION = "2026-07-10"
const PRECACHE_CACHE = `boltshift-precache-${CACHE_VERSION}`
const RUNTIME_CACHE = `boltshift-runtime-${CACHE_VERSION}`
const IMAGE_CACHE = `boltshift-images-${CACHE_VERSION}`
const REFRESH_CACHE_TAG = "boltshift-refresh-cache"
const OFFLINE_URL = "/offline"

const PRECACHE_URLS = [
  "/",
  OFFLINE_URL,
  "/favicon.ico",
  "/opengraph-image.png",
  "/icons/standard/icon-192x192.png",
  "/icons/standard/icon-512x512.png",
  "/icons/maskable/Variant=icon-192-maskable.png",
  "/icons/maskable/Variant=512-maskable.png",
]

function isSameOrigin(url) {
  return new URL(url).origin === self.location.origin
}

function isAssetRequest(request) {
  return ["style", "script", "font", "image"].includes(request.destination)
}

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE)

  try {
    const response = await fetch(request)

    if (request.method === "GET" && response.ok && isSameOrigin(request.url)) {
      await cache.put(request, response.clone())
    }

    return response
  } catch {
    const cachedResponse = await cache.match(request)

    if (cachedResponse) {
      return cachedResponse
    }

    if (request.mode === "navigate") {
      const offlineResponse = await caches.match(OFFLINE_URL)

      if (offlineResponse) {
        return offlineResponse
      }

      const rootResponse = await caches.match("/")

      if (rootResponse) {
        return rootResponse
      }
    }

    throw new Error("Network request failed and no cached response was found.")
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cachedResponse = await cache.match(request)
  const networkResponsePromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone())
      }

      return response
    })
    .catch(
      () =>
        cachedResponse ||
        new Response("", {
          status: 504,
          statusText: "Offline",
        })
    )

  return cachedResponse || networkResponsePromise
}

async function safePrecache(urls) {
  const cache = await caches.open(PRECACHE_CACHE)

  await Promise.allSettled(
    urls.map(async (url) => {
      try {
        const response = await fetch(url, {
          cache: "no-store",
        })

        if (response.ok) {
          await cache.put(url, response.clone())
        }
      } catch {
        // Ignore individual precache failures so a single missing asset does not block install.
      }
    })
  )
}

async function refreshPrecache() {
  try {
    await safePrecache(PRECACHE_URLS)
  } catch {
    // Keep serving the last known cache if refresh fails.
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      await safePrecache(PRECACHE_URLS)
      await self.skipWaiting()
    })()
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames
          .filter(
            (cacheName) =>
              ![
                PRECACHE_CACHE,
                RUNTIME_CACHE,
                IMAGE_CACHE,
              ].includes(cacheName)
          )
          .map((cacheName) => caches.delete(cacheName))
      )

      await self.clients.claim()
    })()
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event

  if (request.method !== "GET" || !isSameOrigin(request.url)) {
    return
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request))
    return
  }

  if (request.destination === "image") {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE))
    return
  }

  if (isAssetRequest(request)) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE))
  }
})

self.addEventListener("sync", (event) => {
  if (event.tag === REFRESH_CACHE_TAG) {
    event.waitUntil(refreshPrecache())
  }
})

self.addEventListener("periodicsync", (event) => {
  if (event.tag === REFRESH_CACHE_TAG) {
    event.waitUntil(refreshPrecache())
  }
})

self.addEventListener("message", (event) => {
  if (event.data?.type === "REFRESH_CACHE") {
    event.waitUntil(refreshPrecache())
  }
})

self.addEventListener("push", (event) => {
  const fallbackData = {
    title: "Boltshift",
    body: "You have a new update from Boltshift.",
    icon: "/icons/standard/icon-192x192.png",
    badge: "/icons/standard/icon-192x192.png",
    url: "/",
  }

  event.waitUntil(
    (async () => {
      let payload = {}

      if (event.data) {
        try {
          payload = event.data.json()
        } catch {
          payload = { body: await event.data.text() }
        }
      }

      const data = {
        ...fallbackData,
        ...payload,
      }

      await self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon,
        badge: data.badge,
        data: {
          url: data.url,
        },
        tag: data.tag,
        renotify: Boolean(data.tag),
      })
    })()
  )
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  event.waitUntil(
    (async () => {
      const targetUrl = event.notification.data?.url || "/"
      const windowClients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      })

      for (const client of windowClients) {
        if ("focus" in client) {
          await client.focus()
          if ("navigate" in client && client.url !== targetUrl) {
            await client.navigate(targetUrl)
          }
          return
        }
      }

      await self.clients.openWindow(targetUrl)
    })()
  )
})
