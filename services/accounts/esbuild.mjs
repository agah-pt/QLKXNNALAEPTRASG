import * as esbuild from 'esbuild'
import esbuildPluginTsc from 'esbuild-plugin-tsc'

await esbuild.build({
  entryPoints: ['src/app.ts'],
  bundle: true,
  outfile: 'dist/app.js',
  platform: "node",
  sourcemap: "inline",
  plugins: [
    esbuildPluginTsc(),
  ],
})
