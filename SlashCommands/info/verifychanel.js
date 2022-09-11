const discord = require("discord.js")
//const verify = require("../info/verifydb2.js");
const verify = require('../../commands/info/verifydb2.js')
module.exports =  {
 
      name: "verifychannel",
     description: 'verify channel select',
      options: [
		{
			name: 'verifychannel',
			description: 'The channel where the user would verify.',
			type: 'CHANNEL',
			required: true
		},
	],
    
  
  async run(client, interaction, args) {
  
    const channel = interaction.options.getChannel("verifychannel");

    if(!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply({
        content: "You do not have the permission to do this!",
        ephemeral: true
    })
try {
    
      
    verify.findOne({ Guild: interaction.guildId }, async (err, data) => {
        if(!data){
            let newGuild = await new verify({
            Guild: interaction.guildId,
            Channel: channel,
            })
          
            await newGuild.save()
            
            return interaction.reply({
                content: "Successfully set the verified channel!",
            })
        }
        else if (data) {
          // data.findOneAndUpdate({ Guild: message.guild.id, Toggle: choice })
          //  message.channel.send('Successfully updated the chat filter!')
          // console.log(data)
          data.Channel = channel
          await data.save()
          interaction.reply({
            content: 'Successfully updated the verify channel!'
          })
          console.log(data)
        }
    }   
    )
    
    }catch(err) {
        console.log(err)
    }
}}