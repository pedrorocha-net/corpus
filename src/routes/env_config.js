module.exports = (webserver) => {
  webserver.get('/config', (req, res) => {
    const config = {
      appId: process.env.APP_ID,
      pageId: process.env.PAGE_ID,
    };
    res.send(config);
  });
};
