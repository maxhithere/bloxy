const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const noblox = require("noblox.js")
const fetch = require('node-fetch')
const Discord = require('discord.js');
const channele = require("../../commands/info/twittermodel.js");

  
  module.exports = {
      name: "twitterchannel",
      description: "selects a channel to send tweets to",
    type: 'CHAT_INPUT',
    options: [
		{
			name: 'chan',
			description: 'The channel',
			type: 'CHANNEL',
			required: true
		},
	],
   
      run: async (client, interaction, args) => {
    
        if(!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply('You do not have the permission to do this!')
      try {
       // const guildDB = await verify.findOne({
      //      Guild: interaction.guild.id
       // });
       
    
          
        let channel = interaction.options.getChannel('chan')
        if(!channel) return message.channel.send('Please specify a channel to send the tweets to!')
          
        channele.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if(!data){
                let newGuild = await new channele({
                Guild: interaction.guild.id,
                Channel: channel,
                })
              
                await newGuild.save()
                
                return interaction.reply('Successfully set the tweet channel!')
            }
            else if (data) {
             
                data.Channel = channel
                await data.save()
                interaction.reply({
                  content: 'Successfully updated the tweet channel!'
                })
                console.log(data)
              }
        }   
        )
        
      
      } catch(err) {
          console.log(err)
          interaction.reply('Please provide a valid channel!')

      }
       
      
  
   
   
  
      },
  };
  
  
    

