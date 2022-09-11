const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const noblox = require("noblox.js")
const fetch = require('node-fetch')
const Discord = require('discord.js');

  
  module.exports = {
      name: "grouplogo",
      description: "returns groups logo",
    type: 'CHAT_INPUT',
    options: [
		{
			name: 'group',
			description: 'The group ID',
			type: 'STRING',
			required: true
		},
	],
      run: async (client, interaction, args) => {
    
        const game = interaction.options.getString("group");
      try {
          
      if(!game) return interaction.reply('Please provide a group ID')
      
         
         let gameSocialLinks = await noblox.getLogo(game)
          
      
          const embed = new MessageEmbed()
          .setTitle(`Group logo for group **${game}**`)
         .setImage(gameSocialLinks)
          .setTimestamp()
          interaction.reply({embeds: [embed]})
      } catch(err) {
          console.log(err)
          interaction.reply('Please provide a valid group **ID**')

      }
       
      
  
   
   
  
      },
  };
  
  
    

