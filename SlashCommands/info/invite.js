const { Client, CommandInteraction } = require("discord.js");
const { Message, MessageEmbed } = require("discord.js");
const {
  MessageActionRow,
  MessageButton
} = require("discord.js")
const Discord = require('discord.js');
module.exports = {
    name: "invite",
    description: "invite the bot",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        
        const embed = new MessageEmbed()
		embed.setColor('WHITE')
		embed.setDescription('Invite me to your server!')
        
         const Buttons = new MessageActionRow();
      Buttons.addComponents(
        new MessageButton()
        .setStyle('LINK')
      .setLabel("Invite me!")
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=980875637562703952&permissions=1532162993399&scope=bot%20applications.commands`)
        .setEmoji("🔗"),
        
        
      );
                const Butto = new MessageActionRow();
      Butto.addComponents(
        new MessageButton()
        .setStyle('LINK')
      .setLabel("Support Server")
        .setURL(`https://discord.gg/y7C5sR6bXu`)
        .setEmoji("📝"),
        
        
      );
        interaction.reply({embeds: [embed], components: [Buttons, Butto]})
    },
};
