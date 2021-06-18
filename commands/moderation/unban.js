const { Command } = require("discord.js-commando");

module.exports = class unbanCommand extends Command {
    constructor(client) {
        super(client, {
            name: "unban",
            group: "moderation",
            memberName: "unban",
            description: "Unban a user from a guild.",
            clientPermissions: ["BAN_MEMBERS"],
            userPermissions: ["BAN_MEMBERS"],
            args: [
                {
                    key: "id",
                    prompt: "Enter the user id of the member you want to unban.",
                    type: "string"
                }
            ]
        });
    }

    async run(message, { id }) {
        await message.guild.members
            .unban(id)
            .then(() => {
                return message.channel.send("Unban successful.");
            })
            .catch((err) => {
                message.say(
                    "Unable to unban user because `" +
                        err +
                        "` Please remember to send the user id of the person you wish to unban."
                );
            });
    }
};
