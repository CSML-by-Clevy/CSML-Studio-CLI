const request = require('superagent');
const prefix = require('superagent-prefix');

module.exports = request.agent()
  .use(prefix('https://clients.csml.dev/v1/api'))
  .accept('application/json')
  .set('Content-Type', 'application/json')
  .on('error', (err) => {
    const message = err.response.text;
    throw new Error(message);
  });
