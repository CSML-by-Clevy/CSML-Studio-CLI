const request = require('superagent');
const prefix = require('superagent-prefix');

const { STUDIO_ENDPOINT = 'https://clients.csml.dev/v1/api' } = process.env;

module.exports = request.agent()
  .use(prefix(STUDIO_ENDPOINT))
  .accept('application/json')
  .set('Content-Type', 'application/json')
  .on('error', (err) => {
    const message = err.response.text;
    throw new Error(message);
  });
