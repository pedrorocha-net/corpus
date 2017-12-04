const BotUserService = require('../services/BotUserService.js');
const FacebookUser = require('../services/FacebookUserService');

module.exports.condition = (params) => {
  if (params.message.type === 'facebook_postback'
    && params.message.payload === 'PAYLOAD_START') {
    return true;
  }
};

module.exports.run = (params) => {
  const BotUser = BotUserService(params.controller);

  params.bot.startTyping(params.message);

  BotUser.load(params.message).then((botUser) => {
    FacebookUser(params.message.user).req((err, body) => {
      botUser.data = JSON.parse(body);

      params.bot.startConversation(params.message, (err2, convo) => {
        convo.say(`Oi, ${botUser.data.first_name}, tudo bem?`);
        convo.say('Estou aqui para te ajudar a organizar seus links e referências :)');
        convo.say('A ideia é que você envie URLs(pode colar diretamente aqui ou compartilhar de outros apps para mim');
        convo.say('Ao compartilhar uma URL, o ideal é que você adicione um texto com sua análise sobre o conteúdo, assim como #hashtags, para ajudar a categorizar');
        convo.say('O pequeno segredo é que usarei um pouco de Inteligência Artificial por debaixo dos panos, para complementar o que você sugerir');
        convo.say('Quando quiser, é só mandar seu primeiro link ;)');
      });

      botUser.interactions.push({
        timestamp: new Date(),
        type: 'onboarding',
      });
      BotUser.save(BotUser);
    });
  });
};
