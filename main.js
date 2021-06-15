const { CommandoClient } = require("discord.js-commando");
const path = require("path");
const configjson = require("./config.json");
const { Structures } = require("discord.js")
const translationFunc = require("./exports.js").translationFunc;

Structures.extend('TextChannel', (TextChannel) => {
    return class TranslatedChannelSend extends TextChannel {
        constructor(guild, data) {
            super(guild, data);
        }

        send(content) {
            if (typeof content === "string") {
                // translate content
                return super.send(translationFunc(super.guild.id,content));
            }
            return super.send(content);
        }
    };
});

const client = new CommandoClient({
	commandPrefix: configjson.prefix,
	owner: "752592264231911561",
	invite: "https://discord.gg/xRjYGDUUgX",
});

client.on("commandError", (_, error) => console.error(error))

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["moderation", "Moderation"],
    ["config","Configuration"]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commands"));

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(configjson.token);