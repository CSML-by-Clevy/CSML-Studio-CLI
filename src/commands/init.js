import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import baseCommand from './_base';
import BotHelpers from '../helpers/bot';
import request from '../modules/request';

export default class Down extends baseCommand {
  constructor() {
    super();
    this.help = [
      'Create a new CSML Studio project',
      '',
      'Usage: csml-studio init',
      '',
      '',
      'Available options for init command:',
      '   -p, --path         Initial path for bot folder',
      '   [-k, --key]        CSML Studio API key',
      '   [-s, --secret]     CSML Studio API secret',
      '   -h, --help         show this information',
    ];
    this.aliases = {
      key: 'k', secret: 's', help: 'h', path: 'p',
    };
    this.authed = true;
  }

  async run() {
    this.projectPath = path.resolve(process.env.PWD, this.argv.path || './');

    await mkdirp(this.projectPath);
    await mkdirp(path.join(this.projectPath, 'flows'));
    if (fs.existsSync(path.join(this.projectPath, './bot.json'))) throw new Error('Requested path has already been initialized.');

    const bot = await BotHelpers.getFromStudio(this.credentials);
    BotHelpers.writeManifest(bot, this.projectPath);

    const key = this.argv.k || process.env.API_KEY;
    const secret = this.argv.s || process.env.API_SECRET;
    const env = `${key}\n${secret}\n`;
    fs.writeFileSync(path.join(this.projectPath, './.env'), env);

    this._success(`Successfully initialized CSML Studio project at ${this.projectPath}`);
  }
}
