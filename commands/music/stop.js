var { Command } = require("discord.js-commando");

module.exports = class stopCommand extends Command {
    constructor(client) {
        super(client, {
            name: "stop",
            aliases: ["s"],
            group: "music",
            memberName: "stop",
            description: "Clears queue and makes bot stop playing music",
            userPermissions: ["MUTE_MEMBERS"],
            clientPermissions: ["MUTE_MEMBERS"]
        });
    }

    async run(message) {
        if (
            this.client.music[message.guild.id] == undefined ||
            this.client.music[message.guild.id].dispatcher == undefined
        ) {
            return message.reply("I am not playing any songs right now.");
        }
        await this.client.music[message.guild.id].dispatcher.destroy();
        await this.client.music[message.guild.id].connection.disconnect();
        this.client.music[message.guild.id].playingSong = false;
        this.client.music[message.guild.id].connection = undefined;
        message.reply("Stopped playing!");
        this.client.music[message.guild.id].dispatcher = undefined;
        this.client.music[message.guild.id].queue = [];
    }
};
