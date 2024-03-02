import { defineNuxtConfig } from 'nuxt/config'
const sw = process.env.SW === 'true'

export default defineNuxtConfig({
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
      routes: ['/','/init', '/config', '/products-registered', '/approve'],
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
    strategies: sw ? 'injectManifest' : 'generateSW',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
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
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
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