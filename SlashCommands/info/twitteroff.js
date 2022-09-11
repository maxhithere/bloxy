const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const noblox = require("noblox.js")
const fetch = require('node-fetch')
const Discord = require('discord.js');
const channele = require("../../commands/info/twittermodel.js");

  
  module.exports = {
      name: "twitteroff",
      description: "turns the twitter system off",
    type: 'CHAT_INPUT',
   // options: [
	//	{
	//		name: 'chan',
	//		description: 'The channel',
		//	type: 'CHANNEL',
	//		required: true
	//	},
	//],
   
      run: async (client, interaction, args) => {
    
        if(!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply('You do not have the permission to do this!')
      try {
       
       
    
          
        //let channel = interaction.options.getChannel('chan')
        //if(!channel) return message.channel.send('Please specify a channel to send the tweets to!')
          let chan;
          let r;
        channele.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if(!data){
              return;
                }else{

                    data.Channel = chan
                    data.Role = r

                    channele.findOneAndDelete({Channel: chan, Role: r})

                    interaction.reply(`The twitter system has been turned off! Set a channel to turn it back on!`)
                }
              
                
                
                
            
        }   
        )
        
      
      } catch(err) {
          console.log(err)
          

      }
       
      
  
   
   
  
      },
  };
  
  
    

