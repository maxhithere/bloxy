const verify = require("../../commands/info/verifydb.js");
const verify2 = require("../../commands/info/verifydb2.js");
const veruser = require('../../commands/info/verifyusername.js');
const Discord = require('discord.js')

module.exports =  {

      name: 'forceverify',
     description: 'Force verify a user!',
        type: 'CHAT_INPUT',

    options: [
        {
            name: 'user',
            description: 'The user',
            required: true,
            type: "USER",
        }
    ],


   
   async run(client, interaction, args) {
	let user = interaction.options.getUser('user')
    if(!user){
        return interaction.reply('That is not a valid user!')
    }

    if(!interaction.member.permissions.has('MANAGE_GUILD')) return message.reply('You do not have permission to use this command!')

        verify.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (err) throw err
            if (data == null) return;
            let role = data.Role
     
           
            if (role) {
               
                 let mem = await interaction.guild.members.fetch(`${user.id}`)

             interaction.reply('Successfully force verified ' + user.tag + '!')
             mem.roles.add(role)
            }
        })

      
                  
                 

         

                }
         
        }
    

         
   