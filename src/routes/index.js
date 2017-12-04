const incomingWebhooks = require('./incoming_webhooks.js');
const envConfig = require('./env_config.js');

const routes = [envConfig, incomingWebhooks];

module.exports = routes;
