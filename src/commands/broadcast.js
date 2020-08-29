import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import baseCommand from './_base';
import BotHelpers from '../helpers/bot';
import request from '../modules/request';

export default class Down extends baseCommand {
  constructor() {
    super();
    this.help = [
      'Broadcast a message from your configured channel to a group of targets',
      '',
      'Usage: csml-studio broadcast -i myfile.csv --flow_id myflow [-k MYKEY] [-s MYSECRET] [-o debug.log]',
      '',
      '',
      'Available options for broadcast command:',
      '   -i, --input        input file containing broadcast targets',
      '   --flow_id          ID or name of flow to trigger',
      '   [-k, --key]        broadcasting channel API key ID',
      '   [-s, --secret]     broadcasting channel API secret key',
      '   [-o, --output]     path to debug logs file',
      '   [-v, --verbose]    show debug info in the console',
      '   -h, --help         show this information',
    ];
    this.aliases = {
      verbose: 'v',
      output: 'o',
      input: 'i',
      key: 'k',
      secret: 's',
    };
    this.authed = true;
  }

  async run() {
    const res = [];
    const { argv } = this;
    if (!argv.input) this._error('--input argument is mandatory');
    if (!argv.flow_id) this._error('--flow_id argument is mandatory');

    const inputPath = path.resolve(__dirname, '../../', argv.i);

    if (!fs.existsSync(inputPath)) this._error(`Input file can not be found at ${inputPath}`);
    const inputData = fs.readFileSync(inputPath, 'utf-8').toString();
    const clients = inputData.split('\n').filter(i => !!i).map(user_id => ({ user_id }));

    await Promise.map(clients, async (client, idx) => {
      const metadata = {};
      const payload = {
        content_type: 'flow_trigger',
        content: {
          flow_id: argv.flow_id,
          close_flows: true,
        },
      };
      await request
        .post('/broadcasts')
        .set(this.credentials)
        .send({
          client,
          metadata,
          payload,
        })
        .then(_ => {
          res.push({
            success: true, data: { client, metadata, payload },
          });
          if ((idx % 100) === 0) console.log(`file ${argv.input} - OK ${idx}/${clients.length}`);
        })
        .catch(err => {
          res.push({
            success: false, message: err.message, error: err, data: { client, metadata, payload },
          });
          console.error(`fail - ${client.user_id} - ${err.message}`);
        });
    }, { concurrency: 3 });
    if (argv.output) {
      try {
        const filepath = argv.output.startsWith('/')
          ? argv.output
          : path.resolve(__dirname, '../../', argv.output);
        fs.writeFileSync(filepath, JSON.stringify(res, null, 2));
      } catch (err) {
        console.err(`Warning: impossible to write output to ${argv.output}. ${err.message}`.yellow);
      }
    }

    this._success(`Broadcast done with ${res.filter(r => !r.success).length} error(s) out of ${clients.length} requests.`);
  }
}
