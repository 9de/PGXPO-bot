module.exports = {
    name: "eval",
    aliases: ["ev"],
    description: "",
    category: "admin",
    guildOnly: true,
    Adminonly: true,
    cooldown: 2, // Seconds
    async execute(client,message, args) {
        /*
Warning !
If you do not know how to use this command, 
do not activate it because  anyone can trick you into giving you a code that can hack your server or hack the bot. Thank you!

تحذير !
إذا كنت لا تعرف كيفية استخدام هذا الأمر
 ، فلا تقم بتفعيله لأن أي شخص يمكن أن يخدعك لإعطائك اكواد يمكنه اختراق السيرفر الخاص بك أو اختراق البوت.
 شكرا لك!
        */
        const status = false // To enable it, please type true instead of false
        if(status === true) {
            const clean = async (text) => {
                if (text && text.constructor.name == "Promise")
                  text = await text;
                
     
                if (typeof text !== "string")
                  text = require("util").inspect(text, { depth: 1 });
                
                // Replace symbols with character code alternatives
                text = text
                  .replace(/`/g, "`" + String.fromCharCode(8203))
                  .replace(/@/g, "@" + String.fromCharCode(8203));
                
                
                return text;
                }
            
             
                const args1 = message.content.split(" ").slice(1);
                try {
                    // Evaluate (execute) our input
                    const evaled = eval(args1.join(" "));
              
                    // Put our eval result through the function
                    // we defined above
                    const cleaned = await clean(evaled);
              
                    // Reply in the channel with our result
                    message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``);
                  } catch (err) {
                    // Reply in the channel with our error
                    message.channel.send(`\`ERROR\` \`\`\`xl\n${cleaned}\n\`\`\``);
                  }

        }
    },
};