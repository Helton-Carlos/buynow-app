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

registerRoute(
  ({ url }) => url.origin === self.location.origin && (url.pathname.endsWith('.css') || url.pathname.endsWith('.html')) && url.pathname.includes('init'),
  new StaleWhileRevalidate({
    cacheName: 'css-html-teste',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 120 }),
    ],
  })
);


registerRoute(
  ({ url }) => url.origin === self.location.origin && (url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.endsWith('.html') || url.pathname.endsWith('.png')) && !url.pathname.includes('init'),
  new StaleWhileRevalidate({
    cacheName: 'js-css-html-png-teste',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 120 }),
    ],
  })
);

self.skipWaiting();
clientsClaim();
