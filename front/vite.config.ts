/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: true,
        watch: {
            usePolling: true,
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./src/__tests__/setupTests.ts"],
    },
});
