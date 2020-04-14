#!/usr/bin/env node
const watch = require('node-watch')
const cwd = __dirname
const { execSync } = require('child_process')
process.cwd(cwd)
try {
  execSync('yarn build', { stdio: 'inherit' })
} catch (e) {}
watch(
  './src',
  { filter: f => !/node_modules/.test(f) && /\.[tj]sx*$/.test(f) },
  () => {
    try {
      execSync('yarn build', { stdio: 'inherit' })
    } catch (e) {}
  },
)
