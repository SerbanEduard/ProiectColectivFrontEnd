import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

//DACA AI PROBLEME CU ACEASTA CONFIGURATIE , INTREABA-L PE CLAUDIU
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        //NU SCHIMBA ACEST URL
        target: 'ws://localhost:8080',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    //NU SCHIMBA ACEST PORT
    port:3000
  },
})
