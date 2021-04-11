const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');

module.exports = class playCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			group: 'fun',
			memberName: 'play',
			description: '[prefix]play [youtube url]',
			args: [
				{
					key: 'url',
					prompt: 'Link of youtube video you want to play.',
					type: 'string',
				},
			],
		});
	}

    async run(message, {url}) {
		if (message.member.voice.channel == null) {
			return message.reply("You need to be in a voice channel to use this command.");
		}
		var dispatcher = this.client.musicDispatcher
		if (dispatcher != undefined) {
			return message.reply("I am already playing a song!");
		}
        const connection = await message.member.voice.channel.join();
        //connection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { quality: 'highestaudio' }));
        this.client.musicDispatcher = await connection.play(ytdl(url, { quality: 'highestaudio' }));
		this.client.connection = connection
		message.reply("Playing the song!");
		this.client.musicDispatcher.on('finish', () => {
			this.client.musicDispatcher.destroy();
			this.client.musicDispatcher = undefined;
			
		});
    }
};