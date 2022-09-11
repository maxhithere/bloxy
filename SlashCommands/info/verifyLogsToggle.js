const { MessageEmbed } = require("discord.js");
const Guild = require("../../commands/info/logging.js");

module.exports = {
 
    name: 'verifylogs',
    description: "set a logging channel for verification logs",
    type: 'CHAT_INPUT',
    options: [
		{
			name: 'toggle',
			description: 'Turn on or off verification logs',
			type: 'BOOLEAN',
			required: true
		},
    {
			name: 'channel',
			description: 'The channel for logs',
			type: 'CHANNEL',
			required: true
		},
	],

run: async (client, interaction, args) => {
    try
    {

      let disabled = new MessageEmbed()
      .setTitle('Disabled Verification Logs') 
      .setDescription('Verification logs have been disabled!')
      .setColor('GREEN')
      .setTimestamp()

      const toggle = interaction.options.getBoolean('toggle');
        if(toggle === false) {
          await Guild.findOneAndDelete({
            id: interaction.guild.id,
          });
          return interaction.reply({ embeds: [disabled] });
        } else {
          let noperm = new MessageEmbed()
          .setTitle('Invalid Permissions')
          .setDescription('You do not have the permission to perform this action!')
          .setColor('RED')
          .setTimestamp()
        
            const isSetup = await Guild.findOne({ id: interaction.guild.id });
            const channel =  interaction.options.getChannel('channel')
        
         
            let invalid = new MessageEmbed()
            .setTitle('Invalid Channel')
            .setDescription('Please provide a valid text channel!')
            .setColor('RED')
            .setTimestamp()
    
    
    
            let valid = new MessageEmbed()
            .setTitle('Logging Channel Set')
            .setDescription('Successfully set the logging channel to ' + `${channel}`)
            .setColor('GREEN')
            .setTimestamp()
    
          if(!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply({ embeds: [noperm], ephemeral: true })
              if (channel.type != "GUILD_TEXT") {
                interaction.reply({
                  embeds: [invalid],
                  ephemeral: true
                });
                return;
              }
        
          
             
       
              
              if(!isSetup){
                const newLogs = new Guild({
                  id: interaction.guild.id,
                  channel: channel.id,
                });
                newLogs.save();
              } else if(isSetup){
                // Guild.findOneAndDelete({ id: interaction.guild.id, channel: channel.id });
                // const newLogss = new Guild({
                //   id: interaction.guild.id,
                //   channel: channel.id,
                // });
                // newLogss.save()
                await Guild.findOneAndUpdate({ id: interaction.guild.id , channel: channel.id });
              }
            
            
              
              interaction.reply({
                embeds: [valid],
              });
            
        }
       
        }

        catch(err)
        {
           console.log(err)
        }

  
}
}
