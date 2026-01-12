import { build } from 'esbuild'
import { mkdirSync } from 'fs'
import fs from 'fs-extra'

mkdirSync('dist', { recursive: true })

await fs.copy('public', 'dist')

build({
  entryPoints: ['src/content.ts'],
  bundle: true,
  outfile: 'dist/content.js',
  target: ['chrome112', 'firefox112'],
  format: 'iife'
})
