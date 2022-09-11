const noblox = require("noblox.js")
const { Message, Client, MessageEmbed, CommandInteraction } = require("discord.js");
const fetch = require('node-fetch')
const Discord = require('discord.js');



module.exports = {
  name: "gameinfo",
    description: "returns a games info",
    type: 'CHAT_INPUT',
     options: [
    {
      name: "game",
      description: "provide a game id",
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
        
          let game = interaction.options.getString("game")
        let user2 = Number(game)
        

try {
    
    
    
    
    async function GetRobloxGame(game) {
        let response = await fetch(`https://apis.roblox.com/universes/v1/places/${game}/universe`)//.then(); 
        if (response.status != 200) {
           console.log('nope')
        }
        let _data = await response.json();
        //console.log(_data)
      //  console.log(_data) //.Id
        return _data.universeId;
        
    }
    let gameLang = await fetch(`https://gameinternationalization.roblox.com/v2/supported-languages/games/${pre}`)
    let gameLangDataYet = await gameLang.json()
    let gameLangData = gameLangDataYet.data.map(x => x.languageFamily.name)
    
    const pre = await GetRobloxGame(game)
    console.log(pre)
    
   const universeInfo = await noblox.getUniverseInfo([ pre ])
   console.log(universeInfo, 'info')


   let assetNamesa0 = universeInfo.map(asset => asset.name)//.join("\n")
   let assetNamesa1 = universeInfo.map(asset => asset.id)
   let assetNamesa2 = universeInfo.map(asset => asset.description)
   let assetNamesa3 = universeInfo.map(asset => asset.creator.name)
   let assetNamesa4 = universeInfo.map(asset => asset.allowedGearGenres)
   let assetNamesa5 = universeInfo.map(asset => asset.copyingAllowed)
  let assetNamesa6 = universeInfo.map(asset => asset.playing)
   let assetNamesa7 = universeInfo.map(asset => asset.visits)
   let assetNamesa8 = universeInfo.map(asset => asset.favoritedCount)
   let assetNamesa10 = universeInfo.map(asset => asset.maxPlayers)
   let assetNamesa9 = universeInfo.map(asset => asset.createVipServersAllowed)
   

 



    if(!assetNamesa0) assetNamesa0 = 'none'
    if(!assetNamesa1) assetNamesa1 = 'none'
    if(!assetNamesa2) assetNamesa2 = 'none'
    if(!assetNamesa3) assetNamesa3 = 'none'
    if(!assetNamesa4) assetNamesa4 = 'none'
    if(!assetNamesa5) assetNamesa5 = 'none'
    if(!assetNamesa6) assetNamesa6 = 'none'
    if(!assetNamesa7) assetNamesa7 = 'none'
    if(!assetNamesa8) assetNamesa8 = 'none'
    if(!assetNamesa9) assetNamesa9 = 'none'
    if(!assetNamesa10) assetNamesa10 = 'none'
    const embed = new MessageEmbed()
    .setTitle(`Info for place **${game}**`)
    .setURL(`https://roblox.com/games/${game}`)
    .addField('Name', `${assetNamesa0}`)
    .addField('ID', `${game}`)
    .addField('Universe ID', `${assetNamesa1}`)
    .addField('Description', `\`\`\`${assetNamesa2}\`\`\``)
    .addField('Creator', `${assetNamesa3}`)
    .addField('Allowed Gear Genres', `${assetNamesa4}`)
    .addField('Copying Allowed', `${assetNamesa5}`)
    .addField('Playing', `${assetNamesa6}`)
    .addField('Visits', `${assetNamesa7}`)
    .addField('Favorited Count', `${assetNamesa8}`)
    .addField('Max Players', `${assetNamesa10}`)
    .addField('Create Vip Servers', `${assetNamesa9}`)
    .addField('Languages Supported', `${gameLangData}`)

    .setTimestamp()
        interaction.reply({embeds: [embed]})
} catch(err) {
    console.log(err)
     interaction.reply({content: 'Please provide a valid game ID', ephemeral: true})
}

    },
};
