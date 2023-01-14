const { argv, exit } = require("process");
const prompts = require('prompts');
const fs = require('fs');

if (argv[2] === "init") {
    // Ask the user what the project name is
    // Ask the user if they are using their own dashboard or a preset one
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
            { title: 'None', value: 'none' },
            { title: 'Preset', value: 'preset' },
        ]
    });

    const end = await prompts({
        type: 'select',
        name: 'value',
        message: 'Are you going to be making the front-end or the back-end?',
        choices: [
            { title: 'Front-end', value: 'front' },
            { title: 'Back-end', value: 'back' },
            { title: 'Both', value: 'both' },
            { title: 'Neither', value: 'neither' }
        ]
    });

    const bot = await prompts({
        type: 'select',
        name: 'value',
        message: 'Are you making a new bot or adding to an existing one?',
        choices: [
            { title: 'New', value: 'new' },
            { title: 'Existing', value: 'existing' }
        ]
    });

    if (dashboard.value === "none") {
        console.log("Uhhhhhhhhhh then why are you using this?");
        exit();
    } else if (dashboard.value === "preset") {
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
    

module.exports = {
};