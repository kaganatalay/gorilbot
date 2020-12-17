const fs = require("fs");

let commands = [];
function loadCommands() {
    fs.readdirSync('./commands').filter(file => file.endsWith('.js')).forEach(file => {
        let entry = {
            command: file.substring(0, file.length - 3),
            execute: fs.readFileSync(`./assets/${file}`, {encoding:'utf8', flag:'r'})
        }

        data.description += ` ${entry.command}\n`;
        data.assets.push(entry);
    });

    return data;
}

module.exports = {
    load: loadAssetsToMemory
}