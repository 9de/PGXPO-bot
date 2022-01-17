const {Client,MessageEmbed,Intents,MessageActionRow,MessageSelectMenu,Collection, Message} = require('discord.js');
const config = require('../configuration.json')
module.exports = {
    name: "help",
    aliases: [],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjeH2m3VZ8pBsbYrDRxUb7IvnxDD7pbZnPAeOTnFVVKpD3x5UeWoUJcP8OTf7qc8K2aZw&usqp=CAU",
    description: "To Get help for some Commands",
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
      if(!args[0]) {
      
        let PublicCatagory = client.commands.filter(commands => commands.category.toLowerCase().startsWith("public")).map(e=>`\`${e.name}\``)
        let adminCatagory = client.commands.filter(commands => commands.category.toLowerCase().startsWith("admin")).map(e=>`\`${e.name}\``)
      let embed = new MessageEmbed()
      .setAuthor({name: `${client.user.tag} Commands ❓`,iconURL:client.user.displayAvatarURL({dynamic: true})})   
    .setColor("RANDOM")
    .setDescription(`
    > **If you need help with some commands, all you have to type is ${config.prefix}help [Command]**
    `)
    .addField(`> ❯ Public (${PublicCatagory.length}) -`, PublicCatagory.join(","))
    .addField(`> ❯ Admin (${adminCatagory.length}) -`, adminCatagory.join(","))
               .setThumbnail("https://pgxpo.com/assets/img/logo@2x.png")
               .setColor("RANDOM")
       return message.reply({embeds: [embed]});
      }

        
        
        
        const commands = client.commands.find(e=>e.name === args[0])
        if(!commands) return message.reply({content: "i Can't Find This Commands"})
        if(commands.name === 'eval') return;
       let embed = new MessageEmbed()
       .setAuthor({name: `${commands.name} command Informations`,iconURL:commands.image})
       .addField("aliases :", `\`${commands.aliases.length === 0 ? "No Aliesess" : commands.aliases.map(e=>`${config.prefix}${e}`).join(" | ")}\``,true)
       .setColor("RANDOM")
       .addField("Description :", `\`${commands.description.length === 0 ? "No Description" : commands.description}\``,true)
       .addField("Category :", `\`${commands.category}\``,true)
       .addField("Cooldown :", `\`${commands.cooldown} Seconds\``,true)
       .setThumbnail(commands.image)
       if(commands.usage) {
          embed.addField("Usage :", `\`${config.prefix}${commands.name} ${commands.usage}\``,true)
       }
       
       message.reply({embeds:[embed]})
    },
};