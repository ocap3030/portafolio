import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige las llamadas a la API de publicaciones al servidor PHP
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true, // Necesario para servidores virtuales
      },
      // Redirige la llamada del formulario de contacto
      '/procesar_formulario.php': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      // Redirige a la página de mensajes
      '/mensajes.php': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
})
