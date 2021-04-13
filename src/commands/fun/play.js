const { Command } = require("discord.js-commando");
const ytdl = require("ytdl-core");
const fetch = require("node-fetch");
const baseURL = "https://www.youtube.com/oembed?format=json&url=";

module.exports = class playCommand extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      group: "fun",
      memberName: "play",
      description: "[prefix]play [youtube url]",
      args: [
        {
          key: "url",
          prompt: "Link of youtube video you want to play.",
          type: "string",
        },
      ],
    });
  }

  async songPlay(message) {
    if (this.client.music[message.guild.id].connection != undefined) {
      return console.log("Already playing a song.");
    }
    this.client.music[message.guild.id].connection = await message.member.voice.channel.join()
    if (this.client.music[message.guild.id].queue.length == 0) {
      return console.log("Queue has ended");
    }
    const musicObject = this.client.music[message.guild.id].queue[0];
    message.channel.send(
      `Playing ${musicObject["title"]}. Requested by ${musicObject["requestor"].username}`
    );
    this.client.music[message.guild.id].queue.shift();
    this.client.music[message.guild.id].dispatcher = await this.client.music[message.guild.id].connection.play(
      ytdl(musicObject["url"], { quality: "highestaudio" })
    )
    this.client.music[message.guild.id].dispatcher.on("finish", () => {
      // this.client.musicDispatcher.destroy();
      // this.client.musicDispatcher = undefined;
      // this.client.connection = undefined;
      // this.songPlay(message);
      this.client.music[message.guild.id].dispatcher.destroy();
      this.client.music[message.guild.id].dispatcher = undefined;
      this.client.music[message.guild.id].connection = undefined 
      this.songPlay(message)
    })
    /*
    if (this.client.connection != undefined) {
      console.log("Already playing a song");
      return; // already playing a song
    }
    const connection = await message.member.voice.channel.join();
    if (this.client.musicQueue[message.guild.id].length == 0) {
      console.log("Queue has ended");
      return; // Queue has ended
    }
    const musicObject = this.client.musicQueue[message.guild.id][0];
    message.channel.send(
      `Playing ${musicObject["title"]}. Requested by ${musicObject["requestor"].username}`
    );
    this.client.musicQueue[message.guild.id].shift();

    this.client.musicDispatcher = await connection.play(
      ytdl(musicObject["url"], { quality: "highestaudio" })
    );
    this.client.connection = connection;
    this.client.musicDispatcher.on("finish", () => {
      this.client.musicDispatcher.destroy();
      this.client.musicDispatcher = undefined;
      this.client.connection = undefined;
      this.songPlay(message);
    });
    */
  }

  async run(message, { url }) {
    if (message.member.voice.channel == null) {
      return message.reply(
        "You need to be in a voice channel to use this command."
      );
    }
    fetch(baseURL + url)
      .then((res) => res.json())
      .catch((err) => {
        return message.reply(
          "Your url may have been invalid or there was an error making an http request. This is the error: ``" +
            err +
            "``"
        );
      })
      .then(async (body) => {
        if (body["title"] == undefined) {
          return;
        }
        message.channel.send(`Added ${body["title"]} to the song queue. `);
        const songRequestObject = {
          title: body["title"],
          url: url,
          requestor: message.author,
        };
        if (this.client.music[message.guild.id] == undefined) {
          this.client.music[message.guild.id] = [];
        }
        if (this.client.music[message.guild.id].queue == undefined) {
          this.client.music[message.guild.id].queue = []
        }
        await this.client.music[message.guild.id].queue.push(songRequestObject);
        this.songPlay(message);
        return;
      });
  }
};
