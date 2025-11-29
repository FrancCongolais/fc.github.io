import { defineConfig, loadEnv } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: './', // Chemin relatif pour GitHub Pages
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          about: resolve(__dirname, 'apropos.html'),
          tokenomics: resolve(__dirname, 'tokenomics.html'),
          whitepaper: resolve(__dirname, 'whitepaper.html'),
          contact: resolve(__dirname, 'contact.html'),
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        }
      }
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    }
  };
});