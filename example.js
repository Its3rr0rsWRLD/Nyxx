const nyxx = require('./index.js');
const { GatewayIntentBits } = require("discord.js");
const discord = require("discord.js");
const client = new discord.Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
    console.log("Ready!");
});

client.login("token");