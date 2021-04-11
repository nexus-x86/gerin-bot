const { Command } = require('discord.js-commando');

module.exports = class purgeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'purge',
			aliases: ['clear'],
			group: 'moderation',
			memberName: 'purge',
			description: '[prefix]purge [number]',
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
			args: [
				{
					key: 'num',
					prompt: 'Number of messages you want to delete.',
					type: 'integer',
				},
			],
		});
	}

    async run(message, {num}) {
        await message.channel.messages.fetch({limit: num})
        .then(messages => message.channel.bulkDelete(messages));
        message.channel.send(`${num} messages deleted!`)
    }
};