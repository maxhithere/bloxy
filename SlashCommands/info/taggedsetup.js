const discord = require("discord.js")
const bl = require("../../commands/info/blacklist.js");

module.exports = {

  name: "chatfilter",
    description: 'ROBLOX chatfilter system',
  options: [
    {
      name: 'configure',
      description: 'If you want to enable/disable the chat filter system.',
      type: 5,
      required: true
    },
  ],
  /**
   * @param {Client} client
   */

  async run(client, interaction) {
    let choice;

    if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply({
      content: 'You do not have the permission to do this!',
      ephemeral: true
    })
    try {

      const dabolean = interaction.options.getBoolean("configure");

      if(dabolean || !dabolean) {
        choice = dabolean
        console.log(choice)
      }
      
      bl.findOne({ Guild: interaction.guildId }, async (err, data) => {
        if (!data) {
          let newGuild = await new bl({
            Guild: interaction.guildId,
            Toggle: choice,
          })

          await newGuild.save()

          interaction.reply({
            content: 'Successfully updated the chat filter!'
          })
        } else if (data) {
          // data.findOneAndUpdate({ Guild: message.guild.id, Toggle: choice })
          //  message.channel.send('Successfully updated the chat filter!')
          // console.log(data)
          data.Toggle = choice
          await data.save()
          interaction.reply({
            content: 'Successfully updated the chat filter!'
          })
          console.log(data)
        }
      }
      )//.save() 

    } catch (err) {
      console.log(err)
    }
  }
}