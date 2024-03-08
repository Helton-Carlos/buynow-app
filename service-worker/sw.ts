/// <reference lib="WebWorker" />
/// <reference types="vite/client" />

import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

const ignoreURLs = [/\.(?:css)$/]

precacheAndRoute(self.__WB_MANIFEST, {
  ignoreURLParametersMatching: ignoreURLs,
});

let allowlist: undefined | RegExp[]

if (import.meta.env.DEV)
  allowlist = [/^\/$/]

registerRoute(new NavigationRoute(
  createHandlerBoundToURL('/'),
  { allowlist },
))

registerRoute(({ url }) => {
  if (url.pathname === '/init') {
    return {
      handle: createHandlerBoundToURL('/'),
      url,
      ignoreURLParametersMatching: ignoreURLs,
    };
  }

  return undefined;
});

self.skipWaiting();
clientsClaim();
