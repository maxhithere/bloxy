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
   
  
       let information2 = await noblox.getIdFromUsername(user) 
 



    
try {
     let collectibles = await noblox.getCollectibles({userId: information2, sortOrder: "Asc", limit: 50})
    
  
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
