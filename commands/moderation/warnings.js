const { Command } = require("discord.js-commando");
const warnsEnmap = require("../../exports.js").warnsEnmap;

module.exports = class warningsCommand extends Command {
    constructor(client) {
        super(client, {
            name: "warnings",
            aliases: ["infractions", "warns"],
            group: "moderation",
            memberName: "warnings",
            description: "see the warnings of people",
            clientPermissions: ["MANAGE_MESSAGES"],
            userPermissions: ["MANAGE_MESSAGES"],
            args: [
                {
                    key: "userMention",
                    prompt: "Mention the user you want.",
                    type: "member"
                }
            ]
        });
    }

    run(message, { userMention }) {
        if (
            warnsEnmap.get(message.guild.id + "_" + userMention.id) == undefined
        ) {
            return message.channel.send("This person has no warnings.");
        }
        const warnsArray = warnsEnmap.get(
            message.guild.id + "_" + userMention.id
        );

        const warnsStr = warnsArray
            .map(
                (warn, i) =>
                    `**Warn #${i}** | *Moderator: ${warn.assigner}* | *Date: ${warn.time}*| \n ${warn.reason}`
            )
            .join("\n");
        return message.channel.send(warnsStr);
    }
};
