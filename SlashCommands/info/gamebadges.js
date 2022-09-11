const noblox = require("noblox.js")
const { Message, Client, MessageEmbed, CommandInteraction } = require("discord.js");
const Discord = require('discord.js');
const fetch = require('node-fetch')


module.exports = {
  name: "gamebadges",
    description: "returns a games badges",
    type: 'CHAT_INPUT',
     options: [
    {
      name: "game",
      description: "provide a game id",
      type: "STRING",
      required: true
    },
  ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        
          let game = interaction.options.getString("game")
        let user2 = Number(game)
        
  
try {
    
    
    //https://api.roblox.com/universes/get-universe-containing-place?placeid=
    
    async function GetRobloxGame(game) {
        let response = await fetch(`https://apis.roblox.com/universes/v1/places/${game}/universe`)//.then(); 
        if (response.status != 200) {
           console.log('nope')
        }
        let _data = await response.json();
    
        return _data.universeId;
        
    }
    
    
    const pre = await GetRobloxGame(game)
    
    
     const wearingAssets = await noblox.getGameBadges(pre, 50, '', "Asc", )
    
    console.log(wearingAssets)
 
    let desc = " ";
 const assetNamesa = wearingAssets.map(asset => asset.name)
 for(let i = 0; i < assetNamesa.length; i++) {
 let number = assetNamesa[i];
 desc += (`${number}\n`)
 }
    const embed = new MessageEmbed()
    .setTitle(`Information on badges for **${user2}**`)
   

   
    .addField('Badges', `${desc}`)

   // .addField('Emotes', `${wearingAssets.emotes}`)
    .setTimestamp()
        interaction.reply({embeds: [embed]})
} catch(err) {
    console.log(err)
    interaction.reply({content: 'Please provide a valid game **ID**', ephemeral: true})
}

    },
};
