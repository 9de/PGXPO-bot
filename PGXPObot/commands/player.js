const {Client,MessageEmbed,Intents,MessageActionRow,MessageSelectMenu,Collection, Message} = require('discord.js');
const request = require('request')
const cheerio = require('cheerio')
module.exports = {
    name: "player",
    image : "https://assets.umod.org/images/icons/plugin/5c3223fcb867e.png",
    aliases: ["pg","sa"],
    description: "To get information Player In pgxpo community",
    category: "public",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    adminPermOverride: true,
    cooldown: 2,
    args: 1,
    usage: "[name]",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {string[]} args 
     */
   async execute(client,message, args) {
       if(!message.guild.me.permissions.has("SEND_MESSAGES" || "EMBED_LINKS")) return;
        var user = args[0]
        request(`https://mcw.pgxpo.com/player/${user}`, async (err,response,body) => {
            const $ = cheerio.load(body)
        
      
            var namemc = $('div[class="platform fsize-24 fweight-700"]').html()
           if(!namemc) return message.reply({content:"Can't find This Player !",ephemeral:true})
        
            var rank = $('div[class="fsize-14 fweight-700 uppercase mt10"]').find('span').text()
            var Tokens = $('span[id="playerTokens"]').text().replace("Tokens » ","")
            var playersiuns = $('a[class="block td-none ptb20 plr30 upit"]').find("span").text().replace("Playersince » ","")
            var Luckey = $('a[class="block td-none ptb20 plr30"]').find("span").text().replace("LuckyCrates » ","")
            var head = $('div[class="author-status"]').find("img").attr("src")
      const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
        .setCustomId("select")
        .setPlaceholder("Please choose from the following options:")
        .addOptions({
          label: "1vs1",
          emoji: "920098477378269234",
          description: "To Show Your Infromation In 1vs1",
          value: "1v1"
        })
        .addOptions({
          label: "PVP",
              description:'For player information in PVP',
              emoji:'920097217795203123',
              value: 'pvp'
        })
        .addOptions({
          label: "Survival Games",
              description:'For player information in Survival Games',
              emoji:'920098159219310614',
              value: 'sg'
        })
      )
      
      
      
      let embed = new MessageEmbed()
      .setAuthor({name:`${user}'s Status`, iconURL:`https://minotar.net/helm/${user}/100`,url:`https://mcw.pgxpo.com/player/${user}`})
      .addField("PLAYERSINCE »", `\`${playersiuns}\``,true)
      .addField("RANK »", `\`${rank}\``,true)
      .addField("TOKENS »", `\`${Tokens}\``,true)
      .addField("LUCKYCRATES »", `\`${Luckey}\``,true)
      .setColor("#c2d4f8")
      .setThumbnail(head)
      .setFooter({text: "Made By Turki",iconURL:"https://yt3.ggpht.com/ytc/AKedOLS8NPoap978KBnHGwdi6X7qRKCiOv0sN2Ek6ha7Lg=s900-c-k-c0x00ffffff-no-rj"})
      // .setThumbnail(head)
      const msg = await message.reply({embeds:[embed],components:[row]}).catch(err => {})
      const filter = (menu) =>  menu.isSelectMenu() &&  menu.user.id === message.member.id 

      
      const collecter =  await msg.createMessageComponentCollector({filter,time:30000})
      collecter.on('collect', async (menu) => {
      
        if(menu.values[0] !== '1v1') return;
      await menu.deferUpdate()  
        const wins = $('ul[id=1vs1Data]').text().replace(/^\s+|\s+$/gm,'').split(" ")[2].replace('\nLoses',"")
        const Loses = $('ul[id=1vs1Data]').text().replace(/^\s+|\s+$/gm,'').split(" ")[4].replace('\nUnranked',"")
        const unraked = $('ul[id=1vs1Data]').text().replace(/^\s+|\s+$/gm,'').split(" ")[7]
      let embed = new MessageEmbed()
      .setAuthor({name:`${user}'s stats in 1v1`,iconURL:`https://minotar.net/helm/${user}/100`,url:`https://mcw.pgxpo.com/player/${user}`})
      .addField("Wins »",`\`${wins}\``,true)
      .addField("Loses »",`\`${Loses}\``,true)
      .addField("Unranked Wins »",`\`${unraked}\``,false)
      .setColor("#c2d4f8")
      .setThumbnail(head)
      .setFooter({text: "Made By Turki",iconURL:"https://yt3.ggpht.com/ytc/AKedOLS8NPoap978KBnHGwdi6X7qRKCiOv0sN2Ek6ha7Lg=s900-c-k-c0x00ffffff-no-rj"})
      menu.editReply({embeds:[embed]}).catch(err => {})
      })
      
      collecter.on('collect', async(menu) => {
        if(menu.values[0] === 'sg') { 
            await menu.deferUpdate()  
          const kills = $('ul[id=SGdata]').text().replace(/^\s+|\s+$/gm,'').split(" ")[2].replace("\nDeaths","")
          const Deaths = $('ul[id=SGdata]').text().replace(/^\s+|\s+$/gm,'').split(" ")[4].replace("\nCrates","")
          const Crates = $('ul[id=SGdata]').text().replace(/^\s+|\s+$/gm,'').split(" ")[6].replace("\nVictories","")
          const Victories = $('ul[id=SGdata]').text().replace(/^\s+|\s+$/gm,'').split(" ")[8].replace("\nGames"," ")
          const GamesPlayed = $('ul[id=SGdata]').text().replace(/^\s+|\s+$/gm,'').split(" ")[11].replace("\nDeathmatches","")
          const Deathmatches = $('ul[id=SGdata]').text().replace(/^\s+|\s+$/gm,'').split(" ")[13].replace("\nSG","")
          const SGpoints = $('ul[id=SGdata]').text().replace(/^\s+|\s+$/gm,'').split(" ")[16]
      
          let embed = new MessageEmbed()
          .setAuthor({name:`${user}'s Stats in SG`,iconURL:`https://minotar.net/helm/${user}/100`,url:`https://mcw.pgxpo.com/player/${user}`})
         .addField("Kills »",`\`${kills}\``,true)
         .addField("Deaths »",`\`${Deaths}\``,true)
         .addField("Crates »",`\`${Crates}\``,true)
         .addField("Victories »",`\`${Victories}\``,true)
         .addField("Games Played »",`\`${GamesPlayed}\``,true)
         .addField("Deathmatches »",`\`${Deathmatches}\``,true)
         .addField("SG Points »",`\`${SGpoints}\``,true)
         .setColor("#c2d4f8")
      
          .setThumbnail(head)
      .setFooter({text: "Made By Turki",iconURL:"https://yt3.ggpht.com/ytc/AKedOLS8NPoap978KBnHGwdi6X7qRKCiOv0sN2Ek6ha7Lg=s900-c-k-c0x00ffffff-no-rj"})
      menu.editReply({embeds:[embed]}).catch(err => {})
        }
      })
      collecter.on('collect', async(menu) => {
        if(menu.values[0] === 'pvp') {
            await menu.deferUpdate()  
          const kills = $('ul[id=ffaData]').text().replace(/^\s+|\s+$/gm,'').split(" ")[2].replace("\nDeaths","")
          const Deaths = $('ul[id=ffaData]').text().replace(/^\s+|\s+$/gm,'').split(" ")[4].replace("\nPvP","")
          const points = $('ul[id=ffaData]').text().replace(/^\s+|\s+$/gm,'').split(" ")[7]
      
          let embed = new MessageEmbed()
          .setAuthor({name:`${user}'s Stats in PVP`,iconURL:`https://minotar.net/helm/${user}/100`,url:`https://mcw.pgxpo.com/player/${user}`})
          .addField("Kills »",`\`${kills}\``,true)
          .addField("Deaths »",`\`${Deaths}\``,true)
          .addField("Points »",`\`${points}\``,true)
          .setColor("#c2d4f8")
          .setThumbnail(head)
      .setFooter({text: "Made By Turki",iconURL:"https://yt3.ggpht.com/ytc/AKedOLS8NPoap978KBnHGwdi6X7qRKCiOv0sN2Ek6ha7Lg=s900-c-k-c0x00ffffff-no-rj"})
      menu.editReply({embeds:[embed]}).catch(err => {})
        }
      })
    })
    },
};