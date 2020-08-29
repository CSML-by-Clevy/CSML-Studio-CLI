/* eslint-disable no-sparse-arrays */
import minimist from 'minimist';
import auth from '../helpers/auth';
import botHelpers from '../helpers/bot';

export default class baseCommand {
  constructor() {
    this.help = [
      'Usage: csml-studio [command] [options]'.green,
      '',
      'Available commands:',
      '   help:         display this help information',
      '   init:         initialize a new CSML Studio project',
      '   down:         download the latest version of the bot from CSML Studio',
      '   up:           upload your local bot to CSML Studio',
      '   build:        build a new version of your bot on CSML Studio',
      '   validate:     validate the contents of your local bot',
      '   broadcast:    send a message to a given user_id in the current channel',
    ];
    this.aliases = {};
    this.authed = false;
  }

  init() {
    this.argv = minimist(process.argv.slice(2), { alias: this.aliases || {} });
    if (this.authed) this.credentials = auth(this.argv);

    this.projectPath = process.env.PWD;
  }

  /**
   * Print normal usage of current method and exit with code 0 or 1
   *
   * @param {*} hasError
   */
  _usage(hasError = false) {
    console.log('');
    (this.help || []).forEach(line => console.log(line));
    console.log('');
    process.exit(hasError ? 1 : 0);
  }

  /**
   * Print error, usage and exit with code 1
   *
   * @param {*} message
   */
  _error(message) {
    console.error('');
    console.error(`Error: ${message}`.red);
    this._usage(true);
  }

  /**
   * Print success message then exit
   *
   * @param {*} message
   */
  // eslint-disable-next-line class-methods-use-this
  _success(message) {
    console.log();
    console.log(message.green);
    console.log();
    process.exit();
  }

  /**
   * Main command handler
   */
  run() {
    this._usage();
  }
}
