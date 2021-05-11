/*
  Developed by nexus_x86
  Licensed under MIT license.
*/

var { Command } = require("discord.js-commando");
var discordjs = require("discord.js");

module.exports = class warningsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "warnings",
      aliases: ["infractions","warns"],
      group: "moderation",
      memberName: "warnings",
      description: "see the warnings of people",
      clientPermissions: ["MANAGE_MESSAGES"],
      userPermissions: ["MANAGE_MESSAGES"],
      args: [
        {
          key: "userMention",
          prompt: "Mention the user you want.",
          type: "member",
        },
      ],
    });
  }

  run(message, { userMention }) {
    var warnsEnmap = this.client.warnsEnmap;
    if (warnsEnmap.get(message.guild.id + "_" + userMention.id) == undefined) {
      var embed = new discordjs.MessageEmbed()
        .setColor("#FF0000")
        .setAuthor(
          userMention.user.username + " has 0 warnings.",
          userMention.user.displayAvatarURL(),
          "https://discord.gg/xRjYGDUUgX"
        );
      return message.channel.send(embed);
    }
    var warnsArray = warnsEnmap.get(message.guild.id + "_" + userMention.id);

    var warnsStr = warnsArray
      .map(
        (warn, i) =>
          `**Warn #${i}** | *Moderator: ${warn.assigner}* | *Date: ${warn.time}*| \n ${warn.reason}`
      )
      .join("\n");

    var embed = new discordjs.MessageEmbed()
      .setDescription(warnsStr)
      .setColor("#FF0000")
      .setAuthor(
        userMention.user.username + " has " + warnsArray.length + " warnings.",
        userMention.user.displayAvatarURL(),
        "https://discord.gg/xRjYGDUUgX"
      );
    return message.channel.send(embed);
  }
};
