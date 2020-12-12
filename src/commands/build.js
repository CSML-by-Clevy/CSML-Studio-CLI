import baseCommand from './_base';
import BotHelpers from '../helpers/bot';
import request from '../modules/request';

export default class Down extends baseCommand {
  constructor() {
    super();
    this.help = [
      'Build a new version of the bot in CSML Studio',
      '',
      'Usage: csml-studio build'.green,
      '',
      '',
      'Available options for build command:',
      '   [-k, --key]        CSML Studio API key',
      '   [-s, --secret]     CSML Studio API secret',
      '   -h, --help         show this information',
    ];
    this.aliases = { key: 'k', secret: 's', help: 'h' };
    this.authed = true;
  }

  async run() {
    const { body } = await request.post('/bot/build').set(this.credentials);
    this._success(`Built bot version ${body.id}`);
  }
}
