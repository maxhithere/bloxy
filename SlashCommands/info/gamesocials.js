const noblox = require("noblox.js")
const { Message, Client, MessageEmbed, CommandInteraction } = require("discord.js");
const fetch = require('node-fetch')
const Discord = require('discord.js');



module.exports = {
  name: "gamesociallinks",
    description: "returns a games social links",
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
    
    
    
    
    async function GetRobloxGame(game) {
        let response = await fetch(`https://apis.roblox.com/universes/v1/places/${game}/universe`)//.then(); 
        if (response.status != 200) {
           console.log('nope')
        }
        let _data = await response.json();
      //  console.log(_data) //.Id
        return _data.universeId;
        
    }
    
    
    const pre = await GetRobloxGame(game)
    
    
    const gameSocialLinks = await noblox.getGameSocialLinks(pre)
    
   // console.log(gameSocialLinks)

   let assetNamesa = gameSocialLinks.map(asset => asset.type + ': ' + asset.url).join("\n")

   //console.log(assetNamesa)
    if(!assetNamesa) assetNamesa = 'none'
    const embed = new MessageEmbed()
    .setTitle(`Social links for place **${game}**`)
    .addField('Links', `${assetNamesa}`)
    .setFooter({text: 'if the place has more than 50 links it wil not display, due to the limit of 1024 characters from discord'})
    .setTimestamp()
        interaction.reply({embeds: [embed]})
} catch(err) {
    console.log(err)
    interaction.reply({content: 'Please provide a valid game **ID**', ephemeral: true})
}

    },
};
