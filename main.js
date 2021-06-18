const path = require("path");
const configjson = require("./config.json");
const { Structures } = require("discord.js");
const translationFunc = require("./exports.js").translationFunc;
require("./muteHandler.js");

Structures.extend("TextChannel", (TextChannel) => {
    return class TranslatedChannelSend extends TextChannel {
        constructor(guild, data) {
            super(guild, data);
        }

        async send(content) {
            if (typeof content === "string") {
                // translate content
                return super.send(
                    await translationFunc(this.guild.id, content)
                );
            }
            return super.send(content);
        }
    };
});

Structures.extend("Message", (Message) => {
    return class TranslatedMessage extends Message {
        constructor(...data) {
            super(...data);
        }

        async reply(content) {
            if (typeof content === "string") {
                // translate content
                return super.reply(
                    await translationFunc(this.guild.id, content)
                );
            }
            return super.reply(content);
        }

        async edit(content) {
            if (typeof content === "string") {
                // translate content
                return super.edit(
                    await translationFunc(this.guild.id, content)
                );
            }
            return super.edit(content);
        }
    };
});

const client = require("./exports.js").client;
client.music = {
    /*
    guildid = {
      dispatcher: [dispatcher],
      connection: [connection],
      queue: [array of obj's]
    }
    */
};
client.on("commandError", (_, error) => console.error(error));

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["moderation", "Moderation"],
        ["config", "Configuration"],
        ["defaults", "Default Commands"],
        ["fun", "Fun Commands"],
        ["music", "Music Commands"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: false
    })
    .registerCommandsIn(path.join(__dirname, "commands"));

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(configjson.token);
