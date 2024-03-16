import { defineNuxtConfig } from 'nuxt/config'
const sw = true;

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { dir: 'ltr', lang: 'pt' },
      link: [{ rel: 'icon', type: 'image/png', href: "/manifest/favicon-16x16.png" }],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],
  experimental: {
    payloadExtraction: true,
    watcher: 'parcel',
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      routes: ['/', '/init', '/config', '/products-registered', '/approve'],
    },
  },
  imports: {
    autoImport: true,
  },
  appConfig: {
    buildDate: new Date().toISOString(),
  },
  vite: {
    logLevel: 'info',
  },
  pwa: {
    strategies:'injectManifest',
    srcDir:'service-worker',
    filename:'sw.ts',
    registerType: 'autoUpdate',
    manifest: {
      name: 'BUYNOW',
      short_name: 'BUYNOW',
      theme_color: '#ffffff',
      start_url:'/',
      lang: 'pt-br',
      description: 'BUYNOW APP - salve suas compras em nosso APP.',
      screenshots: [
        {
          src: "manifest/home-screen.png",
          sizes: "320x320",
          type: "image/png",
          form_factor: "wide",
          label: "BUYNOW APP"
        }
      ],
      icons: [
        {
          src: 'manifest/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'manifest/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'manifest/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    injectManifest: {
      globPatterns: [
        '**/*.{js,css,html}',
        '**/config*.{js,css,html,png}',
        '**/init*.{js,html,png}',
      ],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})