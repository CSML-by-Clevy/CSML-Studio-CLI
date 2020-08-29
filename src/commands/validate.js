import baseCommand from './_base';
import BotHelpers from '../helpers/bot';

export default class Validate extends baseCommand {
  constructor() {
    super();
    this.help = [
      'Validate your local bot',
      '',
      'Usage: csml-studio validate',
      '',
      '',
      'Available options for validate command:',
      '   [-k, --key]        CSML Studio API key',
      '   [-s, --secret]     CSML Studio API secret',
      '   -h, --help         show this information',
    ];
    this.aliases = {
      key: 'k',
      secret: 's',
      help: 'h',
    };
    this.authed = true;
  }

  async run() {
    const bot = BotHelpers.readManifest(this.projectPath);
    const res = await BotHelpers.validateBot(bot, this.credentials);
    if (res.valid) return this._success('Bot is valid CSML!');

    console.error('\nThere are errors in your bot:'.red);
    res.errors.forEach(e => {
      console.error(`Flow ${e.flow}, step ${e.step}, line ${e.line}, col ${e.col}: ${e.message}`.yellow);
    });
    console.log();
  }
}
