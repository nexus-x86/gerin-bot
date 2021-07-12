const { Command } = require("discord.js-commando");
const configEnmap = require("../../exports.js").configEnmap;
const client = require("../../exports.js").client;
const Discord = require("discord.js");

module.exports = class suggestCommand extends Command {
    constructor(client) {
        super(client, {
            name: "suggest",
            group: "fun",
            memberName: "suggest",
            description: "suggest something",
            args: [
                {
                    key: "suggestion",
                    prompt: "the suggestion",
                    type: "string"
                }
            ]
        });
    }

    async run(message, { suggestion }) {
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
        if (configEnmap.get("suggestions_" + message.guild.id) == undefined) {
            configEnmap.set("suggestions_" + message.guild.id, 0);
        }
        var count = configEnmap.get("suggestions_" + message.guild.id) + 1;
        const embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Suggestion #" + count)
            .setAuthor(
                message.author.username,
                message.author.avatarURL(),
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            )
            .setDescription(suggestion);
        const sentEmbed = await suggestionChannel.send({
            embeds: [embed]
        });
        sentEmbed.react("👍");
        sentEmbed.react("👎");
        //return;
        configEnmap.set("suggestions_" + message.guild.id, count);
        return;
    }
};
