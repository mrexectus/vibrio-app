import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Explicitly define process.env.API_KEY so it is replaced statically at build time
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY),
      // Polyfill process.env to avoid 'process is not defined' errors if used elsewhere
      'process.env': {}
    }
  };
});