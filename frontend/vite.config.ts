import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import config from "../config.json";

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: config.frontend.port,
		proxy: {
			"/api": `http://localhost:${config.backend.port}`,
		}
	}
});
