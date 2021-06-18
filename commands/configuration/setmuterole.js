const muteEnmap = require("../../exports.js").muteEnmap;
const { Command } = require("discord.js-commando");

module.exports = class setmuteroleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "setmuterole",
            group: "config",
            memberName: "setmuterole",
            description: "set the mute role",
            userPermissions: ["MANAGE_MESSAGES"],
            args: [
                {
                    key: "role",
                    prompt: "Send the exact name of the role.",
                    type: "string"
                }
            ]
        });
    }

    async run(message, { role }) {
        const foundRole = message.guild.roles.cache.find(
            (r) => r.name === role
        );

        if (foundRole == undefined) {
            return message.channel.send(
                "Specified role not found. Please send the exact name of the role."
            );
        }

        muteEnmap.set("muteRole_" + message.guild.id, foundRole);

        return message.channel.send(
            "The role has been set to " + foundRole.name
        );
    }
};
