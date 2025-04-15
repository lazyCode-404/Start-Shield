import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import environment from "vite-plugin-environment";
import dotenv from "dotenv";
import path from "path";
import jsPDF from 'jspdf';


// Definim __dirname pentru ES Modules
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Încărcăm variabilele din fișierul .env
dotenv.config({ path: "../../.env" });

export default defineConfig({
    build: {
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            external: ["@stripe/stripe-js", "@stripe/react-stripe-js"], // Excludem librării externe
        },
    },
    optimizeDeps: {
        include: ["@stripe/stripe-js", "@stripe/react-stripe-js"],
        esbuildOptions: {
            define: {
                global: "globalThis",
            },
        },
    },
    server: {
        port: 3000, // Portul pentru frontend
        proxy: {
            "/api": {
                target: "http://localhost:4943", // Proxy pentru backend
                changeOrigin: true,
                secure: false,
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
                ".dfx/local/canisters/companyData/companyData.js"
            ),
            "js-sha256": path.resolve(__dirname, "./node_modules/js-sha256/src/sha256.js"),
            "declarations": fileURLToPath(new URL("../declarations",
                import.meta.url)),
            "dfx-generated": path.resolve(__dirname, "../../.dfx/local/canisters"),
        },
    },
});


// // import { fileURLToPath, URL } from "url";
// // import react from "@vitejs/plugin-react";
// // import { defineConfig } from "vite";
// // import environment from "vite-plugin-environment";
// // import dotenv from "dotenv";
// // import path from "path";

// // dotenv.config({ path: "../../.env" });

// // export default defineConfig({
// //   build: {
// //     emptyOutDir: true,
// //      rollupOptions: {
// //       external: ["ipfs-http-client"],
// //     },
// //   },
// //   optimizeDeps: {
// //     esbuildOptions: {
// //       define: {
// //         global: "globalThis",
// //       },
// //     },
// //   },
// //   server: {
// //     port: 3000,
// //     proxy: {
// //       "/api": {
// //         target: "http://127.0.0.1:4943",
// //         changeOrigin: true,
// //         rewrite: (path) => path.replace(/^\/api/, ""),
// //       },
// //     },
// //     hmr: {
// //       overlay: false,
// //     },
// //   },
// //   plugins: [
// //     react(),
// //     environment("all", { prefix: "CANISTER_" }),
// //     environment("all", { prefix: "DFX_" }),
// //   ],
// //   resolve: {
// //     alias: {
// //       "ipfs-http-client": "ipfs-http-client", // Use the NPM package directly
// //       "companyData": path.resolve(
// //         __dirname,
// //         ".dfx/local/canisters/companyData/companyData.js" // Use the correct filename here
// //       ),
// //       "declarations": fileURLToPath(new URL("../declarations", import.meta.url)),
// //       "dfx-generated": path.resolve(__dirname, "../../.dfx/local/canisters"),
// //       // Adăugat alias pentru js-sha256
// //       "js-sha256": require.resolve("js-sha256"),
// //     },
// //   },
// // });
// import { fileURLToPath, URL } from "url";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
// import environment from "vite-plugin-environment";
// import dotenv from "dotenv";
// import path from "path";

// dotenv.config({ path: "../../.env" });

// export default defineConfig({
//     build: {
//         emptyOutDir: true,
//         sourcemap: true,
//         rollupOptions: {
//             external: ["@stripe/stripe-js", "@stripe/react-stripe-js"], // Exclude atât "ipfs-http-client" cât și "js-sha256"
//         },
//     },
//     optimizeDeps: {
//         include: ["@stripe/stripe-js", "@stripe/react-stripe-js"], // Include explicit pentru vite
//         esbuildOptions: {
//             define: {
//                 global: "globalThis",
//             },
//         },
//     },
//     server: {
//         port: 3000,
//         proxy: {
//             "/api": {
//                 target: 'http://localhost:5000',
//                 changeOrigin: true,
//                 rewrite: (path) => path.replace(/^\/api/, ""),
//             },
//         },
//         hmr: {
//             overlay: false,
//         },
//     },
//     plugins: [
//         react(),
//         environment("all", { prefix: "CANISTER_" }),
//         environment("all", { prefix: "DFX_" }),
//     ],
//     resolve: {
//         alias: {

//             "companyData": path.resolve(
//                 __dirname,
//                 ".dfx/local/canisters/companyData/companyData.js" // Use the correct filename here
//             ),
//             "js-sha256": path.resolve(__dirname, "./node_modules/js-sha256/src/sha256.js"),
//             "declarations": fileURLToPath(new URL("../declarations",
//                 import.meta.url)),
//             "dfx-generated": path.resolve(__dirname, "../../.dfx/local/canisters"),
//         },
//     },
// });