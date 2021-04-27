const { Command } = require("discord.js-commando");
const discordjs = require("discord.js");

module.exports = class unbanCommand extends Command {
  constructor(client) {
    super(client, {
      name: "unban",
      group: "moderation",
      memberName: "unban",
      description: "unban people",
      clientPermissions: ["BAN_MEMBERS"],
      userPermissions: ["BAN_MEMBERS"],
      args: [
        {
          key: "user",
          prompt: "Send the user id of the person you want to unban.",
          type: "string",
        },
      ],
    });
  }

  async run(message, { user }) {
    await message.guild.members
      .unban(user)
      .then((_v) => {
        const embed = new discordjs.MessageEmbed()
          .setDescription("Unban successful!.")
          .setColor("#00FF00");
        return message.channel.send(embed);
      })
      .catch((err) => {
        message.say("Unable to unban user because `" + err + "`");
      });
  }
};
