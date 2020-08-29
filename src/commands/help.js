/* eslint-disable no-sparse-arrays */
import minimist from 'minimist';
import baseCommand from './_base';

export default class Help extends baseCommand {
  async run() {
    this._usage();
  }
}
