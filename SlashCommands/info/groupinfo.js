const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const noblox = require("noblox.js")
const fetch = require('node-fetch')
const Discord = require('discord.js');

  
  module.exports = {
      name: "groupinfo",
      description: "returns groups info",
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
    
        const group = interaction.options.getString("group");
        
      try {
          
      if(!group) return interaction.reply('Please provide a group ID')
      
    const groupInfo = await noblox.getGroup(group)
          if(groupInfo == null || !groupInfo){
              return interaction.reply('Please provide a valid group **ID**')
          }
     
   
          const embed = new MessageEmbed()
          .setTitle(`Information for group **${group}**`)
          .addField('Name', `${groupInfo.name}`)
    .addField('ID', `${groupInfo.id}`)
    .addField('Description', `${groupInfo.description}`)
    .addField('Owner', `${groupInfo.owner.username}`)
    .addField('Membercount', `${groupInfo.memberCount}`)
    .addField('Public', `${groupInfo.publicEntryAllowed}`)
          .setTimestamp()
          interaction.reply({embeds: [embed]})
      } catch(err) {
          console.log(err)
          interaction.reply('Please provide a valid group **ID**')

      }
       
      
  
   
   
  
      },
  };
  
  
    

