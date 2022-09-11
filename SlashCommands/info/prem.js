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
   
 
       let information2 = await noblox.getIdFromUsername(user) 
 



    
try {

         const hasPremium = await noblox.getPremium(information2)
  console.log(hasPremium)


 
  
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
