import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: './', // Use relative paths for mobile compatibility
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'NutriFlow AI',
          short_name: 'NutriFlow',
          description: 'Premium AI-powered nutrition tracking and health dashboard',
          theme_color: '#10b981',
          background_color: '#fcfcfd',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          orientation: 'portrait',
          icons: [
            {
              src: '/icons/icon-48.webp',
              sizes: '48x48',
              type: 'image/webp'
            },
            {
              src: '/icons/icon-72.webp',
              sizes: '72x72',
              type: 'image/webp'
            },
            {
              src: '/icons/icon-96.webp',
              sizes: '96x96',
              type: 'image/webp'
            },
            {
              src: '/icons/icon-128.webp',
              sizes: '128x128',
              type: 'image/webp'
            },
            {
              src: '/icons/icon-192.webp',
              sizes: '192x192',
              type: 'image/webp'
            },
            {
              src: '/icons/icon-256.webp',
              sizes: '256x256',
              type: 'image/webp'
            },
            {
              src: '/icons/icon-512.webp',
              sizes: '512x512',
              type: 'image/webp'
            },
            {
              src: '/icons/icon-512.webp',
              sizes: '512x512',
              type: 'image/webp',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/firebasedatabase\.googleapis\.com\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'firebase-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 // 24 hours
                },
                networkTimeoutSeconds: 10
              }
            },
            {
              urlPattern: /^https:\/\/generativelanguage\.googleapis\.com\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'gemini-cache',
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 // 1 hour
                },
                networkTimeoutSeconds: 10
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'google-fonts-stylesheets'
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-webfonts',
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                }
              }
            }
          ]
        }
      })
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: undefined, // Bundle everything together for mobile
        }
      }
    }
  };
});
