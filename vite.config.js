// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   base: '/',
//   publicDir: 'public',
//   server: {
//     open: true,
//   },
// });

//==================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [react(), mkcert()],
  base: "/",
  publicDir: "public",
  server: {
    open: true,
    https: true,
  },
});
