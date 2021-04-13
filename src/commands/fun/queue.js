const { Command } = require("discord.js-commando");
const discordjs = require("discord.js");

module.exports = class queueCommand extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      group: "fun",
      memberName: "queue",
      description: "[prefix]queue",
    });
  }

  async run(message) {
    const str = this.client.music[message.guild.id].queue
      .map(
        (song, i) =>
          `**Song #${i}: ${song.title}** | *Requestor: ${song.requestor.username}*`
      )
      .join("\n");
    if (str == "") {
      return message.reply("There are no songs in the queue at the moment.");
    }
    const embed = new discordjs.MessageEmbed()
      .setDescription(str)
      .setColor("#FF0000");
    return message.channel.send(embed);
  }
};
