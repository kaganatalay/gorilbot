const discordKey = process.env.GORIL_BOT;
if (discordKey === undefined) {
    console.log("GORIL_BOT is not set!");
    process.exit(1);
}

const loader = require('./helpers/loadAssetsToMemory.js');
const discord = require('discord.js');

const client = new discord.Client();

let { assets, description } = loader.load();

client.on('ready', () => {
    console.log('Beep boop 🤖');
    client.user.setActivity('Yarwdım');
});

client.on('message', message => {
    let raw = message.content.toLowerCase();
    console.log(message);
    if(raw == 'yarwdım') {
        const embed = new discord.MessageEmbed()
        .setColor('#e67e22')
        .setTitle('Kullanılabilir Kowmutlar')
        .setDescription(`\`\`\` ${description} \`\`\``);

        message.channel.send(embed);
    } else {
        for(let image of images) {
            if(raw == image.command) {
                message.channel.send({files: ["./assets/" + image.url]});
            }
        }
    }
});

client.login(discordKey);