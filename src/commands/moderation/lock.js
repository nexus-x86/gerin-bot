const { Command } = require("discord.js-commando");

module.exports = class lockCommand extends Command {
  constructor(client) {
    super(client, {
      name: "lock",
      group: "moderation",
      memberName: "lock",
      description:
        "lock a channel such that @everyone can't speak in the channel",
      clientPermissions: ["MANAGE_CHANNELS","MANAGE_PERMISSIONS"],
      userPermissions: ["MANAGE_CHANNELS","MANAGE_PERMISSIONS"],
      args: [
        {
          key: "channel",
          prompt: "Mention the user you want to kick",
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
