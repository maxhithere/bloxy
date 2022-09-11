const noblox = require("noblox.js")
const { Message, Client, MessageEmbed, CommandInteraction } = require("discord.js");
const Discord = require('discord.js');



module.exports = {
  name: "usersociallinks",
    description: "returns a users social links",
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

     const userSocialLinks = await noblox.getUserSocialLinks(information2)
     console.log(userSocialLinks)
    


   //console.log(assetNamesa)
   let fc = userSocialLinks.facebook
   let tw = userSocialLinks.twitter
   let yt = userSocialLinks.youtube
   let ti = userSocialLinks.twitch
   if(fc == null) fc = 'none'
   if(tw == null) tw = 'none'
   if(yt == null) yt = 'none'
   if(ti == null) ti = 'none'
   
    const embed = new MessageEmbed()
    .setTitle(`Social links for user **${user}**`)
    .addField('<:Facebook:311523715445817346> Facebook', `${fc}`)
    .addField('<:Twitter:328612835443736576> Twitter', `[${tw}](<https://twitter.com/${tw}>)`)
    .addField('<:YouTube:328612276636483584> Youtube', `${yt}`)
    .addField('<:Twitch:328616282305986560> Twitch', `${ti}`)
    .setTimestamp()
         interaction.reply({embeds: [embed]})
} catch(err) {
    console.log(err)
   interaction.reply({content: 'Please provide a valid user', ephemeral: true})
}



    },
};
