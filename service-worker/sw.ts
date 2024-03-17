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
  ({ url }) => url.origin === self.location.origin && url.pathname.includes('config'),
  new CacheFirst({
    cacheName: 'config-remove-css',
    plugins: [
      new ExpirationPlugin({ maxEntries: 120, maxAgeSeconds: 3600 }),
      {
        cacheWillUpdate: async ({ response }) => {
          if (response && response.headers.get('content-type')?.includes('text/css')) {
            return null; 
          }
          return response;
        },
      },
    ],
  })
);

registerRoute(
  ({ url }) => {
    const image = url.origin === self.location.origin;
    const router = url.pathname === '/init';
    return image || router;
  },  
  new CacheFirst({
    cacheName: 'init-remove-image',
    plugins: [
      new ExpirationPlugin({ maxEntries: 24 * 60 * 60 }),
      {
        async cacheWillUpdate({ response }) {
          if (response && (response.headers.get('content-type')?.startsWith('image/'))) {
            return null;
          }
          return response;
        },
      },
    ],
  })
);

registerRoute(
  ({ url }) => {
    const image = url.origin === self.location.origin;
    const router = url.pathname === '/approve';
    return image || router;
  },  
  
  new CacheFirst({
    cacheName: 'approve-remove-search-svg',
    plugins: [
      new ExpirationPlugin({ maxEntries: 24 * 60 * 60 }),
      {
        async cacheWillUpdate({ request, response }) {
          if (request.url.includes('search.svg')) {
            return null;
          }
          return response;
        },
      },
    ],
  })
);
  
self.skipWaiting();
clientsClaim();
