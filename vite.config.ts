import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import Vue18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'


// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    vue(),
    Vue18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)),'@/plugins/i18n/locales/**'),
      runtimeOnly: false //TODO check this property in docs 
    }),

  ],
  resolve:{
    alias:{
      '@': path.resolve(__dirname,"./src")
    }
  },
})
