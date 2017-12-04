const Promise = require('promise');

module.exports = (controller) => {
  const obj = {};

  obj.initiate = (url) => {
    return {
      id: url,
      created: new Date(),
    };
  };

  obj.getByID = (id) => {
    return controller.storage.link.find({id});
  };

  obj.load = (url) => {
    const promise = new Promise((resolve) => {
      obj.getByID(url).then((links) => {
        let link;

        if (links.length === 0) {
          link = obj.initiate(url);
        }
        else {
          link = links[0];
        }
        resolve(link);
      });
    });
    return promise;
  };

  obj.save = (link) => {
    return controller.storage.link.save(link);
  };

  return obj;
};
