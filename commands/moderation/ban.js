const { Command } = require("discord.js-commando");

module.exports = class banCommand extends Command {
	constructor(client) {
		super(client, {
			name: "ban",
			group: "moderation",
			memberName: "ban",
			description: "Ban a user from a guild.",
			clientPermissions: ["BAN_MEMBERS"],
     		userPermissions: ["BAN_MEMBERS"],
            args: [
				{
					key: "member",
					prompt: "Which member do you want to ban?",
					type: "member",
				},
                {
					key: "days",
					prompt: "How many days of messages should be purged from this member?",
					type: "integer",
				},
                {
					key: "reason",
					prompt: "Why are you banning this member?",
					type: "string",
				},
			],
		});
	}

	async run(message, {member, days, reason}) {
        if (days < 0 || days > 7) {
            return message.channel.send("The days argument must be between 0 and 7 days.");
        }
        await member.send(`You have been banned for **${reason}** in **${message.guild.name}**`).catch((err) => {
            return message.channel.send(`Unable to dm ${member.user.username} because of ${err}`);
        })
        await member.ban({
            days: days,
            reason: reason
        }).catch((err) => {
            return message.channel.send(`Unable to ban ${member.user.username} because of ${err}`);
        });
        return message.channel.send(`${member.user.username} has been banned for ${reason}`);
	}
};