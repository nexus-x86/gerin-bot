const translate = require("@iamtraction/google-translate");
const Enmap = require("enmap");
const cEnmap = new Enmap({ name: "config" });
const { CommandoClient } = require("discord.js-commando");
const { Intents } = require("discord.js");
const configjson = require("./config.json");

module.exports = {
    configEnmap: cEnmap,
    warnsEnmap: new Enmap({ name: "warns" }),
    muteEnmap: new Enmap({ name: "mute" }),
    musicEnmap: new Enmap({ name: "music" }),
    translationFunc: async function (id, t) {
        var langCode = cEnmap.get("language_" + id);
        if (langCode == undefined) {
            langCode = "en";
        }

        if (langCode == "en") {
            return t;
        }

        const options = {
            to: langCode
        };

        const result = await translate(t, options);
        return result.text;
    },
    client: new CommandoClient({
        commandPrefix: configjson.prefix,
        owner: "752592264231911561",
        invite: "https://discord.gg/xRjYGDUUgX",
        intents: [Intents.ALL]
    })
};
