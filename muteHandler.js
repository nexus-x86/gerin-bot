const muteEnmap = require("./exports.js").muteEnmap;
const client = require("./exports.js").client;
setInterval(() => {
    muteEnmap.forEach(async (value, key) => {
        if (!value) return;
        if (key.split("_")[0] != "muteRole") {
            const guildID = key.split("_")[0];
            const guild = client.guilds.cache.get(guildID);
            let user = guild.members.cache.get(value.muteUser);
            if (!user) {
                user = await guild.members.fetch(value.muteUser);
                if (!user) return;
            }
            const muteEnd = value.muteEnd;
            const currentTime = new Date();
            const diff = currentTime.getTime() - muteEnd;
            if (diff >= 0) {
                user.roles.remove(muteEnmap.get("muteRole_" + guildID));
                muteEnmap.delete(guildID + "_" + user.id);
            }
        }
    });
}, 1000);
