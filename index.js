const { Client, Collection } = require("discord.js");
const noblox = require('noblox.js')
const client = new Client({
    intents: 65279,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");


require("./handler")(client);



async function startApp () {
   
    
    const currentUser = await noblox.setCookie('roblox token here')
  
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)
}
startApp()



client.login(client.config.token);
