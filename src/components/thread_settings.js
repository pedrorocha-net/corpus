module.exports = (controller) => {
  controller.api.messenger_profile.greeting('Oi {{user_first_name}}! Sou o Corpus, e você pode contar comigo para ajudar a organizar seus links e referências.');
  controller.api.messenger_profile.get_started('PAYLOAD_START');

  const persistentMenu = [
    {
      title: 'Ajuda',
      type: 'postback',
      payload: 'PAYLOAD_START',
    },
  ];

  controller.api.messenger_profile.menu([
    {
      locale: 'default',
      call_to_actions: persistentMenu,
    },
    {
      locale: 'en_US',
      call_to_actions: persistentMenu,
    },
  ]);
};
