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
    var dispatcher = this.client.musicDispatcher;
    if (dispatcher == undefined) {
      message.reply("I am not playing any songs right now.");
    }
    await dispatcher.destroy();
    this.client.connection.disconnect();
    message.reply("Stopped playing!");
    this.client.musicDispatcher = undefined;
    this.client.musicQueue = [];
  }
};
