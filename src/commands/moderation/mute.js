/*
  Developed by nexus_x86
  Licensed under MIT license.
*/

var { Command } = require("discord.js-commando");

module.exports = class muteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "mute",
      aliases: ["quiet","shh","silence"],
      group: "moderation",
      memberName: "mute",
      description: "prevent people from speaking in your server.",
      clientPermissions: ["MANAGE_CHANNELS","MANAGE_ROLES"],
      userPermissions: ["MANAGE_CHANNELS","MANAGE_ROLES"],
      args: [
        {
          key: "user",
          prompt: "Mention the user you want to mute",
          type: "member",
        },
        {
          key: "reason",
          prompt: "Why are you muting this person?",
          type: "string",
          default: "[ENTER REASON HERE]",
        },
      ],
    });
  }

  async run(message, { user, reason }) {
    var configEnmap = this.client.configEnmap;
    if (configEnmap.get("muteRole") == undefined) {
        return message.reply("Please run the setmuterole command to set a mute role.")
    }
    var role = message.guild.roles.cache.find(x => x.id === configEnmap.get("muteRole").id);
    if (!role) {
        return message.reply("Please run the setmuterole command to set a mute role.")
    } 
    console.log(configEnmap.get("muteRole"))
    user.roles.add(configEnmap.get("muteRole"))
    return message.reply("User has been muted for " + reason);
  }
};
