const discordKey = process.env.GORIL_BOT;
if (discordKey === undefined) {
    console.log("GORIL_BOT is not set!");
    process.exit(1);
}

const { Client, Message, MessageEmbed } = require("discord.js");
const fs = require("fs");

const client = new Client();

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', message => {
    if(message.content == 'ping') {
        message.reply("pong");
    }
    
});

client.login(discordKey);