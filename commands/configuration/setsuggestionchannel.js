const configEnmap = require("../../exports.js").configEnmap;
const { Command } = require("discord.js-commando");

module.exports = class setsuggestionchannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: "setsuggestionchannel",
            group: "config",
            memberName: "setsuggestionchannel",
            description: "set the suggestion channel",
            userPermissions: ["MANAGE_GUILD"],
            args: [
                {
                    key: "c",
                    prompt: "Send the channel",
                    type: "channel"
                }
            ]
        });
    }

    async run(message, { c }) {
        configEnmap.set("suggestionchannel_" + message.guild.id, c.id);
        return message.channel.send("The suggestion channel has been set to " + c.toString());
    }
};
