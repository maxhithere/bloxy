const noblox = require("noblox.js")
const { Message, Client, MessageEmbed, CommandInteraction } = require("discord.js");
const Discord = require('discord.js');



module.exports = {
  name: "collectibles",
    description: "returns a users avatar",
    type: 'CHAT_INPUT',
     options: [
    {
      name: "user",
      description: "provide a user",
      type: "STRING",
      required: true
    },
  ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        
          let user = interaction.options.getString("user")
        //let user2 = Number(user)
   
   // if(user == NaN) {
     //   message.channel.send('Please provide a valid user **ID**')
   // } 
       let information2 = await noblox.getIdFromUsername(user) 
 // let check = await noblox.getUsernameFromId(user)
  //let check2 = await noblox.getIdFromUsername(check) 



    
try {
     let collectibles = await noblox.getCollectibles({userId: information2, sortOrder: "Asc", limit: 50})
    
   // console.log(collectibles)
    let assetNamesa = collectibles.map(asset => asset.name + ': ' + asset.recentAveragePrice).join("\n")
    // if(collectibles > 50) return interaction.reply({content: 'user has too many collectibles to be displayed', ephemeral: true})
    if(!assetNamesa) assetNamesa = 'none'
    const embed = new MessageEmbed()
    .setTitle(`Information on collectibles for **${user}**`)
    .addField('Collectibles', `${assetNamesa}`)
    .setTimestamp()
     await  interaction.reply({embeds: [embed]})
} catch(err) {
    console.log(err)
      interaction.reply({content: 'Please provide a valid user', ephemeral: true})
}



    },
};
