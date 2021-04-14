const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class infoCommand extends Command {
  constructor(client) {
    super(client, {
      name: "info",
      aliases: ["about"],
      group: "moderation",
      memberName: "info",
      description: "[prefix]info",
    });
  }

  async run(message) {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Radius")
      .setURL("https://discord.gg/xRjYGDUUgX")
      .setDescription("Created by nexus_x86#9085\nSupport server: https://discord.gg/xRjYGDUUgX");
    message.channel.send(embed);
  }
};
