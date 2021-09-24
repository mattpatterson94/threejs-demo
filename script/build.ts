import * as esbuild from 'esbuild'
import fs from 'fs'

const sourcemap = process.env.NODE_ENV !== 'production'
const minify = process.env.NODE_ENV === 'production'

export const buildOptions: esbuild.BuildOptions = {
  entryPoints: ['index.tsx', 'index.css'],
  minify,
  sourcemap,
  bundle: true,
  format: 'esm',
  target: 'es2020',
  outdir: 'public/dist',
  publicPath: 'dist',
  loader: {
    '.png': 'file',
    '.jpg': 'file'
  }
}

fs.rmSync('./public/dist', { recursive: true, force: true })

esbuild.build(buildOptions)
  .then(result => {
    result.errors?.length && console.error(result.errors)
    result.warnings?.length && console.warn(result.errors)

    console.log('Rebuilt')
  })
  .catch(() => process.exit(1))
