/*
  Developed by nexus_x86
  Licensed under MIT license.
*/

var { Command } = require("discord.js-commando");
var fetch = require("node-fetch");

var memelist = undefined;

async function run() {
  memelist = await fetch("https://www.reddit.com/r/dankmemes/top/.json?count=1000");
  memelist = await memelist.json();
  memelist = memelist["data"]["children"]
}
run();

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

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
    if (memelist.length == 0) {
      memelist = await fetch("https://www.reddit.com/r/dankmemes/top/.json?count=1000");
      memelist = await memelist.json();
      memelist = memelist["data"]["children"]
      memelist = shuffle(memelist)
    }
    var post = memelist[0]["data"]["url"];
    message.channel.send(post);
    memelist.shift();
  }
};
