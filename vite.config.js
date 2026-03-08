import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Change 'clone-wars-checklist' to your actual GitHub repo name
  base: '/clone-wars-checklist/',
})
