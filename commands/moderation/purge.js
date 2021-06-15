const { Command } = require("discord.js-commando");

module.exports = class purgeCommand extends Command {
	constructor(client) {
		super(client, {
			name: "purge",
            aliases: ["clean","clear"],
			group: "moderation",
			memberName: "purge",
			description: "Delete an amount of messages from a channel.",
			clientPermissions: ["MANAGE_MESSAGES"],
      		userPermissions: ["MANAGE_MESSAGES"],
            args: [
				{
					key: "messages",
					prompt: "How many messages do you want to delete?",
					type: "integer",
				},
                {
					key: "channel",
					prompt: "Which channel are you deleting the messages from?",
					type: "channel",
				},
			],
		});
	}

	async run(message, {member, days, reason}) {
        
	}
};