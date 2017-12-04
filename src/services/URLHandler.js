const urlRegex = require('url-regex');

module.exports.matchUrls = (text) => {
  let result;
  const urls = text.match(urlRegex());
  if (urls) {
    result = urls;
  }
  else {
    result = [];
  }
  return result;
};

module.exports.cleanUpFBShareUrl = (uri) => {
  let clean = decodeURIComponent(uri).replace('https://l.facebook.com/l.php?u=', '');
  clean = clean.substring(0, clean.indexOf('&h='));
  return clean;
};
