const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
    name: "setavatar",
    image : "https://thumbs.dreamstime.com/z/square-182495676.jpg",
    aliases: ["sta"],
    description: "To Change A bot avatar",
    category: "admin",
    Adminonly: true,
    guildOnly: true,
    cooldown: 120,
    args: 1,
    
    usage: "[Avatar Link]",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args 
     */
    execute(client,message, args) {
          if(!args[0].startsWith("https://") || args[0].startsWith("http://")) {
              return message.reply({content: "> **Please enter an image link only** !"})
          }
          try {
              client.user.setAvatar(args[0]).then(msg => {
                  message.reply({content: "> **Done ✅** !"}).catch(()=>{return;})
              })
          } catch(e) {
              let embed = new MessageEmbed()
              .setDescription(e)
              .setColor("RANDOM")
              message.reply({content: "i Got Some Error", embeds: [embed] }).catch(()=>{return;})
          }
        
    },
};