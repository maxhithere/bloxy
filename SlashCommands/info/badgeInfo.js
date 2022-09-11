const { Client, CommandInteraction } = require("discord.js");
const noblox = require("noblox.js");
const Discord = require('discord.js');
const fetch = require('node-fetch')
const moment =  require('moment')
module.exports = {
    name: "badgeinfo",
    description: "returns time the badge was awarded to a user",
    type: 'CHAT_INPUT',
    options: [
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
       
        const badgeID = interaction.options.getNumber('badge')
      
      
    try {
        const badges = await noblox.getBadgeInfo(badgeID)
       
        let badgeImageWait = await fetch(`https://thumbnails.roblox.com/v1/badges/icons?badgeIds=${badgeID}&size=150x150&format=Png&isCircular=true`)
       
        let badgeImageWait2 = await badgeImageWait.json()
       
        if(badgeImageWait2.errors) {
            return interaction.reply({content: 'This is not a valid badge!', ephemeral: true})
        }
        let badgeImage = badgeImageWait2?.data[0]?.imageUrl

        let unixCreated = moment(badges.created).format('DD/MM/YYYY')
        let unixUpdated = moment(badges.updated).format('DD/MM/YYYY')

        let embed = new Discord.MessageEmbed()
        .setTitle(`Badge Information for badge **${badges.name}**`)
        .addField('Name', `${badges.name}`)
        .addField('ID', `${badgeID}`)
        .addField('Description', `${badges.description}`)
        .addField('Created', `${unixCreated}`)
        .addField('Updated', `${unixUpdated}`)
        .addField('Enabled', `${badges.enabled}`)
        .addField('Awarded', `${badges.statistics.awardedCount}`)
        .addField('Win Rate (Percentage)', `${badges.statistics.winRatePercentage * 100}%`)
        .addField('Game', `${badges.awardingUniverse.name}`)
        .addField('Game ID', `${badges.awardingUniverse.id}`)
        .setThumbnail(`${badgeImage}`)
        .setTimestamp()

        interaction.reply({embeds: [embed]})

    } catch(err) {
        console.log(err)
       
    }
    },
};
