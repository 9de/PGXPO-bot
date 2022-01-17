const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "setusername",
    image : "https://prnt.sc/26efzeg",
    aliases: ["stu","اسم"],
    description: "to Change a username of bot",
    category: "Admin",
    guildOnly: true,
    Adminonly: true,
    cooldown: 120,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async execute(client,message, args) {
      let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setLabel("Yes")
        .setStyle("SUCCESS")
        .setCustomId("yes")
        .setEmoji("✅"),
        new MessageButton()
        .setLabel("No")
        .setCustomId("no")
        .setEmoji("❌")
        .setStyle("DANGER")
      )
    let username = message.content.split(" ").slice(1).join(" ")
    if(!username) return message.reply({content: "**Please enter the name you want to change ❌**"})
    let embed = new MessageEmbed()
    .setAuthor({name: "Are You sure ❓", iconURL: message.member.displayAvatarURL({dynamic: true})})
    .setDescription(`> **Are you sure you want to change your name from ${client.user.username} to ${username} ❓**`)
    .setThumbnail(message.member.displayAvatarURL({dynamic: true}))
    .setColor("RANDOM")
    .setTimestamp()
   const msg = await  message.reply({embeds:[embed],components:[row]})
const filter = (button) => button.member.id === message.author.id
const collecter = msg.createMessageComponentCollector({componentType: "BUTTON",filter,time:15000})

collecter.on("collect", async (button) => {
 await button.deferUpdate()
  if(button.customId.includes('yes')) {
     client.user.setUsername(username).then(msgg => {
     let embed = new MessageEmbed()
     .setAuthor({name: "I changed the name of the bot ✅",iconURL:client.user.displayAvatarURL({dynamic: true})})
     .setDescription(`**I changed the name of the bot to \`${client.user.username}\`**`)
     .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
     .setColor("RANDOM")
     .setTimestamp()
     message.reply({embeds:[embed]}).then(msgg => {
       setTimeout(() => {
        msgg.delete().catch(()=>{return;})
        msg.delete().catch(()=>{return;})
        message.delete.catch(()=>{return;})
       }, 3000);
     })
   }).catch(() => {
   
     message.reply({content: "> **You have reached rating limits, so You can't change the username of bot ❌**"});
   })
  }
  if(button.customId.includes("no")) {
 
    msg.delete().catch(()=>{return;})
    message.reply({content: "> **The command has been cancelled ❌**",ephemeral:true}).then(m => {
      setTimeout(() => {
        m.delete().catch(()=>{return;})
           message.delete().catch(()=>{return;})
      }, 3000);
    })
  }
})
  
    },
};