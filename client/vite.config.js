import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss() ],
  server: {
    port: 3000,
    open: true
  },
  esbuild: {
    loader: 'jsx',  // Set loader to handle JSX
    include: [
      // Add these lines for JSX support
      'src/**/*.jsx',
      'src/**/*.js',
      'node_modules/**/*.jsx'
    ],
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',  // Treat .js files as JSX
      },
    },
  },
})