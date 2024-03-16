/// <reference lib="WebWorker" />
/// <reference types="vite/client" />

import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST);

declare global {
  interface Window {
    INJECT_MANIFEST_PLUGIN: { url: string; revision: string }[]
    skipWaiting: Function
  }
}

cleanupOutdatedCaches();

let allowlist: undefined | RegExp[]

registerRoute(new NavigationRoute(
  createHandlerBoundToURL('/'),
  { allowlist },
))

registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.css'), 
  new StaleWhileRevalidate({
    cacheName: 'css-teste',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
)

registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png') && url.pathname.includes('init'),
  new StaleWhileRevalidate({
    cacheName: 'images-init',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 120 }),
    ],
  })
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

self.skipWaiting();
clientsClaim();
