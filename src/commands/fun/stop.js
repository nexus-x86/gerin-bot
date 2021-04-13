const { Command } = require("discord.js-commando");

module.exports = class stopCommand extends Command {
  constructor(client) {
    super(client, {
      name: "stop",
      group: "fun",
      memberName: "stop",
      description: "[prefix]stop",
      userPermissions: ["MUTE_MEMBERS"],
    });
  }

  async run(message) {
    var dispatcher = this.client.music[message.guild.id].dispatcher;
    if (dispatcher == undefined) {
      message.reply("I am not playing any songs right now.");
    }
    await this.client.music[message.guild.id].dispatcher.destroy();
    this.client.music[message.guild.id].connection.disconnect();
    this.client.music[message.guild.id].connection = undefined;
    message.reply("Stopped playing!");
    this.client.music[message.guild.id].dispatcher = undefined;
    this.client.music[message.guild.id].queue = []
  }
};
