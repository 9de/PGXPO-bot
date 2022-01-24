const { Client, Message, MessageEmbed } = require("discord.js");
const os = require('os')
const discordjsversion = require('../package.json').dependencies["discord.js"]
module.exports = {
    name: "bot",
    image: "https://pbs.twimg.com/profile_images/1058706213129474048/0Z-kRgbx_400x400.jpg",
    aliases: ["info","معلومات"],
    description: "To get the bot information!",
    category: "public",
    guildOnly: true,
    cooldown: 2, // Seconds
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {string[]} args 
     */
    execute(client,message, args) {
            const cpu = os.cpus()[0].model
    
            const ram = os.totalmem()
            const createdbot = `<t:${Math.floor(client.user.createdTimestamp / 1000)}:R>`
             
            let embed = new MessageEmbed()
            .setAuthor({name: `${client.user.tag} Bot Inforamtion's`,iconURL:client.user.displayAvatarURL({dynamic: true})})
            .addField("> Created at 📅", createdbot,true)
            .addField(`> Description 📄`, `Hello, I am ${client.user.username}'s bot. I can help you to get information about any player in PGXPO server\n[Github](https://github.com/9de/PGXPO-bot) | [Instagram](https://instagram.com/ljzb) | [Youtube](https://www.youtube.com/watch?v=U9r_unk7GC8)`,true)
            .addField("> PC information's 💻", `CPU: \`${cpu.trim()}\`\n Total Ram:\`${ram}\``,true)
            .addField("> Uptime bot ⏲:", `\`${require('pretty-ms')(client.uptime)}\``,true)
            .addField("> Nodejs Version:",`\`${process.version}\``,true)
            .addField("> Discord.js Version:",`\`${discordjsversion.replace("^","")}\``,true)
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
            .setFooter({text: "Developer By Turki",iconURL:client.user.displayAvatarURL({dynamic: true})})
            message.reply({embeds:[embed]})


            
    },
};
