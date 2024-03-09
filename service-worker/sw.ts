/// <reference lib="WebWorker" />
/// <reference types="vite/client" />

import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

let allowlist: undefined | RegExp[]

registerRoute(new NavigationRoute(
  createHandlerBoundToURL('/'),
  { allowlist },
))

registerRoute( 
  ({ url }) => url.pathname === '/init' || url.pathname === '/config',
  ({ event }) => fetch(event.request)
);

self.skipWaiting();
clientsClaim();
