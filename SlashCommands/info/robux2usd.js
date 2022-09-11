const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const noblox = require("noblox.js")
const fetch = require('node-fetch')
const Discord = require('discord.js');

  
  module.exports = {
      name: "robux2usd",
      description: "returns convertion of robux to usd",
    type: 'CHAT_INPUT',
    options: [
		{
			name: 'robux',
			description: 'The amount of robux',
			type: 'INTEGER',
			required: true
		},
	],
   
      run: async (client, interaction, args) => {
    
        
      try {
        let robux = interaction.options.getInteger('robux')
        //if(isNaN(robux)) return message.channel.send('Please provide a valid number.')
      //  if(!robux) return message.channel.send('Please provide a valid number.')
        let convert = robux * 0.0125
        let embed = new MessageEmbed()
  .setTitle('Convertion')
  .addField('Robux', `${robux}`)
  .addField('USD', `$${convert}`)
  .setTimestamp()
       
          interaction.reply({embeds: [embed]})
      } catch(err) {
          console.log(err)
          

      }
       
      
  
   
   
  
      },
  };
  
  
    

