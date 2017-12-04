const URLHandler = require('../services/URLHandler.js');
const BotUserService = require('../services/BotUserService.js');
const LinkService = require('../services/LinkService.js');
const FacebookUser = require('../services/FacebookUserService');

module.exports.condition = (params) => {
  if (params.message.type === 'message_received'
    && params.message.text === undefined
    && params.message.attachments.length > 0) {
    const urls = URLHandler.matchUrls(params.message.attachments[0].url);
    if (urls.length > 0) {
      return true;
    }
  }
};

module.exports.run = (params) => {
  params.controller.debug('>>> Running handleURLShare');

  const Link = LinkService(params.controller);
  const BotUser = BotUserService(params.controller);

  params.bot.startTyping(params.message);

  BotUser.load(params.message).then((botUser) => {
    FacebookUser(params.message.user).req((err, body) => {
      botUser.data = JSON.parse(body);

      params.bot.startConversation(params.message, (err2, convo) => {
        const url = URLHandler.cleanUpFBShareUrl(params.message.attachments[0].url);
        convo.say('Opa! Peguei o link compartilhado:');
        convo.say(url);

        Link.load(url).then((link) => {
          Link.save(link).then((response) => {
            botUser.links.push({
              created: new Date(),
              link_id: link.id,
            });
            botUser.interactions.push({
              timestamp: new Date(),
              type: 'handleURLShare',
            });
            BotUser.save(botUser);
          });
        });
      });
    });
  });
};
