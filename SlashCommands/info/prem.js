const noblox = require("noblox.js")
const { Message, Client, MessageEmbed, CommandInteraction } = require("discord.js");
const Discord = require('discord.js');



module.exports = {
  name: "premium",
    description: "returns a users premium status",
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

         const hasPremium = await noblox.getPremium(information2)
  console.log(hasPremium)


   //let assetNamesa = badges.map(asset => asset.name).join("\n")

   //console.log(assetNamesa)
  
    const embed = new MessageEmbed()
    .setTitle(`Premium info for **${user}**`)
    .addField('Premium', `${hasPremium}`)
    .setTimestamp()
       interaction.reply({embeds: [embed]})
} catch(err) {
    console.log(err)
     interaction.reply({content: 'Please provide a valid user', ephemeral: true})
}



    },
};
