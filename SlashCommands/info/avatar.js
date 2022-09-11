const noblox = require("noblox.js")
const { Message, Client, MessageEmbed, CommandInteraction } = require("discord.js");
const Discord = require('discord.js');



module.exports = {
  name: "wearing",
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
         let information2 = await noblox.getIdFromUsername(user) 
   
try {
    const wearingAssets = await noblox.getAvatar(information2)
    let desc = " ";
 const assetNamesa = wearingAssets.assets.map(asset => asset.name)
 for(let i = 0; i < assetNamesa.length; i++) {
 let number = assetNamesa[i];                 //idk why i was doing this method 
 desc += (`${number}\n`)
 }                                  
    const embed = new MessageEmbed()
    .setTitle(`Information on avatar **${information2}**`)
   
    .addField('Avatar Type', `${wearingAssets.playerAvatarType}`)
    .addField('Assets', `${desc}`)
    .addField('Default Shirt', `${wearingAssets.defaultShirtApplied}`)
    .addField('Default Pants', `${wearingAssets.defaultPantsApplied}`)
   
    .setTimestamp()
        interaction.reply({embeds: [embed]})
} catch(err) {
    console.log(err)
    interaction.reply({content: 'Please provide a valid user', ephemeral: true})
}

    },
};
