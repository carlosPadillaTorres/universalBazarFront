import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   server: {
    host: true,
    port: process.env.PORT || 1212,
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: process.env.PORT || 1212,
  },
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'bazarUniversal',
      short_name: 'Universal bazar',
      description: 'Bazar con todo tipo de productos. La app será web, pero se enfocará en móviles',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/logo_bazar_icono.png',
          sizes: '192x192',
          type: 'image/png',
        }
      ],
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})