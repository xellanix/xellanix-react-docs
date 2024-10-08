import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	plugins: [react()],
	build: {
		minify: true,
		assetsInlineLimit: 0,
		rollupOptions: {
			output: {
				manualChunks: {
					"comlink-worker": ["comlink"],
				},
			},
		},
	},
});
