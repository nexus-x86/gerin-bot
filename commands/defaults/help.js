const { Command } = require("discord.js-commando");
const fs = require("fs");
const path = require("path");

const filenames = fs.readdirSync(path.join(process.cwd() + "/commands"), {
    withFileTypes: true
});

module.exports = class helpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            group: "defaults",
            memberName: "help",
            description: "Get all the commands the bot can do."
        });
    }

    async run(message) {
        var helpStr =
            "I can only read english. Translate the command names to english in order to use them if you are viewing this text in another language. \n";
        filenames.forEach((file) => {
            let filePath = path.join(process.cwd() + "/commands/" + file.name);
            let filenames2 = fs.readdirSync(filePath, { withFileTypes: true });
            helpStr = helpStr + "__" + file.name + "__\n";
            filenames2.forEach((file2) => {
                let filePath2 = path.join(
                    process.cwd() + "/commands/" + file.name + "/" + file2.name
                );
                const exportsFile = require(filePath2);
                const exportsClass = new exportsFile(this.client);
                helpStr =
                    helpStr +
                    "**" +
                    exportsClass.name +
                    ":** " +
                    exportsClass.description +
                    "\n";
            });
        });

        message.channel.send(helpStr);
    }
};
