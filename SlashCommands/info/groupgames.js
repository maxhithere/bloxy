const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const noblox = require("noblox.js")
const fetch = require('node-fetch')
const Discord = require('discord.js');


  
  module.exports = {
      name: "groupgames",
      description: "returns groups games",
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
    //2888350255
  try {
      
  if(!game) return interaction.reply('Please provide a group ID')
  
     
     let gameSocialLinks = await noblox.getGroupGames({groupId: game, accessFilter: 'Public', sortOrder: 'Asc', limit: '50'})
  
      
     // console.log(gameSocialLinks)
  
     let assetNamesa = gameSocialLinks.map(asset => "Name: "+asset.name + " ID: "+asset.id+" Description: "+asset?.description).join("\n")
     
  
     //console.log(assetNamesa)
      if(!assetNamesa) assetNamesa = 'none'
      const embed = new MessageEmbed()
      .setTitle(`Group games for group **${game}**`)
      .addField('Games', `${assetNamesa}`)
      .setFooter({text: 'if the group has more than 50 games it wil not display, due to the limit of 1024 characters from discord'})
      .setTimestamp()
      interaction.reply({embeds: [embed]})
  } catch(err) {
      console.log(err)
      interaction.reply('Please provide a valid group **ID**')
  }
   
   
  
      },
  };
  
