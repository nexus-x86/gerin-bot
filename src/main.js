/*
  Developed by nexus_x86
  Licensed under MIT license.
*/

var path = require("path");
var enmap = require("enmap");
var configjson = require("./config.json");
var { CommandoClient } = require("discord.js-commando");

var TOKEN = configjson.token;
var prefix = configjson.prefix;

var client = new CommandoClient({
  commandPrefix: prefix,
  owner: "752592264231911561",
  invite: "https://discord.gg/xRjYGDUUgX",
});

client.warnsEnmap = new enmap({ name: "warns" });
client.configEnmap = new enmap({ name: "config"});
client.music = {
  /*
  guildid = {
    dispatcher: [dispatcher],
    connection: [connection],
    queue: [array of obj's]
  }
  */
};

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["fun", "Fun commands"],
    ["moderation", "Moderation commands"],
    ["music","Music commands"],
    ["config","Configuration commands"]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commands"));

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildCreate', () => {
    client.channels.cache.get("835681281949696022").send("Joined another epic server!");
});

client.login(TOKEN);