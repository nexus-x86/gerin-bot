const { Command } = require('discord.js-commando');

module.exports = class warnCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'warn',
			aliases: ['warning'],
			group: 'moderation',
			memberName: 'warn',
			description: '[prefix]warn [mention] [reason]',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_MESSAGES','MANAGE_CHANNELS'],
			args: [
				{
					key: 'userWarned',
					prompt: 'Mention the user you want to warn',
					type: 'member',
				},
				{
					key: 'reason',
					prompt: 'Why are you warning this person?',
					type: 'string',
				},
			],
		});
	}

    run(message, {userWarned, reason}) {
		const warnsEnmap = this.client.warnsEnmap
		if (warnsEnmap.get(message.guild.id + "_" + userWarned.id) == undefined) {
			warnsEnmap.set(message.guild.id + "_" + userWarned.id,[])
		}

		//warnsEnmap.push(message.guild.id + "_" + userWarned.id, reason);
		warnsEnmap.push(message.guild.id + "_" + userWarned.id, {
			reason: reason,
			time: new Date(),
			assigner: message.author.username
		});

		return message.say(userWarned.user.username + " has been warned for " + "**" + reason + "**");
	}
};