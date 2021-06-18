const { Command } = require("discord.js-commando");

module.exports = class purgeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "purge",
            aliases: ["clean", "clear"],
            group: "moderation",
            memberName: "purge",
            description: "Delete an amount of messages from a channel.",
            clientPermissions: ["MANAGE_MESSAGES"],
            userPermissions: ["MANAGE_MESSAGES"],
            args: [
                {
                    key: "num",
                    prompt: "How many messages do you want to delete?",
                    type: "integer"
                }
            ]
        });
    }

    async run(message, { num }) {
        if (num <= 0) {
            return message.channel.send("Invalid number");
        }
        if (num <= 100) {
            await message.channel.messages
                .fetch({ limit: num })
                .then((messages) => message.channel.bulkDelete(messages, true));
            return message.channel.send(`Messages deleted!`);
        }
        let count = num;
        while (count >= 0) {
            if (message.channel.messages.cache.size == 0) {
                break;
            }
            if (count >= 100) {
                await message.channel.messages
                    .fetch({ limit: 100 })
                    .then((messages) =>
                        message.channel.bulkDelete(messages, true)
                    );
            } else {
                await message.channel.messages
                    .fetch({ limit: count })
                    .then((messages) =>
                        message.channel.bulkDelete(messages, true)
                    );
            }
            count -= 100;
        }
        return message.channel.send(`Messages deleted!`);
    }
};
