import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Set the base path for GitHub Pages
  // Replace 'your-repo-name' with your actual repository name
  base: '/Nesma-English-study-plan/',
  
  build: {
    // Output directory for the build
    outDir: 'dist',
    
    // Ensure assets are properly referenced
    assetsDir: 'assets',
    
    // Generate source maps for debugging
    sourcemap: false,
    
    // Minify the output
    minify: true,
    
    // Multi-page app configuration
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        schedule: resolve(__dirname, 'schedule.html')
      }
    }
  },
  
  // Configure the development server
  server: {
    host: true,
    port: 5173,
  },
  
  // Configure preview server
  preview: {
    host: true,
    port: 4173,
  }
})
