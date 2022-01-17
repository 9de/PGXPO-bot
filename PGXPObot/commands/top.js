const { Client, Message,MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const request = require('request')
const cheerio = require('cheerio')
const config = require('../configuration.json')
module.exports = {
    name: "leaderboard",
    image: "https://www.a2lc.com/hs-fs/hub/16856/file-889589896-jpg/images/top-15-litigation-ebooks-webinars-a2l-consulting.jpg",
    aliases: ["top","التوب"],
    description: "To show the leaderboard in (SG,PVP,1vs1,Clans)",
    category: "public",
    guildOnly: true,

    cooldown: 2,
    args: 1,
    usage: "[SG,PVP,1vs1,Clans]",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {string[]} args 
     */
   async execute(client,message, args) {
        const top = args[0]
        switch(top.toLowerCase()) {
            case "sg":
                let page = 1;
                let number = 1;
                let sgtop = []
                request({
                    method: "GET",
                    uri: "https://mcw.pgxpo.com/top/SG"
                  }, async (err,response,body) => {
                    
                    if(err && response.statusCode === 404) return;
                  const $ = cheerio.load(body)
                   $('.bottom-container').each(async function() {
                  
                    name = $(this).find('div[class="table-cell fsize-14 color-8 fweight-700 "]').text().replace(/[^][0-9][-]/,"").replace("#","")
                    rank = $(this).find('div[class="table-cell fsize-14 color-2 fweight-700  text-right uppercase"]').text().replace('pvip++', "PVIP++").replace("mod","Moderator").replace("pvip+","PVIP+")
                  wins = $(this).find('div[class="col-lg-6 text-green"]').text().replace("Wins :","")
                  points = $(this).find('div[class="col-lg-6 text-yellow"]').text().replace("Points :","")
                  kills = $(this).find('div[class="col-lg-6 text-cyan"]').text().replace("Kills :","")
                  deaths = $(this).find('div[class="col-lg-6 text-red"]').text().replace("Deaths :","")
                  Deathmatches = $(this).find('div[class="col-lg-6 text-purple"]').text().replace("Deathmatches :","")
                  Played = $(this).find('div[class="col-lg-6 text-pink"]').text().replace("Played :","")
                  
                  
                  sgtop.push({
                      number: number++,
                      name: name,
                      rank: rank,
                      wins: wins,
                      points: points,
                     kills: kills,
                     deaths: deaths,
                     Deathmatches: Deathmatches,
                     Played: Played
                    })
                  
                   })
                  
                   let pages = sliceIntoChunks(sgtop, 6);
                  
                 
                   let row = new MessageActionRow()
                   .addComponents(
                       new MessageButton()
                       .setStyle("PRIMARY")
                       .setLabel("Back")
                       .setEmoji("⬅️")
                       .setCustomId("backid"),
                       new MessageButton()
                        .setStyle('SECONDARY')
                        .setLabel('Forward')
                        .setEmoji('➡️')
                        .setCustomId("forwardId")
                   )
                   const embed = new MessageEmbed()
                   .setAuthor({name: "TOP Players in Survival Games ",iconURL:"https://cdn.discordapp.com/emojis/920098159219310614.png",url:"https://mcw.pgxpo.com/top/SG"})
                   .setColor("RANDOM")
                   .setFooter({text:`Page ${page} of ${pages.length} | Made By Turki`,iconURL:"https://cdn.discordapp.com/avatars/297834687110316033/6c98300e4427dda711a8668a40145a55.webp?size=80"})
                   .setThumbnail(`https://cdn.discordapp.com/emojis/920098159219310614.png`)
                   pages[page-1].map(e=>embed.addField(`> \`${e.number}:\` ${e.name} (${e.rank}):`,`> Wins :\`${e.wins}\` - Points:\`${e.points}\` - Kills: \`${e.kills}\`\n> Deaths: \`${e.deaths}\` - Deathmatches: \`${e.Deathmatches}\` -\n> Played: \`${e.Played}\``,true))
                  const msg = await message.reply({embeds:[embed],components:[row]})
                   const filter = (button) => button.user.id === message.member.id
                   const collecter = msg.createMessageComponentCollector({componentType:"BUTTON",filter,time:"35000"})

                   collecter.on('collect', async (button) => {
                       
                  await button.deferUpdate()
                  if(button.customId === 'forwardId') {
                    if(page === pages.length) return;
                    page++;
                    const embedforward = new MessageEmbed()
                    .setAuthor({name: "top Players in Survival Games ",iconURL:"https://cdn.discordapp.com/emojis/920098159219310614.png",url:"https://mcw.pgxpo.com/top/SG"})
                    .setColor("RANDOM")
                    .setFooter({text:`Page ${page} of ${pages.length} | Made By Turki`,iconURL:"https://cdn.discordapp.com/avatars/297834687110316033/6c98300e4427dda711a8668a40145a55.webp?size=80"})
                    .setThumbnail(`https://cdn.discordapp.com/emojis/920098159219310614.png`)
    
                    pages[page-1].map(e=>embedforward.addField(`> \`${e.number}:\` ${e.name} (${e.rank}):`,`> Wins :\`${e.wins}\` - Points:\`${e.points}\` - Kills: \`${e.kills}\`\n> Deaths: \`${e.deaths}\` - Deathmatches: \`${e.Deathmatches}\` -\n> Played: \`${e.Played}\``,true))
                    button.editReply({embeds:[embedforward]})
                  }
                  if(button.customId === 'backid') {
                    if(page === 1) return;
                    page--;
                    const embedback = new MessageEmbed()
                    .setAuthor({name: "top Players in Survival Games ",iconURL:"https://cdn.discordapp.com/emojis/920098159219310614.png",url:"https://mcw.pgxpo.com/top/SG"})
                    .setColor("RANDOM")
                    .setFooter({text:`Page ${page} of ${pages.length} | Made By Turki`,iconURL:"https://cdn.discordapp.com/avatars/297834687110316033/6c98300e4427dda711a8668a40145a55.webp?size=80"})
                    .setThumbnail(`https://cdn.discordapp.com/emojis/920098159219310614.png`)
                    pages[page-1].map(e=>embedback.addField(`> \`${e.number}:\` ${e.name} (${e.rank}):`,`> Wins :\`${e.wins}\` - Points:\`${e.points}\` - Kills: \`${e.kills}\`\n> Deaths: \`${e.deaths}\` - Deathmatches: \`${e.Deathmatches}\` -\n> Played: \`${e.Played}\``,true))
                    button.editReply({embeds:[embedback]})
                  } 

                   })

                  })
            break;
             case "pvp": 
      let arraypvp = []
      let numberpvp = 1;
             let pagepvp = 1;
             request({
                uri: "https://mcw.pgxpo.com/top/pvp"
              }, async (err,response,body) => {
                
               
                if(err && response.statusCode === 404) return;
              const $ = cheerio.load(body)  
                         

               $('.bottom-container').each(function() {
              
                var namepvp = $(this).find('div[class="table-cell fsize-14 color-8 fweight-700 "]').text().replace(/[^][0-9][-]/,"").replace("#","")
                var rankpvp = $(this).find('div[class="table-cell fsize-14 color-2 fweight-700 text-right uppercase"]').text().replace('pvip++', "PVIP++").replace("mod","Moderator").replace("pvip+","PVIP+")
              var Pointspvp = $(this).find('div[class="col-lg-6 text-yellow"]').text().replace("Points:","")
              var killspvp = $(this).find('div[class="col-lg-6 text-cyan"]').text().replace("Kills:","")
              var deathspvp = $(this).find('div[class="col-lg-6 text-red"]').text().replace("Deaths:","")
            
        
              
              arraypvp.push({
                  number: numberpvp++,
                  name: namepvp,
                  rank: rankpvp,
                  Points: Pointspvp,
                  kills: killspvp,
                  deaths: deathspvp
                })
               
            })

                let pagespvp = sliceIntoChunks(arraypvp, 6);

              
                let row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Back")
                    .setEmoji("⬅️")
                    .setCustomId("backid"),
                    new MessageButton()
                     .setStyle('SECONDARY')
                     .setLabel('Forward')
                     .setEmoji('➡️')
                     .setCustomId("forwardId")
                )
                const embed = new MessageEmbed()
                .setAuthor({name: "TOP Players in PVP",iconURL:"https://cdn.discordapp.com/emojis/932439460291964989.png",url:"https://mcw.pgxpo.com/top/SG"})
                .setColor("RANDOM")
                .setFooter({text:`Page ${pagepvp} of ${pagespvp.length} | Made By Turki`,iconURL:"https://cdn.discordapp.com/avatars/297834687110316033/6c98300e4427dda711a8668a40145a55.webp?size=80"})
                .setThumbnail(`https://cdn.discordapp.com/emojis/932439460291964989.png`)
                pagespvp[pagepvp-1].map(e=>embed.addField(`> \`${e.number}:\` ${e.name} (${e.rank}):`,`> Points:\`${e.Points}\` \n > Kills: \`${e.kills}\`\n> Deaths: \`${e.deaths}\``,true))
               const msg = await message.reply({embeds:[embed],components:[row]})
                const filter = (button) => button.user.id === message.member.id
                const collecter = msg.createMessageComponentCollector({componentType:"BUTTON",filter,time:"35000"})

                collecter.on('collect', async (button) => {
                    
               await button.deferUpdate()
               if(button.customId === 'forwardId') {
                 if(pagepvp === pagespvp.length) return;
                 pagepvp++;
                 const embedforward = new MessageEmbed()
                 .setAuthor({name: "TOP Players in PVP",iconURL:"https://cdn.discordapp.com/emojis/932439460291964989.png",url:"https://mcw.pgxpo.com/top/SG"})
                 .setColor("RANDOM")
                 .setFooter({text:`Page ${pagepvp} of ${pagespvp.length} | Made By Turki`,iconURL:"https://cdn.discordapp.com/avatars/297834687110316033/6c98300e4427dda711a8668a40145a55.webp?size=80"})
                 .setThumbnail(`https://cdn.discordapp.com/emojis/932439460291964989.png`)
                 pagespvp[pagepvp-1].map(e=>embedforward.addField(`> \`${e.number}:\` ${e.name} (${e.rank}):`,`> Points:\`${e.Points}\` \n > Kills: \`${e.kills}\`\n> Deaths: \`${e.deaths}\``,true))
                 button.editReply({embeds:[embedforward]})
               }
               if(button.customId === 'backid') {
                 if(pagepvp === 1) return;
                 pagepvp--;
                 const embedback = new MessageEmbed()
                 .setAuthor({name: "TOP Players in PVP",iconURL:"https://cdn.discordapp.com/emojis/920098477378269234.png",url:"https://mcw.pgxpo.com/top/SG"})
                 .setColor("RANDOM")
                 .setFooter({text:`Page ${pagepvp} of ${pagespvp.length} | Made By Turki`,iconURL:"https://cdn.discordapp.com/avatars/297834687110316033/6c98300e4427dda711a8668a40145a55.webp?size=80"})
                 .setThumbnail(`https://cdn.discordapp.com/emojis/932439460291964989.png`)
                 pagespvp[pagepvp-1].map(e=>embedback.addField(`> \`${e.number}:\` ${e.name} (${e.rank}):`,`> Points:\`${e.Points}\` \n > Kills: \`${e.kills}\`\n> Deaths: \`${e.deaths}\``,true))
                 button.editReply({embeds:[embedback]})
               } 

            })
               })
           
            
             break;
             case "1vs1":
                let page1v1 = 1;
                  let array1v1 = []
   let numberclan = 1;
                request({
                    method: "GET",
                    uri: "https://mcw.pgxpo.com/top/1vs1"
                  }, async (err,response,body) => {
                    
                    if(err && response.statusCode === 404) return;
                  const $ = cheerio.load(body)
                   $('.bottom-container').each(function() {
                  
                    name = $(this).find('div[class="table-cell fsize-14 color-8 fweight-700"]').text().replace(/[^][0-9][-]/,"").replace("#","")
                    rank = $(this).find('div[class="table-cell fsize-14 color-2 fweight-700 uppercase text-right"]').text().replace('pvip++', "PVIP++").replace("mod","Moderator").replace("pvip+","PVIP+")
                  wins = $(this).find('div[class="col-lg-6 text-green"]').text().replace("Wins:","")
                  kills = $(this).find('div[class="col-lg-6 text-cyan"]').text().replace("Loses:","")
                  deaths = $(this).find('div[class="col-lg-6 text-red"]').text().replace("Unranked Wins:","")
                
                  
               
                  array1v1.push({
                      number: numberclan++,
                      name: name,
                      rank: rank,
                      wins: wins,
                      Loses: kills,
                      Unrankedwins: deaths
                    })
                  
                   })
                
                   const onevsonepages = sliceIntoChunks(array1v1,6)

                let row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Back")
                    .setEmoji("⬅️")
                    .setCustomId("backid"),
                    new MessageButton()
                     .setStyle('SECONDARY')
                     .setLabel('Forward')
                     .setEmoji('➡️')
                     .setCustomId("forwardId")
                )
                const embed = new MessageEmbed()
                .setAuthor({name: "TOP Players in 1vs1",iconURL:"https://cdn.discordapp.com/emojis/932438996276113459.png",url:"https://mcw.pgxpo.com/top/1vs1"})
                .setColor("RANDOM")
                .setFooter({text:`Page ${page1v1} of ${onevsonepages.length} | Made By Turki`,iconURL:"https://cdn.discordapp.com/avatars/297834687110316033/6c98300e4427dda711a8668a40145a55.webp?size=80"})
                .setThumbnail(`https://cdn.discordapp.com/emojis/932438996276113459.png`)
                onevsonepages[page1v1-1].map(e=>embed.addField(`\`#${e.number}\`: ${e.name} (\`${e.rank}\`):`,`Wins: \`${e.wins}\`\n\`Loses: ${e.Loses}\`\n\`UnrakedWins: ${e.Unrankedwins}\``,true))
               const msg = await message.reply({embeds:[embed],components:[row]})
                const filter = (button) => button.user.id === message.member.id
                const collecter = msg.createMessageComponentCollector({componentType:"BUTTON",filter,time:"35000"})

                collecter.on('collect', async (button) => {
                    
               await button.deferUpdate()
               if(button.customId === 'forwardId') {
                 if(page1v1 === onevsonepages.length) return;
                 page1v1++;
                 const embedforward = new MessageEmbed()
                 .setAuthor({name: "TOP Players in 1vs1",iconURL:"https://cdn.discordapp.com/emojis/920098477378269234.png",url:"https://mcw.pgxpo.com/top/1vs1"})
                .setColor("RANDOM")
                .setFooter({text:`Page ${page1v1} of ${onevsonepages.length} | Made By Turki`,iconURL:"https://cdn.discordapp.com/avatars/297834687110316033/6c98300e4427dda711a8668a40145a55.webp?size=80"})
                .setThumbnail(`https://cdn.discordapp.com/emojis/932438996276113459.png`)
                onevsonepages[page1v1-1].map(e=>embedforward.addField(`\`#${e.number}\`: ${e.name} (\`${e.rank}\`):`,`Wins: \`${e.wins}\`\n\`Loses: ${e.Loses}\`\n\`UnrakedWins: ${e.Unrankedwins}\``,true))
                 button.editReply({embeds:[embedforward]}).catch(()=>{return;})
               }
               if(button.customId === 'backid') {
                 if(page1v1 === 1) return;
                 page1v1--;
                 const embedback = new MessageEmbed()
                 .setAuthor({name: "TOP Players in 1vs1",iconURL:"https://cdn.discordapp.com/emojis/932438996276113459.png",url:"https://mcw.pgxpo.com/top/1vs1"})
                .setColor("RANDOM")
                .setFooter({text:`Page ${page1v1} of ${onevsonepages.length} | Made By Turki`,iconURL:"https://cdn.discordapp.com/avatars/297834687110316033/6c98300e4427dda711a8668a40145a55.webp?size=80"})
                .setThumbnail(`https://cdn.discordapp.com/emojis/920098159219310614.png`)
                onevsonepages[page1v1-1].map(e=>embedback.addField(`\`#${e.number}\`: ${e.name} (\`${e.rank}\`):`,`Wins: \`${e.wins}\`\n\`Loses: ${e.Loses}\`\n\`UnrakedWins: ${e.Unrankedwins}\``,true))
                 button.editReply({embeds:[embedback]}).catch(()=>{return;})
               }
            }) 
            })
             break;
             case "clans": 
             request({
                method: "GET",
                uri: "https://mcw.pgxpo.com/top/clans",
              }, async (err,response,body) => {
                var clansarray = []
                let pageclans = 1;
                const $ = cheerio.load(body)
            $('li[class="col-lg-3 col-md-3 mt50"]').each(function() {
                  var clanname = $(this).find('div[class="nav-title color-white"]').text().replace(/^\s+|\s+$/gm,'');
                 var clanMembers= $(this).find('span[class="text-green"]').text().replace("Members","").replace(/^\s+|\s+$/gm,'');
                 var clanpoints = $(this).find('span[class="text-yellow"]').text().replace("Points","").replace(/^\s+|\s+$/gm,'');;
                 var clandeaths = $(this).find('span[class="text-red"]').text().replace("Deaths","").replace(/^\s+|\s+$/gm,'');;
                 
                 clansarray.push({
                   name: clanname,
                   members: clanMembers,
                   points: clanpoints,
                  deaths: clandeaths
                 })
            
               })
               const pagesclan = sliceIntoChunks(clansarray,6)
               
               let row = new MessageActionRow()
               .addComponents(
                   new MessageButton()
                   .setStyle("PRIMARY")
                   .setLabel("Back")
                   .setEmoji("⬅️")
                   .setCustomId("backid"),
                   new MessageButton()
                    .setStyle('SECONDARY')
                    .setLabel('Forward')
                    .setEmoji('➡️')
                    .setCustomId("forwardId")
               )

             let embed = new MessageEmbed()
             .setAuthor({name: "Top Clans in PGXPO",iconURL: config.Clansicon,url:"https://mcw.pgxpo.com/top/clans"})
             .setThumbnail(config.Clansicon)
             .setColor("RANDOM")
             .setFooter({text:`Page ${pageclans} of ${pagesclan.length}  | Made By Turki`,iconURL:"https://cdn.discordapp.com/avatars/297834687110316033/6c98300e4427dda711a8668a40145a55.webp?size=80"})
             pagesclan[pageclans-1].map(e=>embed.addField(e.name,`Members: \`${e.members}\`\nPoints: \`${e.points}\`\nDeaths: \`${e.deaths}\``,true))
             const msg = await message.reply({embeds:[embed],components:[row]})
             const filter = (button) => button.user.id === message.member.id
             const collecter = msg.createMessageComponentCollector({componentType:"BUTTON",filter,time:"35000"})

             collecter.on('collect', async (button) => {
                 
            await button.deferUpdate()
            if(button.customId === 'forwardId') {
              if(pageclans === pagesclan.length) return;
              pageclans++;
              const embedforward = new MessageEmbed()
              .setAuthor({name: "Top Clans in PGXPO",iconURL: config.Clansicon,url:"https://mcw.pgxpo.com/top/clans"})
              .setThumbnail(config.Clansicon)
              .setColor("RANDOM")
              .setFooter({text:`Page ${pageclans} of ${pagesclan.length}  | Made By Turki`,iconURL:"https://cdn.discordapp.com/avatars/297834687110316033/6c98300e4427dda711a8668a40145a55.webp?size=80"})
              pagesclan[pageclans-1].map(e=>embedforward.addField(e.name,`Members: \`${e.members}\`\nPoints: \`${e.points}\`\nDeaths: \`${e.deaths}\``,true))     
              button.editReply({embeds:[embedforward]})
            }
            if(button.customId === 'backid') {
              if(pageclans === 1) return;
              pageclans--;
              const embedback = new MessageEmbed()
              .setAuthor({name: "Top Clans in PGXPO",iconURL: config.Clansicon,url:"https://mcw.pgxpo.com/top/clans"})
              .setThumbnail(config.Clansicon)
              .setColor("RANDOM")
              .setFooter({text:`Page ${pageclans} of ${pagesclan.length}  | Made By Turki`,iconURL:"https://cdn.discordapp.com/avatars/297834687110316033/6c98300e4427dda711a8668a40145a55.webp?size=80"})
              pagesclan[pageclans-1].map(e=>embedback.addField(e.name,`Members: \`${e.members}\`\nPoints: \`${e.points}\`\nDeaths: \`${e.deaths}\``,true))
              button.editReply({embeds:[embedback]})
            } 

         })
            })   
             break;

             default:
                 message.reply({content: "> **$top [SG || clans || 1vs1 || PVP]**"})
        }
    },
};

 
function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}
