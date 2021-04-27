const { Command } = require("discord.js-commando");
const memeAPI = "https://meme-api.herokuapp.com/gimme";
const fetch = require("node-fetch");

module.exports = class memeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "meme",
      aliases: [],
      group: "fun",
      memberName: "meme",
      description: "this command fetch's a random meme and gives it to you",
    });
  }

  async run(message) {
    fetch(memeAPI)
      .then((res) => res.json())
      .then((json) => {
        message.channel.send(json["preview"][3]);
      });
  }
};
