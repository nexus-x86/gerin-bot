const cats = [
  100,
  101,
  102,
  200,
  201,
  202,
  204,
  206,
  207,
  300,
  301,
  302,
  303,
  304,
  305,
  307,
  308,
  400,
  401,
  402,
  403,
  404,
  405,
  406,
  408,
  409,
  410,
  411,
  412,
  413,
  414,
  415,
  416,
  417,
  418,
  420,
  421,
  422,
  423,
  424,
  425,
  426,
  429,
  431,
  444,
  450,
  451,
  499,
  500,
  501,
  502,
  503,
  504,
  506,
  507,
  508,
  509,
  510,
  511,
  599,
];

const { Command } = require("discord.js-commando");

module.exports = class httpCatCommand extends Command {
  constructor(client) {
    super(client, {
      name: "httpcat",
      group: "fun",
      memberName: "httpcat",
      description: "[prefix]httpcat",
    });
  }

  async run(message) {
    message.channel.send(
      "https://http.cat/" + cats[Math.floor(Math.random() * cats.length)]
    );
  }
};
