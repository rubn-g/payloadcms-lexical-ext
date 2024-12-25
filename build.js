import * as esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'

async function build(args) {
	await esbuild.build({
		entryPoints: [ 'client.ts' ],
		bundle: true,
		outdir: 'build',
		platform: 'browser',
		format: 'esm',
		splitting: true,
		external: [
			// '*.scss',
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
			sassPlugin({ css: 'external' }),
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
