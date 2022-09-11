const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const noblox = require("noblox.js")
const fetch = require('node-fetch')
const Discord = require('discord.js');

  
  module.exports = {
      name: "rstos",
      description: "returns rs tos",
    type: 'CHAT_INPUT',
   
      run: async (client, interaction, args) => {
    
        
      try {
          
        const embed = new MessageEmbed()
        .setTitle(`TOS For rsa/rs command`)
    
        .addField('Copyright', `The owners of these assets hold full copyright to their asset. Please don't try to copy/upload the assets.`)
        .addField('NSFW', `Please be mindful of people that are with you and don't use this command on NSFW assets in a non NSFW channel.`)
        .addField('Service', `Bloxy provides a user-controlled content communication service for your personal non-commercial consumption and entertainment ("Service"). The Service is provided to you hereunder, and you are fully liable for all acts and omissions of any third party that uses or administers the Service for you or on your behalf.`)
        .setTimestamp()
          interaction.reply({embeds: [embed]})
      } catch(err) {
          console.log(err)
          interaction.reply('Please provide a valid group **ID**')

      }
       
      
  
   
   
  
      },
  };
  
  
    

