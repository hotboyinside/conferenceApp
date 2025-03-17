import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	return defineConfig({
		plugins: [react()],
		server: {
			port: env.VITE_PORT ? Number(env.VITE_PORT) : 3001,
			host: true,
		},
		build: {
			sourcemap: mode === 'development',
		},
		preview: {
			port: env.VITE_PORT ? Number(env.VITE_PORT) : 3001,
		},
	});
};

// https://vitejs.dev/config/
