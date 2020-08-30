import baseCommand from './_base';
import BotHelpers from '../helpers/bot';
import request from '../modules/request';

export default class Down extends baseCommand {
  constructor() {
    super();
    this.help = [
      'Download the bot from CSML Studio (replacing the local bot entirely)',
      '',
      'Usage: csml-studio down'.green,
      '',
      '',
      'Available options for down command:',
      '   [-k, --key]        CSML Studio API key',
      '   [-s, --secret]     CSML Studio API secret',
      '   -h, --help         show this information',
    ];
    this.aliases = { key: 'k', secret: 's', help: 'h' };
    this.authed = true;
  }

  async run() {
    const { body: bot } = await request.get('/bot').set(this.credentials);
    BotHelpers.writeManifest(bot, this.projectPath);

    this._success('Bot successfully downloaded!');
  }
}
