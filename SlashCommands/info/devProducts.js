const { Client, CommandInteraction } = require("discord.js");
const noblox = require("noblox.js");
const Discord = require('discord.js');
const fetch = require('node-fetch')
const moment =  require('moment')
module.exports = {
    name: "gamedeveloperproducts",
    description: "returns a games developer products",
    type: 'CHAT_INPUT',
    options: [
        {
			name: 'game',
			description: 'The game ID',
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
       
        const game = interaction.options.getNumber('game')
        let information2 = await noblox.getDeveloperProducts(game)
        if(!information2 || information2 == null ) {
            return interaction.reply({content:'Please provide a valid game ID', ephemeral: true})
        }
        
        
        let assetNamesa = information2.DeveloperProducts.map(asset => asset.Name + ": " + asset.PriceInRobux).join("\n")
      
      
    try {
       let embed = new Discord.MessageEmbed()
         .setTitle(`Developer products for game ${game}`)
            .setDescription(`${assetNamesa}`)
            .setTimestamp()

        interaction.reply({embeds: [embed]})
    } catch(err) {
        console.log(err)
       
    }
    },
};
