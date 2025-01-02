import * as esbuild from 'esbuild'
import { tailwindPlugin } from 'esbuild-plugin-tailwindcss';

async function build(args) {
	await esbuild.build({
		entryPoints: [ 'client.ts' ],
		bundle: true,
		outdir: 'build',
		platform: 'browser',
		format: 'esm',
		splitting: true,
		target: 'esnext',
		external: [
			'@payloadcms/*',
			'@payloadcms/ui',
			'@payloadcms/ui/*',
			'@lexical/*',
			'payload',
			'payload/*',
			'react',
		],
		packages: 'external',
		minify: true,
		metafile: true,
		treeShaking: true,
		tsconfig: './tsconfig.json',
		plugins: [
			tailwindPlugin({
				config: './tailwind.config.js'
			}),
			// removeCSSImports,
			/*commonjs({
				ignore: ['date-fns', '@floating-ui/react'],
			  }),*/
		],
		sourcemap: true,
	})
	.catch((e) => {
		console.error(e)
	})
}

build(process.argv.slice(2))
