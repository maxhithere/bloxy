const noblox = require("noblox.js")
const moment = require("moment")
const { CommandInteraction, Client, MessageEmbed, MessageButton, MessageSelectMenu, MessageActionRow, Message} = require("discord.js");
const Discord = require('discord.js');
const fetch = require('node-fetch');



module.exports = {
  name: "user",
    description: "returns a users info",
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
           let information2 = await noblox.getIdFromUsername(user) 
           if(!information2 || information2 == null){
               return interaction.reply({content:'Please specify a valid ROBLOX username', ephemeral: true})
           }
  const presences = await noblox.getPresences([information2])
  let ress = await fetch(`https://games.roblox.com/v2/users/${information2}/games`)
  let res = await ress.json()
  //let gameData = res.data[0].name?.split(" ").join(", ") 
  
  let assetNamesa4 = res.data.map(asset => asset.name).join(", ")
  let ress2 = await fetch(`https://games.roblox.com/v2/users/${information2}/favorite/games`)
  let res2 = await ress2.json()
  
 // let gameData2 = res2.data[0]?.name?.split(" ").join(", ") || "None"
  let assetNamesa42 = res2.data.map(asset => asset.name).join(", ")
  if(!assetNamesa42) {
      assetNamesa42 = "None"
  }
        console.log(assetNamesa42, 'a')
  let ress3 = await fetch(`https://groups.roblox.com/v2/users/${information2}/groups/roles`)
  let res3 = await ress3.json()
  //let groupData = res3.data[0].group.name?.split(" ").join(", ") || "None"
  let assetNamesa43 = res3.data.map(asset => asset.group.name).join(", ")
    if(!assetNamesa43) {
      assetNamesa43 = "None"
  }
  let ress4 = await fetch(`https://groups.roblox.com/v1/users/${information2}/groups/primary/role`)
  let res4 = await ress4.json()
      if(!res4) {
      res4 = "None"
  }
      


try {
 let information = await noblox.getPlayerInfo({userId: information2})
    let type;
   if(presences.userPresences[0].userPresenceType == '1' || presences.userPresences[0].userPresenceType == 1){
    type = 'Online (1)'
   } else if(presences.userPresences[0].userPresenceType == '2' || presences.userPresences[0].userPresenceType == 2){
    type = 'In-Game (2)'
   } else if(presences.userPresences[0].userPresenceType == null || presences.userPresences[0].userPresenceType == '0' || presences.userPresences[0].userPresenceType == 0){
    type = 'Offline (0)'
    } 

    let lastlocation;
    if(presences.userPresences[0].lastLocation == null){
      lastlocation = 'None'
    } else if(presences.userPresences[0].lastLocation !== 'Website') {
      lastlocation = 'In-Game'
    } else{
      lastlocation = 'Website'
    }

    let gameid;
    if(presences.userPresences[0].placeId == null){
      gameid = 'Not Playing Anything'
    } else{
      gameid = presences.userPresences[0].lastLocation//presences.userPresences[0].placeId
    }
let lastonline = moment(presences.userPresences[0].lastOnline).format('MMMM Do YYYY, h:mm:ss a')

 let thumbnail_circHeadshot = await noblox.getPlayerThumbnail(information2, 420, "png", false, "Headshot")
                let thumb = thumbnail_circHeadshot.map(x=>x.imageUrl)


       if(!information) information = 'none'
     const embed1 = new MessageEmbed()
    .setTitle(`User information on user **${user}**`)
    .setThumbnail(`${thumb}`)
    .setColor('RANDOM')
    .setDescription(' ')
    .addField('Username', `${information.username}`)
    .addField('Display Name', `${information.displayName}`)
    .addField('About Me', `${information.blurb ? information.blurb : 'No Description'}`)
    .addField('Account Age', `${information.age+' days'}`)
    .addField('Friend Count', `${information.friendCount}`)
    .addField('Follower Count', `${information.followerCount}`)
    .addField('Following Count', `${information.followingCount}`)
    .addField('Banned', `${information.isBanned}`)
    .setTimestamp()

    const embed2 = new MessageEmbed()
    .setTitle(`Presence information on user **${user}**`)
    .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${information2}&width=420&height=420&format=png`)
    .setColor('RANDOM')
    .setDescription(' ')
    .addField('Type', `${type}`)
    .addField('Last Location', `${lastlocation}`)
    .addField('Playing', `${gameid}`)
    .addField('Last Online', `${lastonline}`)
    .setTimestamp()

    const embed3 = new MessageEmbed()
    .setTitle(`Game/Group information on user **${user}**`)
    .setDescription(' ')
    .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${information2}&width=420&height=420&format=png`)
    .setColor('RANDOM')
    .addField('Creations', `${assetNamesa4}`)
    .addField('Favorite Games', `${assetNamesa42.slice(0, 1024)}`)
    .addField('Primary Group', `${res4?.group?.name ? res4?.group?.name : 'None'}`)
    .addField('Groups (user is in)', `${assetNamesa43.slice(0, 1024)}`)
    .setTimestamp()
    
    
    
            let startButton = new MessageButton()
              .setStyle('PRIMARY')
              .setLabel('<<')
              .setCustomId('start')
        
            let backButton = new MessageButton()
              .setStyle('PRIMARY')
              .setLabel('<')
              .setCustomId('back')
        
            let forwardButton = new MessageButton()
              .setStyle('PRIMARY')
              .setLabel('>')
              .setCustomId('forward')
        
            let endButton = new MessageButton()
              .setStyle('PRIMARY')
              .setLabel('>>')
              .setCustomId('end')
        
            // const options = []
        
            // const option1 = { label: 'Main', value: '0' }
            // const option2 = { label: 'Presence', value: '1' }
            // const option3 = { label: 'Games', value: '2' }
            // const option4 = { label: 'Groups', value: '3' }
            // const option5 = { label: 'Verification', value: '4' }
            // const option6 = { label: 'Systems', value: '5' }
            //  const option7 = { label: 'Misc', value: '6' }
            // const option7 = { label: 'Page 7', value: '6' }
            // const option8 = { label: 'Page 8', value: '7' }
            // const option9 = { label: 'Page 9', value: '8' }
            // const option10 = { label: 'Page 10', value: '9' }
        
          //  options.push(option1, option2, option3, option4, option5, option6, option7)
            // let menu = new MessageSelectMenu()
            //   .setPlaceholder('Change the page!')
            //   .setCustomId('pagMenu')
            //   .addOptions(options)
            //   .setMaxValues(1)
            //   .setMinValues(1)
        
            //const allButtons = [startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), endButton.setDisabled(false)]
            const allButtons = [backButton.setDisabled(true), forwardButton.setDisabled(false)]
        
           // let group1 = new MessageActionRow().addComponents(menu)
            let group2 = new MessageActionRow().addComponents(allButtons)
        
            let helpMessage = await interaction.reply({
              embeds: [embed1],
              components: [group2],
              fetchReply: true,
            })
            // const filter = b => b.user.id === message.author.id
        
            const collector = helpMessage.createMessageComponentCollector({ time: 60000 });
        
        
            var embeds = [embed1, embed2, embed3]
        
            for (let i = 0; i < 0; i++) embeds.push(new MessageEmbed().setColor('BLURPLE').setFooter(i))
        
            let currentPage = 0
        
            collector.on('collect', async (b) => {
              if(b.user.id !==interaction.user.id) return b.reply({
                content: 'This menu is not for you!',
            ephemeral: true
              })
        
              switch (b.customId) {
                // case 'start':
                //   currentPage = 0
                //   group2 = new MessageActionRow().addComponents([startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), endButton.setDisabled(false)])
                //   b.update({ embeds: [embeds[currentPage]], components: [group2] })
                //   break;
                case 'back':
                  --currentPage;
                  if (currentPage === 0) { group2 = new MessageActionRow().addComponents([backButton.setDisabled(true), forwardButton.setDisabled(false)]) } else { group2 = new MessageActionRow().addComponents([backButton.setDisabled(false), forwardButton.setDisabled(false), ]) }
                  b.update({ embeds: [embeds[currentPage]], components: [group2] })
                  break;
                case 'forward':
                  currentPage++;
                  if (currentPage === embeds.length - 1) { group2 = new MessageActionRow().addComponents([ backButton.setDisabled(false), forwardButton.setDisabled(true)]) } else { group2 = new MessageActionRow().addComponents([backButton.setDisabled(false), forwardButton.setDisabled(false)]) }
                  b.update({ embeds: [embeds[currentPage]], components: [group2] })
                  break;
                // case 'end':
                //   currentPage = embeds.length - 1;
                //   group2 = new MessageActionRow().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(true), endButton.setDisabled(true)])
                //   b.update({ embeds: [embeds[currentPage]], components: [group2] })
                //   break;
                case 'pagMenu':
                  currentPage = parseInt(b.values[0])
                  if (currentPage === 0) { group2 = new MessageActionRow().addComponents([backButton.setDisabled(true), forwardButton.setDisabled(false)]) } else if (currentPage === embeds.length - 1) { group2 = new MessageActionRow().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(true), endButton.setDisabled(true)]) } else { group2 = new MessageActionRow().addComponents([ backButton.setDisabled(false), forwardButton.setDisabled(false)]) }
                  b.update({ embeds: [embeds[currentPage]], components: [group2] })
                  break;
                default:
                  currentPage = 0
                  b.update({ embeds: [embeds[currentPage]], components: null })
                  break;
              }
            });
        
            let endedButton = new MessageButton()
              .setStyle('DANGER')
              .setLabel('Time expired')
              .setCustomId('ended')
              .setEmoji("⏰")
              .setDisabled(true)
        
            var group3 = new MessageActionRow().addComponents(endedButton)
        
        
            collector.on('end', async (collected, reason) => {
              helpMessage.edit({ embeds: [helpMessage.embeds[0]], components: [group3] })
              if (reason === 'time') {
                helpMessage.edit({ embeds: [helpMessage.embeds[0]], components: [group3] })
              }
            });
        
            collector.on('error', (e) => console.log(e));



    
    
    
    
    
    
    
    
    
} catch(err) {
    console.log(err)
  interaction.reply({content: 'Please provide a valid username', ephemeral: true})
}



    },
};
