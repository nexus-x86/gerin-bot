/*
  Developed by nexus_x86
  Licensed under MIT license.
*/

var { Command } = require("discord.js-commando");
var ytdl = require("ytdl-core");
var fetch = require("node-fetch");
var baseURL = "https://www.youtube.com/oembed?format=json&url=";

module.exports = class playCommand extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      aliases: ["p"],
      group: "music",
      memberName: "play",
      description: "play a youtube video in a voice channel with this command",
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
    if (this.client.music[message.guild.id].playingSong == true) {
      return console.log("Already playing a song." + Date.now());
    }
    this.client.music[message.guild.id].connection = await message.member.voice.channel.join()
    if (this.client.music[message.guild.id].queue.length == 0) {
      return console.log("Queue has ended");
    }
    this.client.music[message.guild.id].playingSong = true;
    var musicObject = this.client.music[message.guild.id].queue[0];
    message.channel.send(
      `Removed ${musicObject["title"]} from queue.`
    );
    message.channel.send(
      `Playing ${musicObject["title"]}. Requested by ${musicObject["requestor"].username}`
    );
    this.client.music[message.guild.id].queue.shift();
    this.client.music[message.guild.id].dispatcher = await this.client.music[message.guild.id].connection.play(
      ytdl(musicObject["url"], { quality: "highestaudio" })
    )
    this.client.music[message.guild.id].dispatcher.on("finish", async () => {
      if (this.client.music[message.guild.id].queue.length == 0) {
        await this.client.music[message.guild.id].dispatcher.destroy();
        this.client.music[message.guild.id].connection.disconnect();
        this.client.music[message.guild.id].connection = undefined;
        this.client.music[message.guild.id].dispatcher = undefined;
        this.client.music[message.guild.id].playingSong = false;
      } else {
        this.client.music[message.guild.id].playingSong = false;
        this.songPlay(message);
      }
    })
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
        var songRequestObject = {
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