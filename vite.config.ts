
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Fix: Cast process to any to avoid TS error regarding 'cwd' not existing on type 'Process'
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Prioritize VITE_GOOGLE_API_KEY if available, fallback to API_KEY
      'process.env.API_KEY': JSON.stringify(env.VITE_GOOGLE_API_KEY || env.API_KEY || process.env.API_KEY),
      // Polyfill process.env to avoid errors in some libraries
      'process.env': {}
    }
  };
});
