const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const noblox = require("noblox.js")
const fetch = require('node-fetch')
const Discord = require('discord.js');

module.exports = {
    name: "gamegamepasses",
    description: "returns game gamepasses",
    type: 'CHAT_INPUT',
     options: [
		{
			name: 'game',
			description: 'The game ID',
			type: 'STRING',
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
      const game = interaction.options.getString("game");
        //2888350255
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
      
         
          const gameSocialLinks = await noblox.getGamePasses(pre)
      
          
         // console.log(gameSocialLinks)
      
         let assetNamesa = gameSocialLinks.map(asset => asset.name + ': ' + asset.price).join("\n")
         let assetNamesb = gameSocialLinks.map(asset => asset.productId).join("\n")
      
         //console.log(assetNamesa)
          if(!assetNamesa) assetNamesa = 'none'
          if(!assetNamesb) assetNamesb = 'none'
          const embed = new MessageEmbed()
          .setTitle(`Gamepasses for place **${game}**`)
          .addField('Gamepasses', `${assetNamesa}`)
          .addField(`Gamepass ID's`, `${assetNamesb}`)
          .setFooter({text: 'if the place has more than 50 gamepasses it wil not display, due to the limit of 1024 characters from discord'})
          .setTimestamp()
              interaction.reply({embeds: [embed]})
      } catch(err) {
          console.log(err)
          interaction.reply('Please provide a valid game **ID**')
      }
    },
};
