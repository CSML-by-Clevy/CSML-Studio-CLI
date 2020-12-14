import Promise from 'bluebird';
import baseCommand from './_base';
import BotHelpers from '../helpers/bot';
import request from '../modules/request';

export default class Up extends baseCommand {
  constructor() {
    super();
    this.help = [
      'Save your bot in CSML Studio',
      '',
      'Usage: csml-studio up'.green,
      '',
      '',
      'Available options for up command:',
      '   [-r, --rules]      overwrite the existing AI rules for the bot',
      '   [-k, --key]        CSML Studio API key',
      '   [-s, --secret]     CSML Studio API secret',
      '   -h, --help         show this information',
    ];
    this.aliases = {
      rules: 'r',
      key: 'k',
      secret: 's',
      help: 'h'
    };
    this.authed = true;
  }

  async run() {
    const localBot = BotHelpers.readManifest(this.projectPath);
    const studioBot = await BotHelpers.getFromStudio(this.credentials);
    const localFlows = localBot.flows;
    const { credentials } = this;

    console.log('Uploading bot...'.yellow);
    // make sure that the new default_flow is uploaded first
    // if that flow does not already exist, it must be created first
    const defFlow = localBot.flows.find(f => f.name === localBot.default_flow);
    let defFlowStudio = studioBot.flows.find(f => f.name === defFlow.name);
    if (!defFlowStudio) {
      console.log('Uploading default flow...'.yellow);
      defFlowStudio = await request.post('/bot/flows').set(credentials).send(defFlow);
    }
    // bot default_flow must use correct reference to flow ID, not name
    localBot.default_flow = defFlowStudio.id;

    // remove distant flows that don't exist anymore
    console.log('Removing discarded flows...'.yellow);
    await Promise.map(studioBot.flows, async sf => {
      if (localFlows.find(lf => lf.name === sf.name)) return;
      await request.del(`/bot/flows/${sf.id}`).set(credentials);
    }, { concurrency: 10 });

    // create new flows that were added locally
    console.log('Creating new flows...'.yellow);
    await Promise.map(localFlows, async lf => {
      if (defFlow.name === lf.name) return;
      if (studioBot.flows.find(sf => sf.name === lf.name)) return;
      await request.post('/bot/flows').set(credentials).send(lf);
    }, { concurrency: 10 });

    // update flows that exist in both places
    console.log('Updating old flows...'.yellow);
    await Promise.map(localFlows, async lf => {
      const f = studioBot.flows.find(sf => sf.name === lf.name);
      if (!f) return;
      await request.put(`/bot/flows/${f.id}`).set(credentials).send(lf);
    }, { concurrency: 10 });

    // update the bot's AI rules
    if (this.rules) {
      console.log('Updating AI rules...'.yellow);
      const { airules = [] } = localBot;
      await request.put('/bot').set(credentials).send({ airules });
    }

    // update the bot.json
    console.log('Updating local manifest...'.yellow);
    const { body: updatedBot } = await request.get('/bot').set(credentials);

    BotHelpers.writeManifest(updatedBot, this.projectPath);

    this._success('Bot successfully uploaded!');
  }
}
