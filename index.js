const discordKey = process.env.GORIL_BOT;
if (discordKey === undefined) {
    console.log("GORIL_BOT is not set!");
    process.exit(1);
}

const { Client, Message, MessageEmbed } = require("discord.js");
const fs = require("fs");

const client = new Client();


let images = [];
let description = '\n';
fs.readdirSync('./assets').filter(file => file.endsWith('.png')).forEach(file => {
    let entry = {
        command: file.substring(0, file.length - 4),
        url: file
    }

    description += entry.command + "\n";
    images.push(entry);
});

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', message => {
    let raw = message.content.toLowerCase();

    if(raw == 'yarwdım') {
        const embed = new MessageEmbed()
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