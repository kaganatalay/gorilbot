const fs = require("fs");

let data = {
    description: '\n',
    assets: []
};

function loadAssetsToMemory() {
    fs.readdirSync('./assets').filter(file => file.endsWith('.txt')).forEach(file => {
        let entry = {
            command: file.substring(0, file.length - 4),
            url: fs.readFileSync(`./assets/${file}`, {encoding:'utf8', flag:'r'})
        }

        data.description += ` ${entry.command}\n`;
        data.assets.push(entry);
    });

    return data;
}

module.exports = {
    load: loadAssetsToMemory
}