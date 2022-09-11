const { CommandInteraction, Client, MessageEmbed, MessageButton, MessageSelectMenu, MessageActionRow } = require("discord.js");

const Discord = require('discord.js');
module.exports = {
    name: "help",
    description: 'help menu',
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
  
    





const welcome = new MessageEmbed()
.setColor(0x28CE5D)
.setTitle('**Help Menu**')
.addField('**Prefix**', '`/`')
.addField('**Invite**', '[Click here!](<https://discord.com/api/oauth2/authorize?client_id=980875637562703952&permissions=1532162993399&scope=bot%20applications.commands>)')
.addField('**Support Server**', '[Jump in!](<https://discord.gg/y7C5sR6bXu>)')


const users = new MessageEmbed()
.setColor(0x28CE5D)
.setTitle('User Commands')


.addField('Avatar', `usage: avatar user`)
.addField('Collectibles', `usage: collectibles user`)
.addField('Followers', `usage: followers user`)
.addField('Followings', `usage: followings user`)
.addField('User', `usage: user user`)
.addField('Friends', `usage: friends user`)
.addField('UserBadges', `usage: userbadges user`)  
.addField('Premium', `usage: premium user`)
.addField('UserSocialLinks', `usage: usersociallinks user`)


const games = new MessageEmbed()
.setColor(0x28CE5D)
.setTitle('Place Commands')

.addField('GameBadges', `usage: gamebadges placeID`)
.addField('GameSocialLinks', `usage: gamesociallinks placeID`)
.addField('GameInfo', `usage: gameinfo placeID`)
.addField('GameGamePasses', `usage: gamegamepasses placeID`)
.addField('GameDeveloperProducts', `usage: gamedeveloperproducts placeID`)


const groups = new MessageEmbed()
.setColor(0x28CE5D)
.addField('GroupInfo', `usage: groupinfo groupID`) 
.addField('GroupAssets', `usage: groupassests groupID`) 
.addField('GroupGames', `usage: groupgames groupID`) 
.addField('GroupLogo', `usage: grouplogo groupID`) 

const badge = new MessageEmbed()
.setColor(0x28CE5D)
.addField('BadgeInfo', `usage: badgeinfo badgeID`)
.addField('BadgeTimestamp', `usage: badgetimestamp user badgeID`)

const verifysystem = new MessageEmbed()
.setColor(0x28CE5D)
.addField('verify', `usage: verify user`)
.addField('update', `usage: update`)
.addField('forceverify', `usage: forceverify user`)
.addField('verifiedrole', `usage: verifiedrole role`)
.addField('unverifiedrole', `usage: unverifiedrole role`)
.addField('verifychannel', `usage: verifychannel channel`)
.addField('verifynickname', `usage: verifynickname true/false`)

const systems = new MessageEmbed()
.setColor(0x28CE5D)
.addField('chatfilter', `usage: chatfilter true/false`)
.addField('twitterchannel', `usage: twitterchannel channel`)
.addField('twitterrole', `usage: twitterrole role`)
.addField('twitteroff', `usage: twitteroff`)

const misc = new MessageEmbed()
.setColor(0x28CE5D)
.addField('discord2roblox', `usage: discord2roblox user`)
.addField('robux2usd', `usage: robux2usd robux`)
.addField('rs', `usage: rs assetID`)
.addField('rstos', `usage: rstos`)




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

    const options = []

    const option1 = { label: 'Main', value: '0' }
    const option2 = { label: 'Users', value: '1' }
    const option3 = { label: 'Games', value: '2' }
    const option4 = { label: 'Groups', value: '3' }
    const option8 = { label: 'Badges', value: '7' }
    const option5 = { label: 'Verification', value: '4' }
    const option6 = { label: 'Systems', value: '5' }
     const option7 = { label: 'Misc', value: '6' }
    // const option8 = { label: 'Page 8', value: '7' }
    // const option9 = { label: 'Page 9', value: '8' }
    // const option10 = { label: 'Page 10', value: '9' }

    options.push(option1, option2, option3, option4, option5, option6, option7, option8)
    let menu = new MessageSelectMenu()
      .setPlaceholder('Change the page!')
      .setCustomId('pagMenu')
      .addOptions(options)
      .setMaxValues(1)
      .setMinValues(1)

    const allButtons = [startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), endButton.setDisabled(false)]

    let group1 = new MessageActionRow().addComponents(menu)
    let group2 = new MessageActionRow().addComponents(allButtons)

    let helpMessage = await interaction.reply({
      embeds: [welcome],
      components: [group1, group2],
      fetchReply: true,
    })
    // const filter = b => b.user.id === message.author.id

    const collector = helpMessage.createMessageComponentCollector({ time: 30000 });


    var embeds = [welcome, users, games, groups, badge, verifysystem, systems, misc]

    for (let i = 0; i < 0; i++) embeds.push(new MessageEmbed().setColor('BLURPLE').setFooter(i))

    let currentPage = 0

    collector.on('collect', async (b) => {
      if(b.user.id !==interaction.user.id) return b.reply({
        content: 'This menu is not for you!',
    ephemeral: true
      })

      switch (b.customId) {
        case 'start':
          currentPage = 0
          group2 = new MessageActionRow().addComponents([startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), endButton.setDisabled(false)])
          b.update({ embeds: [embeds[currentPage]], components: [group1, group2] })
          break;
        case 'back':
          --currentPage;
          if (currentPage === 0) { group2 = new MessageActionRow().addComponents([startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), endButton.setDisabled(false)]) } else { group2 = new MessageActionRow().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(false), endButton.setDisabled(false)]) }
          b.update({ embeds: [embeds[currentPage]], components: [group1, group2] })
          break;
        case 'forward':
          currentPage++;
          if (currentPage === embeds.length - 1) { group2 = new MessageActionRow().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(true), endButton.setDisabled(true)]) } else { group2 = new MessageActionRow().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(false), endButton.setDisabled(false)]) }
          b.update({ embeds: [embeds[currentPage]], components: [group1, group2] })
          break;
        case 'end':
          currentPage = embeds.length - 1;
          group2 = new MessageActionRow().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(true), endButton.setDisabled(true)])
          b.update({ embeds: [embeds[currentPage]], components: [group1, group2] })
          break;
        case 'pagMenu':
          currentPage = parseInt(b.values[0])
          if (currentPage === 0) { group2 = new MessageActionRow().addComponents([startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), endButton.setDisabled(false)]) } else if (currentPage === embeds.length - 1) { group2 = new MessageActionRow().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(true), endButton.setDisabled(true)]) } else { group2 = new MessageActionRow().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(false), endButton.setDisabled(false)]) }
          b.update({ embeds: [embeds[currentPage]], components: [group1, group2] })
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
        
        


    },
};
