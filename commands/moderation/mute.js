const muteEnmap = require("../../exports.js").muteEnmap;
const { Command } = require("discord.js-commando");

module.exports = class muteCommand extends Command {
    constructor(client) {
        super(client, {
            name: "mute",
            aliases: ["quiet", "shh", "silence"],
            group: "moderation",
            memberName: "mute",
            description: "prevent people from speaking in your server.",
            clientPermissions: ["MANAGE_CHANNELS", "MANAGE_ROLES"],
            userPermissions: ["MANAGE_CHANNELS", "MANAGE_ROLES"],
            args: [
                {
                    key: "user",
                    prompt: "Mention the user you want to mute",
                    type: "member"
                },
                {
                    key: "length",
                    prompt: "how long do you want this person to be muted. For example 2:5 means 2 minutes and 5 seconds. And 0:30 means 30 seconds.",
                    type: "string"
                },
                {
                    key: "reason",
                    prompt: "Why are you muting this person?",
                    type: "string"
                }
            ]
        });
    }

    async run(message, { user, reason, length }) {
        if (muteEnmap.get("muteRole_" + message.guild.id) == undefined) {
            return message.channel.send(
                "Please run the setmuterole command to set a mute role."
            );
        }
        const role = message.guild.roles.cache.find(
            (x) => x.id === muteEnmap.get("muteRole_" + message.guild.id).id
        );
        if (!role) {
            return message.reply(
                "Please run the setmuterole command to set a mute role."
            );
        }
        let minutes = 0;
        let seconds = 0;
        try {
            minutes = parseInt(length.split(":")[0]);
            seconds = parseInt(length.split(":")[1]);
        } catch (err) {
            return message.channel.send(
                "Invalid length given. Enter in a format such as minute:seconds for example 2:5 means 2 minutes 5 seconds."
            );
        }
        if (minutes == 0 && seconds == 0) {
            return message.channel.send(
                "Congratulations on doing absolutely nothing."
            );
        }
        if (muteEnmap.get(message.guild.id + "_" + user.id) != undefined) {
            return message.channel.send(
                "This user is already muted. Maybe you need to change some permission settings."
            );
        }
        const currentTime = new Date();
        muteEnmap.set(message.guild.id + "_" + user.id, {
            muteEnd: currentTime.getTime() + minutes * 60000 + seconds * 1000,
            muteUser: user.id,
            muteReason: reason
        });
        user.roles.add(muteEnmap.get("muteRole_" + message.guild.id));
        await user
            .send(
                `You have been muted for ${minutes} minutes and ${seconds} seconds for ${reason}`
            )
            .catch((err) => {
                message.channel.send(
                    "Unabled to dm muted user because `" + err + "`"
                );
            });
        return message.channel.send(
            user.user.username + " has been muted for " + "**" + reason + "**"
        );
    }
};
