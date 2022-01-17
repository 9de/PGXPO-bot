const { Client, Message,MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const streamurl = require('../configuration.json').streamingurl;
module.exports = {
  name: "setActivity",
  aliases: ["sta","حالة","Activity"],
  description: "To change the activity of the bot",
  category: "admin",
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
    const activity = message.content.split(" ").slice(1).join(" ")
    if(!activity) return message.reply({content: "**> Please write what you want to show in the activity ❌**"})
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setCustomId("streaming")
      .setEmoji("932408700898017341")
      .setLabel("STREAMING")
      .setStyle("DANGER"),
      new MessageButton()
      .setCustomId("watching")
      .setEmoji("932409570431746068")
      .setLabel("WATCHING")
      .setStyle("PRIMARY"),
      new MessageButton()
      .setCustomId("playing")
      .setEmoji("932410666084605983")
      .setLabel("PLAYING")
      .setStyle("SECONDARY"),
      new MessageButton()
      .setCustomId("listening")
      .setLabel("LISTENING")
      .setEmoji("932411391468519544")
      .setStyle("SUCCESS")
    )
    let embed = new MessageEmbed()
    .setAuthor({name: "I've got the thing you want to appear in the activity",iconURL: message.member.displayAvatarURL({dynamic: true})})
    .setDescription(`> **${activity}**\n\n> **Please select the status you want to appear in the bot**`)
const msg = await message.reply({embeds:[embed],components:[row]})
const filter = (button) => button.member.id === message.author.id
const collecter = msg.createMessageComponentCollector({componentType:"BUTTON",filter,time:15000})

collecter.on('collect', async (button) => {
  await button.deferUpdate();
  if(button.customId.includes("streaming")) {
    if(!streamurl) return message.reply({content: "> **I could not get the link from the config file, please contact the owner of the bot ❌**"})
    if(!streamurl.startsWith("https://") || streamurl.startsWith("http://")) return message.reply({content: "> **Error The link entered in the config file does not start with https://**"})
     client.user.setActivity({name: activity,type:"STREAMING",url:streamurl})
     msg.delete()
     button.channel.send({content: `> ${message.author} **Done ✅**`}).then(msg => {
      setTimeout(() => {
         message.delete().catch(()=>{return;})
         msg.delete().catch(()=>{return;})
       }, 3500);
     })
  }
  if(button.customId.includes("watching")) {

 client.user.setActivity({name: activity,type:"WATCHING"})
 msg.delete().catch(()=>{return;})
 button.channel.send({content: `> ${message.author} **Done ✅**`}).then(msg => {
  setTimeout(() => {
        message.delete().catch(()=>{return;})
         msg.delete().catch(()=>{return;})
       }, 3500);
      })
  }
  if(button.customId.includes("playing")) {

    client.user.setActivity({name: activity,type:"PLAYING"})
    msg.delete().catch(()=>{return;})
    button.channel.send({content: `> ${message.author} **Done ✅**`}).then(msg => {
      setTimeout(() => {
            message.delete().catch(()=>{return;})
            msg.delete().catch(()=>{return;})
          }, 3500);
         })
     }
     if(button.customId.includes("listening")) {
      client.user.setActivity({name: activity,type:"LISTENING"})
      msg.delete().catch(()=>{return;})
      button.channel.send({content: `> ${message.author} **Done ✅**`}).then(msg => {
            setTimeout(() => {
              message.delete().catch(()=>{return;})
              msg.delete().catch(()=>{return;})
            }, 3500);
           })
       }
})

  },
};