const discordKey = process.env.GORIL_BOT;
if (discordKey === undefined) {
    console.log("GORIL_BOT is not set!");
    process.exit(1);
}

const { Client, Message, MessageEmbed } = require("discord.js");
const fs = require("fs");

const client = new Client();


let images = [];
fs.readdirSync('./assets').filter(file => file.endsWith('.png')).forEach(file => {
    images.push(file);
});

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', message => {
    let raw = message.content.toLowerCase();
    for(let image of images) {
        let stripped = image.substring(0, image.length - 4);
        if(raw == stripped) {
            message.channel.send({files: ["./assets/" + image]});
        }
    }

    
});

client.login(discordKey);