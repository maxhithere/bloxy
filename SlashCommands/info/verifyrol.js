const discord = require("discord.js")
//const verify = require("../info/verifydb.js");
const verify = require('../../commands/info/verifydb.js')
module.exports =  {
 
      name: "verifiedrole",
     description: 'verified role select',
      options: [
		{
			name: 'verifyrole',
			description: 'The role that would be added when the user has been verified.',
			type: 'ROLE',
			required: true
		},
	],
	
 
       
  async run(client, interaction, args) {

    const role = interaction.options.getRole("verifyrole");
  
    if(!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply({
        content: 'You do not have the permission to do this!',
        ephemeral: true
    })
try {

      
    verify.findOne({ Guild: interaction.guildId }, async (err, data) => {
        if(!data){
            let newGuild = await new verify({
            Guild: interaction.guildId,
            Role: role,
            })
          
            await newGuild.save()
            
            return interaction.reply({
                content: 'Successfully set the verified role!',
            })
        } 
        else if (data) {
          // data.findOneAndUpdate({ Guild: message.guild.id, Toggle: choice })
          //  message.channel.send('Successfully updated the chat filter!')
          // console.log(data)
          data.Role = role
          await data.save()
          interaction.reply({
            content: 'Successfully updated the verified role!'
          })
          console.log(data)
        }
    }   
    )
    
    }catch(err) {
        console.log(err)
    }
}}