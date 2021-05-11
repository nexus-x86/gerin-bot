/*
  Developed by nexus_x86
  Licensed under MIT license.
*/

var { Command } = require("discord.js-commando");

module.exports = class lockCommand extends Command {
  constructor(client) {
    super(client, {
      name: "lock",
      group: "moderation",
      memberName: "lock",
      description:
        "lock a channel such that @everyone can't speak in the channel",
      clientPermissions: ["MANAGE_CHANNELS","MANAGE_ROLES"],
      userPermissions: ["MANAGE_CHANNELS","MANAGE_ROLES"],
      args: [
        {
          key: "channel",
          prompt: "Enter the channel you want to lock",
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
      SEND_MESSAGES: false,
    });
    return message.reply(
      "Channel " + "<#" + channel.id + ">" + " locked for the `@everyone` role!"
    );
  }
};
