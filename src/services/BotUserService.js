const Promise = require('promise');

module.exports = (controller) => {
  const obj = {};

  obj.initiate = (id) => {
    return {
      id: id,
      started: new Date(),
      last_contact: new Date(),
      data: {},
      links: [],
      interactions: [],
      history: [],
    };
  };

  obj.getByID = (id) => {
    return controller.storage.bot_users.find({ id: id });
  };

  obj.load = (message) => {
    return new Promise((resolve) => {
      obj.getByID(message.user).then((botUsers) => {
        let botUser;

        if (botUsers.length === 0) {
          botUser = obj.initiate(message.user);
        }
        else {
          botUser = botUsers[0];
        }

        botUser.last_contact = new Date();
        botUser.history.push(message);
        resolve(botUser);
      });
    });
  };

  obj.getAll = () => {
    return controller.storage.bot_users.all();
  };

  obj.save = (botUser) => {
    return controller.storage.bot_users.save(botUser);
  };

  return obj;
};
