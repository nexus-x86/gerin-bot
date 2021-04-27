const { Command } = require("discord.js-commando");

module.exports = class kickCommand extends Command {
  constructor(client) {
    super(client, {
      name: "kick",
      aliases: ["exile"],
      group: "moderation",
      memberName: "kick",
      description: "kick a person",
      clientPermissions: ["KICK_MEMBERS"],
      userPermissions: ["KICK_MEMBERS"],
      args: [
        {
          key: "user",
          prompt: "Mention the user you want to kick",
          type: "member",
        },
        {
          key: "reason",
          prompt: "Why are you kicking this person?",
          type: "string",
        },
      ],
    });
  }

  async run(message, { user, reason }) {
    await user
      .send(
        `You have been kicked for **${reason}** in **${message.guild.name}**`
      )
      .catch((err) => {
        message.say("Unabled to dm kicked user because `" + err + "`");
      });
    await user.kick(reason).catch((err) => {
      message.say("Unable to kick user because `" + err + "`");
      return;
    });
    message.say("Kick successful.");
  }
};
