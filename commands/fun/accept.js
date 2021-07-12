const { Command } = require("discord.js-commando");
const configEnmap = require("../../exports.js").configEnmap;
const client = require("../../exports.js").client;
const Discord = require('discord.js');

module.exports = class acceptCommand extends Command {
    constructor(client) {
        super(client, {
            name: "accept",
            group: "fun",
            memberName: "accept",
            description:
                "accept something",
            args: [
                {
                    key: "number",
                    prompt: "the suggestions number",
                    type: "integer"
                }
            ]
        });
    }

    async run(message, {number}) {
        var suggestionChannel = configEnmap.get("suggestionchannel_" + message.guild.id);
        if (suggestionChannel == undefined) {
            return message.channel.send("Please run the setsuggestionchannel command to set a suggestion channel.");
        }
        suggestionChannel = client.channels.cache.get(configEnmap.get("suggestionchannel_" + message.guild.id));
        if (suggestionChannel == undefined) {
            return message.channel.send("The suggestion channel is deleted or does not exist. Please run the setsuggestionchannel command to set a suggestion channel.");
        }
        const embed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setDescription("Suggestion #" + number + " has been approved.")
        return await suggestionChannel.send({
            embeds: [embed]
        });
    }
};
