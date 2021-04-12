const { Command } = require("discord.js-commando");

module.exports = class banCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      aliases: [""],
      group: "moderation",
      memberName: "ban",
      description: "[prefix]ban [mention] [reason]",
      clientPermissions: ["BAN_MEMBERS"],
      userPermissions: ["BAN_MEMBERS"],
      args: [
        {
          key: "user",
          prompt: "Mention the user you want to ban",
          type: "member",
        },
        {
          key: "reason",
          prompt: "Why are you banning this person?",
          type: "string",
        },
      ],
    });
  }

  async run(message, { user, reason }) {
    await user
      .send(
        `You have been banned for **${reason}** in **${message.guild.name}**`
      )
      .catch((err) => {
        message.say("Unabled to dm banned user because `" + err + "`");
        return;
      });
    await user.ban({ days: 0, reason: reason }).catch((err) => {
      message.say("Unable to ban user because `" + err + "`");
      return;
    });
    message.say("Ban successful.");
  }
};
