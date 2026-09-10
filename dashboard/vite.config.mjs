import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig(() => {
    const PORT = 3000;

    return {
        server: {
            // this ensures that the browser opens upon server start
            open: true,
            // this sets a default port to 3000
            port: PORT,
            host: true
        },
        build: {
            chunkSizeWarningLimit: 1600
        },
        preview: {
            open: true,
            host: true
        },
        define: {
            global: 'window'
        },
        resolve: {
            alias: {
                // { find: '', replacement: path.resolve(__dirname, 'src') },
                // {
                //   find: /^~(.+)/,
                //   replacement: path.join(process.cwd(), 'node_modules/$1')
                // },
                // {
                //   find: /^src(.+)/,
                //   replacement: path.join(process.cwd(), 'src/$1')
                // }
                // {
                //   find: 'assets',
                //   replacement: path.join(process.cwd(), 'src/assets')
                // },
                '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs'
            }
        },
        base: '/',
        plugins: [react(), jsconfigPaths()]
    };
});

