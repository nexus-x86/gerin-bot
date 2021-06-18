var { Command } = require("discord.js-commando");
var discordjs = require("discord.js");

module.exports = class queueCommand extends Command {
    constructor(client) {
        super(client, {
            name: "queue",
            aliases: ["q"],
            group: "music",
            memberName: "queue",
            description: "See the songs currently in the queue!"
        });
    }

    async run(message) {
        var str = this.client.music[message.guild.id].queue
            .map(
                (song, i) =>
                    `**Song #${i}: ${song.title}** | *Requestor: ${song.requestor.username}*`
            )
            .join("\n");
        if (str == "") {
            return message.reply(
                "There are no songs in the queue at the moment."
            );
        }
        return message.channel.send(str);
    }
};
