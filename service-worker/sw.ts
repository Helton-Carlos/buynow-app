/// <reference lib="WebWorker" />
/// <reference types="vite/client" />

import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import {CacheFirst  } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

self.addEventListener('install', (event) => {
  console.log('Service worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
});

registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.html') && url.pathname.includes('/init'),
  new CacheFirst({
    cacheName: 'init',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

registerRoute(
  ({ url }) => url.origin === self.location.origin && (url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.endsWith('.html') || url.pathname.endsWith('.png')) && !url.pathname.includes('init'),
  new CacheFirst({
    cacheName: 'full',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);
  
self.skipWaiting();
clientsClaim();
