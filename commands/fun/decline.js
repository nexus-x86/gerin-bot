const { Command } = require("discord.js-commando");
const configEnmap = require("../../exports.js").configEnmap;
const client = require("../../exports.js").client;
const Discord = require("discord.js");

module.exports = class declineCommand extends Command {
    constructor(client) {
        super(client, {
            name: "decline",
            group: "fun",
            memberName: "decline",
            description: "decline something",
            userPermissions: ["MANAGE_MESSAGES"],
            args: [
                {
                    key: "number",
                    prompt: "the suggestions number",
                    type: "integer"
                }
            ]
        });
    }

    async run(message, { number }) {
        var suggestionChannel = configEnmap.get(
            "suggestionchannel_" + message.guild.id
        );
        if (suggestionChannel == undefined) {
            return message.channel.send(
                "Please run the setsuggestionchannel command to set a suggestion channel."
            );
        }
        suggestionChannel = client.channels.cache.get(
            configEnmap.get("suggestionchannel_" + message.guild.id)
        );
        if (suggestionChannel == undefined) {
            return message.channel.send(
                "The suggestion channel is deleted or does not exist. Please run the setsuggestionchannel command to set a suggestion channel."
            );
        }
        const embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setDescription("Suggestion #" + number + " has been declined.");
        return await suggestionChannel.send({
            embeds: [embed]
        });
    }
};
