const {Client,MessageEmbed,Intents,MessageActionRow,MessageSelectMenu,Collection} = require('discord.js');
const fs = require('fs')
require('colors')
const config = require('./configuration.json')
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.DIRECT_MESSAGE_TYPING,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.DIRECT_MESSAGES]});




client.commands = new Collection();

// Take commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/` + file);
  client.commands.set(command.name, command);
  console.log(`${command.name}.js Loaded`.yellow)
}

// Cooldowns
const cooldowns = new Collection();

// On Ready
client.on('ready', () => {
  console.log(`${client.user.tag} | (Guilds:${client.guilds.cache.size} | Users:${client.users.cache.size})`.green)
});

// On Message
client.on('messageCreate', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  // If command exist
  if (!command) return;
  // if(!message.guild.me.permissions.has("SEND_MESSAGES")) return  
  // Check if command can be executed in DM
  if (command.guildOnly && message.channel.type === 'DM') {
    return message.reply('I can\'t execute that command inside DMs!');
  }



  // Check if args are required
  if(command.Adminonly === true) {
    if(!config.admin.includes(message.author.id)) return message.reply({content: "**You Don't have a access to use this command ❌**"})
  }
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  // Check if user is in cooldown
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      // If user is in cooldown
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply({content:`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`});
    }
  } else {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    // Execute command
    try {
      command.execute(client,message, args);
    } catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  }
});




client.login(config.token).catch(err => {
  console.log(`The token is not found in the Discord api`.red)
});