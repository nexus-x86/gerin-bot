const { Command } = require('discord.js-commando');

module.exports = class delwarnCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'delwarn',
			aliases: ['deletewarn'],
			group: 'moderation',
			memberName: 'delwarn',
			description: '[prefix]delwarn [mention] [warn#]',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_MESSAGES','MANAGE_CHANNELS'],
			args: [
				{
					key: 'userWarned',
					prompt: 'Mention the user you want.',
					type: 'member',
				},
				{
					key: 'warnNum',
					prompt: 'Which warning do you want to delete.',
					type: 'string',
				},
			],
		});
	}

    run(message, {userWarned, warnNum}) {
        const warnsEnmap = this.client.warnsEnmap

		const warns = warnsEnmap.get(message.guild.id + "_" + userWarned.id);

        if (!warns?.[warnNum]) {
            return message.say("Requested warning does not exist.")
        }

        //delete warns[warnNum]
        warnsEnmap.delete(message.guild.id + "_" + userWarned.id, warns[warnNum])

        //warnsEnmap.set(message.guild.id + "_" + userWarned.id, warns)

        return message.say("Warn removed successfully.");
    }
};