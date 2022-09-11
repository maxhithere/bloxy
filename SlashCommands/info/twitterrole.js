const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const noblox = require("noblox.js")
const fetch = require('node-fetch')
const Discord = require('discord.js');
const rolee = require("../../commands/info/twittermodel.js");

  
  module.exports = {
      name: "twitterpingrole",
      description: "select a ping role",
    type: 'CHAT_INPUT',
    options: [
		{
			name: 'role',
			description: 'The role',
			type: 'ROLE',
			required: true
		},
	],
   
      run: async (client, interaction, args) => {
    
        if(!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply('You do not have the permission to do this!')
      try {
      
       
    
          
        let role = interaction.options.getRole('role')
        if(!role) return interaction.reply('Please specify a role to ping users with')
          
        rolee.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if(!data){
                let newGuild = await new rolee({
                Guild: interaction.guild.id,
                Role: role,
                })
              
                await newGuild.save()
                
                return interaction.channel.send('Successfully set the ping role!')
            }
            else if (data) {
                // data.findOneAndUpdate({ Guild: message.guild.id, Toggle: choice })
                //  message.channel.send('Successfully updated the chat filter!')
                // console.log(data)
                data.role = role
                await data.save()
                interaction.reply({
                  content: 'Successfully updated the ping role!'
                })
                console.log(data)
              }
        }   
        )
      
      } catch(err) {
          console.log(err)
          interaction.reply('Please provide a valid role!')

      }
       
      
  
   
   
  
      },
  };
  
  
    

