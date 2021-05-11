/*
  Developed by nexus_x86
  Licensed under MIT license.
*/

var { Command } = require("discord.js-commando");

module.exports = class setMuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "setmuterole",
      aliases: undefined,
      group: "config",
      memberName: "setmuterole",
      description: "config command where you set the mute role.",
      clientPermissions: ["MANAGE_CHANNELS","MANAGE_ROLES"],
      userPermissions: ["MANAGE_CHANNELS","MANAGE_ROLES"],
    });
  }

  async run(message) {
    var configEnmap = this.client.configEnmap;
    
  }
};
