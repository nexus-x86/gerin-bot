const { Command } = require("discord.js-commando");
const warnsEnmap = require("../../exports.js").warnsEnmap;

module.exports = class delwarnCommand extends Command {
    constructor(client) {
        super(client, {
            name: "delwarn",
            aliases: ["deletewarn"],
            group: "moderation",
            memberName: "delwarn",
            description: "delete the warning of someone",
            clientPermissions: ["MANAGE_MESSAGES"],
            userPermissions: ["MANAGE_MESSAGES"],
            args: [
                {
                    key: "userWarned",
                    prompt: "Mention the user you want.",
                    type: "member"
                },
                {
                    key: "warnNum",
                    prompt: "Which warning do you want to delete.",
                    type: "string"
                }
            ]
        });
    }

    run(message, { userWarned, warnNum }) {
        const warns = warnsEnmap.get(message.guild.id + "_" + userWarned.id);

        if (!warns?.[warnNum]) {
            return message.say("Requested warning does not exist.");
        }

        warnsEnmap.delete(
            message.guild.id + "_" + userWarned.id,
            warns[warnNum]
        );

        return message.say("Warn removed successfully.");
    }
};
