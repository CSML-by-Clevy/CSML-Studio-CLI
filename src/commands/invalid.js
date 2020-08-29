/* eslint-disable no-sparse-arrays */
import minimist from 'minimist';
import baseCommand from './_base';

export default class Invalid extends baseCommand {
  async run() {
    this._error('Invalid command');
  }
}
