#!/usr/bin/env node

import 'source-map-support/register';

import 'colors';
import commands from './commands';

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function capitalize() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const argv = require('minimist')(process.argv.slice(2), {});

function getCommand(name) {
  if (!name) return new commands.Help();

  const Name = name.capitalize();
  if (commands[Name]) return new commands[Name]();

  return new commands.Invalid();
}

(async () => {
  const cmd = getCommand(argv._[0]);

  if (argv.help || argv.h) return cmd._usage();

  await cmd.init();
  await cmd.run();
  process.exit(0);
})().catch(err => {
  if (process.env.DEBUG === 'true') console.log(err);
  console.error(err.message.red);
});
