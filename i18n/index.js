const en = require("./translations.en.json");
const de = require("./translations.de.json");
const sk = require("./translations.sk.json");
const sv = require("./translations.sv.json");

const i18n = {
	translations: {
		en,
		de,
		sk,
		sv,
	},
	defaultLang: "en",
	useBrowserDefault: true,
};

module.exports = i18n;
