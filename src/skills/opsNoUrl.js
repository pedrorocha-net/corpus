const URLHandler = require('../services/URLHandler.js');
const BotUserService = require('../services/BotUserService.js');
const FacebookUser = require('../services/FacebookUserService');

module.exports.condition = (params) => {
  if (params.message.type === 'message_received'
    && params.message.text
    && URLHandler.matchUrls(params.message.text).length === 0) {
    return true;
  }
};

module.exports.run = (params) => {
  params.controller.debug('>>> Running opsNoUrl');

  const BotUser = BotUserService(params.controller);

  params.bot.startTyping(params.message);

  BotUser.load(params.message).then((botUser) => {
    FacebookUser(params.message.user).req((err, body) => {
      botUser.data = JSON.parse(body);

      params.bot.startConversation(params.message, (err2, convo) => {
        convo.say(`Oi ${botUser.data.first_name}! Eu só sei lidar com links.`);
        convo.say('Se quiser compartilhar algo, é só mandar ;)');
      });

      botUser.interactions.push({
        timestamp: new Date(),
        type: 'opsNoURL',
      });
      BotUser.save(botUser);
    });
  });
};
