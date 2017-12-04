const request = require('request');

module.exports = (userId) => {
  const url = `https://graph.facebook.com/v2.10/${userId}?fields=first_name,last_name&access_token=${process.env.FB_PAGE_TOKEN}`;

  const options = {
    method: 'GET',
    url,
    headers: {
      Accept: 'application/json',
    },
  };

  return {
    req: (cb) => {
      request(options, (err, response) => {
        const { body } = response;
        cb(null, body);
        return body;
      });
    },
  };
};
