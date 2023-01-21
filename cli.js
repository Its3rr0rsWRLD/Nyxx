const commander = require("commander");
const prompts = require("prompts");
const fs = require("fs");
const process = require("process");

commander
  .command('init')
  .description('Initialize the project')
  .action(async (options) => {
    const name = await prompts({
        type: "text",
        name: "value",
        message: "What is the name of your project?",
      });
    
    if (fs.existsSync(name.value)) {
      const name = await prompts({
        type: "text",
        name: "value",
        message: "That project name already exists! Please choose another name.",
      });
    }

    
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
          { title: "Local JSON", value: "json" },
        ],
      });

      if (!fs.existsSync(name.value)) {
        fs.mkdirSync(name.value);
      }

      fs.writeFileSync(name.value + "/nyxx.config.json", JSON.stringify({
          "database": "local guilds/db.json",
          "default": {
              "welcomeChannel": null,
              "welcomeMessage": null,
              "welcomeEnabled": false
          }
      }, null, 2));

      // Add dashboard later

      if (fs.existsSync(name.value + "/guilds")) {
        fs.rm(name.value + "/guilds", { recursive: true });

        fs.mkdirSync(name.value + "/guilds");
      } else {
        fs.mkdirSync(name.value + "/guilds");
      }

      fs.writeFileSync(name.value + "/guilds/db.json", JSON.stringify({}, null, 2));

      console.log("\x1b[32m", "[⚡] Created project " + name.value + " successfully!", "\x1b[0m");
  });

commander.parse(process.argv);