const verify = require("../../commands/info/verifydb.js");
const verify2 = require("../../commands/info/verifydb2.js");
const veruser = require('../../commands/info/verifyusername.js');
const Discord = require('discord.js')

module.exports =  {

      name: 'update',
      description: 'Update your roles & your ROBLOX account!',
       type: 'CHAT_INPUT',

   
   async run(client, interaction, args) {
    let channel;

    verify2.findOne({Guild: interaction.guild.id} , async (err, data) => {
        if(data == null) return interaction.reply('You cannot verify because this channel does not have a verified channel setup! Please contact the owner or server admins to let them know.')
  
         channel = data.Channel
        console.log(channel)
        if(!interaction.channel.id == channel) {
          return message.reply('You can only run that command in a verified channel!')
        }
      })

async function l(){
  verify.findOne({ Guild: interaction.guild.id }, async (err, data) => {
    if (err) throw err
    if (data == null) return;
    let role = data.Role
    console.log(role)

   
    if (role) interaction.member.roles.add(role)
})
}


     veruser.findOne({Member: interaction.user.id}, async (err, data) => {
        if (err) throw err
        if(!data || data == null) {
             interaction.reply('You have not verified yet! Please run the `verify` command to verify your account!')
    } else {
    
await l()



        interaction.reply('Your verification status has been updated, you are now verified in this server!')
    }

    })

                }
         
        }
    

         
   