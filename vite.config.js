import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite'; // <--- BU EKSİKTİ!

export default defineConfig({
  plugins: [
    tailwindcss(), // <--- CSS motorunu buraya ateşliyoruz
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Voxera Social',
        short_name: 'Voxera',
        description: 'Fütüristik Sesli ve Yazılı Sohbet Platformu',
        theme_color: '#121315',
        background_color: '#121315',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  // Dosya yollarının canlıda (Firebase) şaşmaması için bunu da ekle:
  base: './' 
});