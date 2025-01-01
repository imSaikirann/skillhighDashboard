import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/user-dashboard/', // Set the base path for your CDN deployment
  plugins: [react()],
})
