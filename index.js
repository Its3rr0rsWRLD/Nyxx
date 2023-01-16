const { argv, exit } = require("process");
const prompts = require('prompts');
const fs = require('fs');
let config = require("..../nyxx.config.json");

async function check() {
    if (argv[2] === "init") {
        const name = await prompts({
            type: 'text',
            name: 'value',
            message: 'What is the name of your project?'
        });

        const dashboard = await prompts({
            type: 'select',
            name: 'value',
            message: 'What dashboard would you like to use?',
            choices: [
                { title: 'None (Make your own)', value: 'none' },
                { title: '(Add Later)', value: 'addlater' },
            ]
        });

        const dashbase = await prompts({
            type: 'select',
            name: 'value',
            message: 'What database would you like to use for configurations with your bot for guilds?',
            choices: [
                { title: 'MongoDB', value: 'mongo' },
                { title: 'Local JSON', value: 'json' },
            ]
        });
        
        if (dashboard.value === "preset") {
            const preset = await prompts({
                type: 'select',
                name: 'value',
                message: 'Which preset?',
                choices: [
                    { title: 'Soft', value: 'soft' },
                    { title: '6PG', value: '6pg' },
                    { title: 'Custom', value: 'custom' }
                ]
            });
        }
    }
}

check();
    

module.exports = {
    sync: function(client) {
        let config = require("./nyxx.config.json");

        if (!client) throw new Error("You must provide a client to sync!");
        if (!config.database) throw new Error("You must have a database in your nyxx.config.json file!");

        if (config.database.startsWith("local")) {
            let split = config.database.split(" ");
            if (!split[1]) throw new Error("You must provide a path to your database!");
            if (!fs.existsSync(split[1])) throw new Error("The path you provided does not exist!");

            global.db = require("./" + split[1]);


        }
    },

    prefix: function(guild) {
        if (!config.prefix) throw new Error("You must have a prefix in your nyxx.config.json file!");

        if (config.prefix.startsWith("global")) {
            let split = config.prefix.split(" ");
            if (!split[1]) throw new Error("You must provide a prefix!");

            return split[1];
        } else {
            return config.prefix;
        }
    },

    command: function(guild, command) {
        if (!config.commands) throw new Error("You must have a commands object in your nyxx.config.json file!");

        if (config.commands[command]) {
            return config.commands[command];
        } else {
            return false;
        }
    },

    exists: {
        guild: function(guild) {
        }
    },

    add: {
        guild: function(guild) {
            if (!config.database) throw new Error("You must have a database in your nyxx.config.json file!");
            if (!config.default) throw new Error("You must have a default object in your nyxx.config.json file!");

            // DBL: Database Location
            global.dbl = config.database.split(" ")[1];

            let contents = fs.readFileSync(global.dbl);

            // Make sure to keep everything else and don't overwrite it.
            fs.writeFileSync(global.dbl, JSON.stringify({
                ...JSON.parse(contents),
                [guild]: config.default
            }));
        }
    }
};