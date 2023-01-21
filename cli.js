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
    
      if (dashboard.value === "preset") {
        const preset = await prompts({
          type: "select",
          name: "value",
          message: "Which preset?",
          choices: [
            { title: "None [None avalible right now sorry!]", value: "none" },
          ],
        });
      }
  });

commander.parse(process.argv);