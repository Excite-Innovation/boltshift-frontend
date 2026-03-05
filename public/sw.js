self.addEventListener("install", (event) => {
  self.skipWaiting()
})

// Clear old caches on activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys()

      await Promise.all(
        cacheNames.map((cache) => {
          return caches.delete(cache)
        })
      )

      await self.clients.claim()
    })()
  )
})

// Network-first fetch strategy
// (best for development)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  )
})

// Optional: push notifications
self.addEventListener("push", (event) => {
  if (!event.data) return

  const data = event.data.json()

  const options = {
    body: data.body,
    icon: data.icon || "/icons/standard/icon-152x152.png",
    badge: "/icons/standard/icon-152x152.png",
  }

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  event.waitUntil(
    clients.openWindow("/")
  )
})