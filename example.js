const nyxx = require('./index.js');
const { GatewayIntentBits } = require("discord.js");
const discord = require("discord.js");
const client = new discord.Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", async () => {
    console.log("Ready!");
});

client.on("messageCreate", async (message) => {

    const guild = message.guild.id;

    // If the guild is not in the database, use nyxx.add.guild(guild) to add it.
    if (!nyxx.exists.guild(guild)) {
        // Add the guild to the database
        nyxx.add.guild(guild);
    }

    if (message.content.startsWith(nyxx.prefix(guild))) {
        if (nyxx.command(guild, "ping")) {
            message.channel.send("Pong!");
        }
    }
});

client.login("token");