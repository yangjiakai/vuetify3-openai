export default class Bot {
    static _logoPackedPaths = null;
    static _isAvailable = false;

    static _brandId = "bot"; // Brand id of the bot, should be unique. Used in i18n.
    static _className = "Bot"; // Class name of the bot
    static _model = ""; // Model of the bot (eg. "text-davinci-002-render-sha")
    static _logoFilename = "default-logo.svg"; // Place it in public/bots/
    static _loginUrl = "undefined";
    static _userAgent = ""; // Empty string means using the default user agent
    static _lock = null; // AsyncLock for prompt requests. `new AsyncLock()` in the subclass as needed.
    static _settingsComponent = ""; // Vue component filename for settings
    static _outputFormat = "markdown"; // "markdown" or "html"

    static getInstance() {
        return new this();
    }


}