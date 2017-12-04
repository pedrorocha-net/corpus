const bot = require('botkit-fb-bootstrap');

const storageCollections = ['bot_users', 'link'];
const routes = require('./routes');
const skills = require('./skills');
const threadSettings = require('./components/thread_settings.js');

bot.init(storageCollections, routes, skills, threadSettings);
