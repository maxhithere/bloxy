const noblox = require("noblox.js")
const { Message, Client, MessageEmbed, CommandInteraction } = require("discord.js");
const Discord = require('discord.js');



module.exports = {
  name: "friends",
    description: "returns a users friends",
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
       
 // let check = await noblox.getUsernameFromId(user)
  //let check2 = await noblox.getIdFromUsername(check) 



    
try {
let information2 = await noblox.getIdFromUsername(user) 
      let followers = await noblox.getFriends(information2, "Asc", 50)
   // console.log(followers)
   // console.log(followers)
  
 let assetNamesa = followers.data.map(asset => asset.name).join("\n")
//console.log(assetNamesa)
 if(!assetNamesa) assetNamesa = 'none'
    const embed = new MessageEmbed()
    .setTitle(`Friends for **${user}**`)
    .addField('Friends', `${assetNamesa}`)
    .setFooter({text: 'if you have more than 50 friends it wil not display, due to the limit of 1024 characters from discord'})
    .setTimestamp()
        interaction.reply({embeds: [embed]})
} catch(err) {
    console.log(err)
    interaction.reply({content: 'Please provide a valid user', ephemeral: true})
}



    },
};
