const veruser = require('../../commands/info/verifyusername.js');
const Discord = require('discord.js')
const noblox = require("noblox.js")
const moment =  require('moment')


module.exports = {
    name: "profile",
    description: "returns profile of verified user",
type: 'CHAT_INPUT',
    
    run: async (client, interaction, args) => {
        let find;
        let find2;

     let cr = veruser.findOne({ Member: interaction.user.id }, async (err, data) => {
            if (err) throw err
            if (data == null || !data){
                 return interaction.reply({content:'You have not verified your account yet! Please run /verify <username> to verify your account and then try again!', ephemeral: true})
            } else {
                find = data.User
                find2 = data.ID
                
                

                let information = await noblox.getPlayerInfo(find2)
                let unixTimestamp = moment(`${information.joinDate}`).format('YYYY/MM/DD')
 			let thumbnail_circHeadshot = await noblox.getPlayerThumbnail(find2, 420, "png", false, "Headshot")
                let thumb = thumbnail_circHeadshot.map(x=>x.imageUrl)
                
                const row2 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
           // .setCustomId('profilelink')
            .setLabel(`Profile`)
            .setEmoji(`<:roblox2:1007766889654649003>`)
            .setStyle('LINK')
            .setURL(`https://www.roblox.com/users/${find2}/profile`),


        );
                
                
                const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Profile of ${interaction.user.username} (${find})`)
                .setThumbnail(`${thumb}`)
                .addField('Username', `[${find}](<https://www.roblox.com/users/${find2}/profile>)`, true)
                .addField('ID', `\`${find2}\``, true)
                .addField('Join Date', `${unixTimestamp}`, true)
                .addField('Account Age', `${information.age} days`, true)
               // .addField('online', information.isOnline, true)
                .addField('Banned', `${information.isBanned}`, true)
               
                .addField('Roblox Description', `\`\`\`${information.blurb}\`\`\``, true)
                .addField('\u200b', `\u200b`, false)
                .addField('Discord Username', `${interaction.user.username}`, true)
                .addField('Discord ID', `\`${interaction.user.id}\``, true)
        
                .setTimestamp()
                interaction.reply({embeds: [embed], components: [row2]})
            }
            
        })









       

        // if(!find || find == null || !find2 || find2 == null) {
        //     return message.channel.send('You have not verified your account yet! Please run /verify <username> to verify your account and then try again!')
        // }

      
   


     
    },
};
