var en = require('./translations.en.json');
var de = require('./translations.de.json');
var sk = require('./translations.sk.json');
var sv = require('./translations.sv.json');

const i18n = {
  translations: {
    en,
    de,
    sk,
    sv,
  },
  defaultLang: 'en',
  useBrowserDefault: true,
};

module.exports = i18n;
