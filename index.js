const { argv, exit } = require("process");
const prompts = require("prompts");
const fs = require("fs");
const { join } = require("path");

let dir = __dirname.split("node_modules")[0];

if (!fs.existsSync(join(dir + "nyxx.config.json"))) {
  throw new Error(
    "You need a nyxx.config.json file to run nyxx!" + dir + "nyxx.config.json"
  );
}

const config = require(join(dir + "nyxx.config.json"));

function guildCheck(guild) {
  if (!global.db[guild]) {
    fs.writeFileSync(
      global.dbl,
      JSON.stringify({
        ...JSON.parse(fs.readFileSync(global.dbl)),
        [guild]: config.default,
      })
    );

    return 2;
  }
}

async function check() {
  if (argv[2] === "init") {
    const name = await prompts({
      type: "text",
      name: "value",
      message: "What is the name of your project?",
    });

    const dashboard = await prompts({
      type: "select",
      name: "value",
      message: "What dashboard would you like to use?",
      choices: [
        { title: "None (Make your own)", value: "none" },
        { title: "(Add Later)", value: "addlater" },
      ],
    });

    const dashbase = await prompts({
      type: "select",
      name: "value",
      message:
        "What database would you like to use for configurations with your bot for guilds?",
      choices: [
        { title: "MongoDB", value: "mongo" },
        { title: "Local JSON", value: "json" },
      ],
    });

    if (dashboard.value === "preset") {
      const preset = await prompts({
        type: "select",
        name: "value",
        message: "Which preset?",
        choices: [
          { title: "Soft", value: "soft" },
          { title: "6PG", value: "6pg" },
          { title: "Custom", value: "custom" },
        ],
      });
    }
  }
}

check();

module.exports = {
  sync: function (client) {
    if (!client) throw new Error("You must provide a client to sync!");
    if (!config.database)
      throw new Error(
        "You must have a database in your nyxx.config.json file!"
      );

    if (config.database.startsWith("local")) {
      let split = config.database.split(" ");
      if (!split[1])
        throw new Error("You must provide a path to your database!");
      if (!fs.existsSync(split[1]))
        throw new Error("The path you provided does not exist!");

      global.db = require(join(dir + split[1]));
    }
  },

  // Get the prefix of a guild.
  prefix: function (guild) {
    if (guildCheck(guild) === 2) {
      return config.default.prefix;
    }

    if (!config.prefix)
      throw new Error("You must have a prefix in your nyxx.config.json file!");

    if (config.prefix.startsWith("global")) {
      global.dbl = config.prefix.split(" ");
      if (!split[1]) throw new Error("You must provide a prefix!");

      return split[1];
    } else {
      return config.prefix;
    }
  },

  guild: function (guild) {
    if (!config.database)
      throw new Error(
        "You must have a database in your nyxx.config.json file!"
      );
    if (!config.default)
      throw new Error(
        "You must have a default object in your nyxx.config.json file!"
      );
    
    let db = JSON.parse(fs.readFileSync(global.dbl));

    if (!db[guild]) {
      return false;
    }

    return {
      get: function (guild) {
        if (!config.database)
          throw new Error(
            "You must have a database in your nyxx.config.json file!"
          );

        let db = JSON.parse(fs.readFileSync(global.dbl));

        if (!db[guild]) {
          return false;
        }

        return db[guild];
      },

      update: function (guild, json) {
        if (!config.database)
          throw new Error(
            "You must have a database in your nyxx.config.json file!"
          );

        let contents = fs.readFileSync(global.dbl);

        // Make sure to keep everything else and don't overwrite it.
        fs.writeFileSync(
          global.dbl,
          JSON.stringify({
            ...JSON.parse(contents),
            [guild]: json,
          })
        );
      },

      delete: function (guild) {
        if (!config.database)
          throw new Error(
            "You must have a database in your nyxx.config.json file!"
          );

        let contents = fs.readFileSync(global.dbl);

        // Make sure to keep everything else and don't overwrite it.
        fs.writeFileSync(
          global.dbl,
          JSON.stringify({
            ...JSON.parse(contents),
            [guild]: null,
          })
        );
      },

      add: function (guild, idk) {
        if (!config.database)
          throw new Error(
            "You must have a database in your nyxx.config.json file!"
          );
        if (!config.default)
          throw new Error(
            "You must have a default object in your nyxx.config.json file!"
          );

        let contents = fs.readFileSync(global.dbl);

        fs.writeFileSync(
          global.dbl,
          JSON.stringify({
            ...JSON.parse(contents),
            [guild]: config.default,
          })
        );
      },

      list: function () {
        if (!config.database)
          throw new Error(
            "You must have a database in your nyxx.config.json file!"
          );

        let db = JSON.parse(fs.readFileSync(global.dbl));

        return db;
      },

      config: function (file) {
        if (!fs.existsSync(file))
          throw new Error("The path you provided does not exist!");
        
        global.config = json.parse(fs.readFileSync(file) || {});
      },
    }
  },
};
