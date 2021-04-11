const { Command } = require('discord.js-commando');
const discordjs = require('discord.js');

module.exports = class warningsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'warnings',
			aliases: ['infractions'],
			group: 'moderation',
			memberName: 'warnings',
			description: '[prefix]warnings [mention]',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_MESSAGES','MANAGE_CHANNELS'],
            args: [
				{
					key: 'userMention',
					prompt: 'Mention the user you want.',
					type: 'member',
				},
			],
		});
	}

    run(message , {userMention}) {
        const warnsEnmap = this.client.warnsEnmap
        if (warnsEnmap.get(message.guild.id + "_" + userMention.id) == undefined) {
            const embed = new discordjs.MessageEmbed()
			.setColor('#FF0000')
			.setAuthor(userMention.user.username + " has 0 warnings.", userMention.user.displayAvatarURL(), "https://discord.gg/FernczgPfd")
			return message.channel.send(embed);
        }
        const warnsArray = warnsEnmap.get(message.guild.id + "_" + userMention.id);

        const warnsStr = warnsArray.map((warn, i) => `**Warn #${i}** | *Moderator: ${warn.assigner}* | *Date: ${warn.time}*| \n ${warn.reason}`).join('\n')

        const embed = new discordjs.MessageEmbed()
        .setDescription(warnsStr)
        .setColor('#FF0000')
        .setAuthor(userMention.user.username + " has " + warnsArray.length + " warnings.", userMention.user.displayAvatarURL(), "https://discord.gg/FernczgPfd")
        return message.channel.send(embed);
    }
};