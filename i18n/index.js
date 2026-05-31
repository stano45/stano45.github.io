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
	// Browser-language detection must stay off here: it would run during the
	// initial render on the client only, mismatching the statically prerendered
	// (English) HTML and causing a hydration error. Detection is handled after
	// mount in _app.tsx instead.
	useBrowserDefault: false,
};

module.exports = i18n;
