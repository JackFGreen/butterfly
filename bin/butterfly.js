#!/usr/bin/env node

const program = require('commander')

program
  .version(require('../package.json').version)
  .usage('<command> [options]')
  .command('use', 'use plugin')
  .parse(process.argv)
