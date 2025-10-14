import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const appEnv = env.APP_ENV ?? (mode === 'production' ? 'production' : 'development')
  const isProd = appEnv === 'production'

  const server = isProd
    ? {
        port: 5173,
        strictPort: true,
      }
    : {
        port: 5173,
        strictPort: true,
        host: true,
        allowedHosts: ['.ngrok-free.app'],
      };

  return { plugins: [react()], server };
})
