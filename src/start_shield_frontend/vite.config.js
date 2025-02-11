import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: "../../.env" });

export default defineConfig({
    build: {
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            external: ["@stripe/stripe-js", "@stripe/react-stripe-js"], // Exclude atât "ipfs-http-client" cât și "js-sha256"
        },
    },
    optimizeDeps: {
        include: ["@stripe/stripe-js", "@stripe/react-stripe-js"], // Include explicit pentru vite
        esbuildOptions: {
            define: {
                global: "globalThis",
            },
        },
    },
    server: {
        port: 3000,
        proxy: {
            "/api": {
                target: "http://127.0.0.1:4943",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
        hmr: {
            overlay: false,
        },
    },
    plugins: [
        react(),
        environment("all", { prefix: "CANISTER_" }),
        environment("all", { prefix: "DFX_" }),
    ],
    resolve: {
        alias: {

            "companyData": path.resolve(
                __dirname,
                ".dfx/local/canisters/companyData/companyData.js" // Use the correct filename here
            ),
            "js-sha256": path.resolve(__dirname, "./node_modules/js-sha256/src/sha256.js"),
            "declarations": fileURLToPath(new URL("../declarations",
                import.meta.url)),
            "dfx-generated": path.resolve(__dirname, "../../.dfx/local/canisters"),
        },
    },
});