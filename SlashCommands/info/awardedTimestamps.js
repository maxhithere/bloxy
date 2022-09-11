const { Client, CommandInteraction } = require("discord.js");
const noblox = require("noblox.js");
const Discord = require('discord.js');
const fetch = require('node-fetch')
const moment =  require('moment')
module.exports = {
    name: "badgetimestamp",
    description: "returns time the badge was awarded to a user",
    type: 'CHAT_INPUT',
    options: [
		{
			name: 'user',
			description: 'The user',
			type: 'STRING',
			required: true
		},
        {
			name: 'badge',
			description: 'The badge ID',
			type: 'NUMBER',
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
        const user = interaction.options.getString('user')
        const badgeID = interaction.options.getNumber('badge')
       // const badge = Number(badgeID)
        let information2 = await noblox.getIdFromUsername(user) 
        if(!information2 || information2 == null ) {
          return interaction.reply({content:'Please provide a valid user', ephemeral: true})
        }
    try {
        const badges = await noblox.getAwardedTimestamps(information2, [badgeID])
        console.log(badges)
        let badgeImageWait = await fetch(`https://thumbnails.roblox.com/v1/badges/icons?badgeIds=${badgeID}&size=150x150&format=Png&isCircular=true`)
       
        let badgeImageWait2 = await badgeImageWait.json()
       
        if(badgeImageWait2.errors) {
            return interaction.reply({content: 'This user does not have this badge', ephemeral: true})
        }
        let badgeImage = badgeImageWait2?.data[0]?.imageUrl

       let assetNamesa = badges.data.map(asset => asset.awardedDate).join("\n")
       if(!assetNamesa) {
        return interaction.reply({content: 'This user does not have this badge', ephemeral: true})
       } else {
        let unixTimestamp = moment(assetNamesa).format('DD/MM/YYYY')
       
        let embed = new Discord.MessageEmbed()
        .setTitle(`Badge awarded date for **${user}**`)
        .addField('Badge ID', `${badgeID}`)
        .addField('Date Awarded', `${unixTimestamp}`)
        .setThumbnail(`${badgeImage}`)
        .setTimestamp()
            interaction.reply({embeds: [embed]})
         }
    } catch(err) {
        console.log(err)
       
    }
    },
};
