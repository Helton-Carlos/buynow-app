/// <reference lib="WebWorker" />
/// <reference types="vite/client" />

import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkOnly } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

self.addEventListener('install', (event) => {
  console.log('Service worker installed');
});

registerRoute(
  ({ url }) => {
    return (
      url.origin === self.location.origin &&
      (url.pathname.includes('products') || url.pathname.includes('approve.svg'))
    );
  },
  new CacheFirst({
    cacheName: 'products-approve-image',
    plugins: [
      new ExpirationPlugin({ maxEntries: 120, maxAgeSeconds: 3600 }),
    ],
  })
);

registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.includes('config'),
  new CacheFirst({
    cacheName: 'config-image',
    plugins: [
      new ExpirationPlugin({ maxEntries: 120, maxAgeSeconds: 3600 }),
    ],
  })
);

registerRoute(
  ({ url }) => {
    return (
      url.origin === self.location.origin &&
      url.pathname.includes('buynow-app.vercel.app/approve') &&
      !url.pathname.endsWith('.css')
    );
  },
  new NetworkOnly()
);

self.skipWaiting();
clientsClaim();
