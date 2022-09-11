const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const noblox = require("noblox.js")
const fetch = require('node-fetch')
const Discord = require('discord.js');

  
  module.exports = {
      name: "credits",
      description: "gives credits for people who helped with the bot",
    type: 'CHAT_INPUT',
   
      run: async (client, interaction, args) => {
    
        
      try {
          
        const embed = new MessageEmbed()
        .setTitle(`Credits`)
       .setDescription(`• ! max#0009 - Owner/Lead Developer\n• dodger#4642 - Website Developer\n• TryToHitMe#2010 - Contributor\n• [Creavite](<https://crvt.co/b>) - Amazing **Free** Hosting`)
        .setTimestamp()
          interaction.reply({embeds: [embed]})
      } catch(err) {
          console.log(err)

      }
       
      
  
   
   
  
      },
  };
  
  
    

