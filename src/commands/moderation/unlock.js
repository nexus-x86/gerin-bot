const { Command } = require("discord.js-commando");

module.exports = class unlockCommand extends Command {
  constructor(client) {
    super(client, {
      name: "unlock",
      group: "moderation",
      memberName: "unlock",
      description:
        "[prefix]unlock [optional: channel (will default to current channel)]",
      clientPermissions: ["MANAGE_CHANNELS"],
      userPermissions: ["MANAGE_CHANNELS"],
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
