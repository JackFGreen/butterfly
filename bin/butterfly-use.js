#!/usr/bin/env node
const program = require('commander')
const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const { log } = require('../tools')

program
  .usage('<plugin> [options]')
  .option('-p, --params, <params...>', 'run with params')
  .parse(process.argv)

/**
 * plugin
 */
const plugin = program.args[0]

const pluginDir = path.resolve(__dirname, `../plugins/${plugin}`)

const hasPlugin = fs.existsSync(pluginDir)
if (!hasPlugin) {
  log('plugin is not exist', 'red')
  return
}

const pkgDir = path.join(pluginDir, './pkg')
const pkgFile = 'pkg.sh'
const pkg = path.join(pkgDir, pkgFile)

const tplDir = path.join(pluginDir, './tpl')
const tpl = path.join(tplDir, './*')

/**
 * options
 * pkg tpl
 */
const options = program.opts()
const params = options.params || ['pkg', 'tpl']

if (params.includes('pkg')) {
  runPkg(pkg)
}
if (params.includes('tpl')) {
  runTpl(tpl)
}
log('done')

function runPkg(pkg) {
  log('run pkg')
  shell.exec(pkg)
}

function runTpl(tpl) {
  log('run tpl')
  shell.cp('-R', tpl, './')
}
