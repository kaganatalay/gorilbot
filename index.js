const discordKey = process.env.GORIL_BOT;
const tenorKey = process.env.TENOR_KEY;
if (discordKey === undefined) {
    console.log("GORIL_BOT is not set!");
    process.exit(1);
}

if (tenorKey === undefined) {
    console.log("TENOR_KEY is not set!");
    process.exit(1);
}

const loader = require('./helpers/loadAssetsToMemory.js');
const fetch = require('node-fetch');
const discord = require('discord.js');

const client = new discord.Client();

let { assets, description } = loader.load();

client.on('ready', () => {
    console.log('Beep boop');
    client.user.setActivity('Yarwdım');
});

// USE ./helpers/loadCommands.js AND SEPERATE EACH COMMAND TO IT'S OWN FILE

client.on('message', message => {
    let raw = message.content.toLowerCase();

    if(raw == 'yarwdım') {
        const embed = new discord.MessageEmbed()
        .setColor('#1abc9c')
        .setTitle('Kullanılabilir Kowmutlar')
        .setDescription(`\`\`\` giwf\`\`\`\n\`\`\` ${description} \`\`\``);

        message.channel.send(embed);
    } else if(raw == 'giwf') {
        fetch(`https://api.tenor.com/v1/search?q=gorilla&key=${tenorKey}`)
        .then(response => {
            return response.json();
        })
        .then(search => {
            let link = search.results[Math.floor(Math.random() * search.results.length)].url;
            message.channel.send(link);
        });
    } else {
        for(let asset of assets) {
            if(raw == asset.command) {
                message.channel.send(asset.url);
            }
        }
    }
});

client.login(discordKey);