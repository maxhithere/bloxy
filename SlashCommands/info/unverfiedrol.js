const discord = require("discord.js")
//const verify = require("../info/verify3db.js");
const verify = require('../../commands/info/verify3db.js')
module.exports = {

    name: "unverifiedrole",
    description: 'unverified role select',
    options: [
        {
            name: 'unverifiedrole',
            description: 'The role that would be added when the user joins the server.',
            type: 'ROLE',
            required: true
        },
    ],


    async run(client, interaction, args) {

	let role = interaction.options.getRole('unverifiedrole')

        if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply({
            content: "You do not have the permission to do this!",
            ephemeral: true
        })
        try {


            verify.findOne({ Guild: interaction.guildId }, async (err, data) => {
                if (!data) {
                    let newGuild = await new verify({
                        Guild: interaction.guildId,
                        Role: role,
                    })

                    await newGuild.save()

                    return interaction.reply({
                        content: "Successfully set the unverified role!"
                    })
                }
                else if (data) {
          // data.findOneAndUpdate({ Guild: message.guild.id, Toggle: choice })
          //  message.channel.send('Successfully updated the chat filter!')
          // console.log(data)
          data.Role = role
          await data.save()
          interaction.reply({
            content: 'Successfully updated the unverified role!'
          })
          console.log(data)
        }
            }
            )

        } catch (err) {
            console.log(err)
        }
    }
}