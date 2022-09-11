
//const alt = require('../info/nicknameverifydb.js')
const alt = require('../../commands/info/nicknameverifydb.js')
const { Message, Client, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
    name: "verifynickname",
     description: 'verify nickname select',
    options: [
        {
            name: 'configure',
            description: 'If you want to enable/disable verified nickname.',
            type: 5,
            required: true
        },
    ],
    /**
     * @param {Client} client

     */
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('MANAGE_GUILD')) return;
        try {
            const guildDB = await alt.findOne({
                Guild: interaction.guildId
            });

            const dachoice = interaction.options.getBoolean("configure");

            let choice;
            if (dachoice) {
                choice = true
            }
            else if (!dachoice) {
                choice = false
            }

            if (!guildDB) {
                await new alt({
                    Guild: interaction.guildId,
                    Toggle: choice
                }).save()
            }

            if (guildDB) {

                return await alt.findOneAndUpdate({ Guild: interaction.guildId, Toggle: choice })
            }

            interaction.reply({
                content: "Successfully updated the verified nickname!"
            })

        } catch (err) {
            console.log(err)
        }




    },
};

