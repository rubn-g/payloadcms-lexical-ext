import { defineConfig } from 'tsup';

export default defineConfig({
	entry: [ 'index.ts' ],
	format: [ 'esm' ],
	target: 'esnext',
	treeshake: true,
	tsconfig: 'tsconfig.json',
	dts: true,
	bundle: true,
	splitting: false,
	sourcemap: false,
	clean: true,
	outDir: 'build',
});
