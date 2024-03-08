/// <reference lib="WebWorker" />
/// <reference types="vite/client" />

import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

let allowlist: undefined | RegExp[]

if (import.meta.env.DEV)
  allowlist = [/^\/$/]

registerRoute(new NavigationRoute(
  createHandlerBoundToURL('/'),
  { allowlist },
))

registerRoute(({ url }) => {
  if (url.pathname === '/init') {
    // Ignora arquivos CSS no precache apenas para a rota /init
    return {
      handle: createHandlerBoundToURL('/'),
      url
    };
  }
  // Para outras rotas, trata como padrão
  return undefined;
});

self.skipWaiting();
clientsClaim();
