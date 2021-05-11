/*
  Developed by nexus_x86
  Licensed under MIT license.
*/

var { Command } = require("discord.js-commando");

module.exports = class unlockCommand extends Command {
  constructor(client) {
    super(client, {
      name: "unlock",
      group: "moderation",
      memberName: "unlock",
      description:
        "unlock a locked channel",
      clientPermissions: ["MANAGE_CHANNELS","MANAGE_ROLES"],
      userPermissions: ["MANAGE_CHANNELS","MANAGE_ROLES"],
      args: [
        {
          key: "channel",
          prompt: "Enter the channel you want to unlock",
          type: "channel",
          default: " ",
        },
      ],
    });
  }

  async run(message, { channel }) {
    if (channel == " ") {
      channel = message.channel;
    }
    channel.updateOverwrite(channel.guild.roles.everyone, {
      SEND_MESSAGES: true,
    });
    return message.reply(
      "Channel " +
        "<#" +
        channel.id +
        ">" +
        " unlocked for the `@everyone` role!"
    );
  }
};
