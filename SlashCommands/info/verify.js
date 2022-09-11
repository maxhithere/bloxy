let fetch = require('node-fetch')
let codeWords = ['cat', 'dog', 'sun', 'rain', 'snow', 'alcazar', 'dight', 'night', 'morning', 'eyewater', 'flaws', 'physics', 'chemistry', 'history', 'martlet', 'nagware', 'coffee', 'tea', 'red', 'blue', 'green', 'orange', 'pink'];
const verify = require("../../commands/info/verifydb.js");
const verify2 = require("../../commands/info/verifydb2.js");
const verify3 = require('../../commands/info/nicknameverifydb.js')
const Discord = require('discord.js')
const veruser = require('../../commands/info/verifyusername.js');
//const alt = require('../../commands/info/nicknameverifydb.js')
const canvacord = require("canvacord")
let noblox = require('noblox.js');
const Guild = require("../../commands/info/logging.js");
const { WebhookClient } = require('discord.js');

module.exports = {

    name: 'verify',
   description: 'Verify your ROBLOX account!',
    options: [
        {
            name: 'username',
            description: 'Your ROBLOX username.',
            required: true,
            type: "STRING",
        }
    ],


    async run(client, interaction, args) {
      try{
        let channel;
        let guild = interaction.guild.name
        const dausername = interaction.options.getString("username");

        verify2.findOne({ Guild: interaction.guildId }, async (err, data) => {
            if (data == null) return interaction.reply('You cannot verify because this channel does not have a verified channel setup! Please contact the owner or server admins to let them know.')

            channel = data.Channel
            console.log(channel)
            if (interaction.channel.id !== channel) {
                return interaction.reply({
                    content: 'You can only run that command in a verified channel!',
                    ephemeral: true
                })
            }
        })


      
        //if (!guildQuery) return;

        let embed = new Discord.MessageEmbed()
            .setTitle('Roblox Verification')
            .setDescription('Please verify your ROBLOX account so we know you are not a bot')
            .setTimestamp();

        



        async function GetRobloxId(Username) {
            let response = await fetch(`https://api.roblox.com/users/get-by-username?username=${Username}`)//.then(); 
            if (response.status != 200) {
                console.log('nope')
            }
            let _data = await response.json();
            console.log(_data.Id)
            return _data.Id;

        }










        let RobloxId = await GetRobloxId(dausername);
        if (!RobloxId) {
            return interaction.reply({
                content: 'Please provide a valid ROBLOX username',
                ephemeral: true
            })
        }

        let Code = codeWords[Math.floor(Math.random() * codeWords.length)] + ' ' + codeWords[Math.floor(Math.random() * codeWords.length)] + ' ' + codeWords[Math.floor(Math.random() * codeWords.length)];
        embed.addField(`Please start your verification process.`, `Keep in mind, you only have to do **1** of the verification methods.`)
        embed.setColor(`AQUA`)
        embed.setDescription(`• Insert the code into your profile description.\n• Code: **${Code}**\n• If you are verifying in-game, follow the instructions upon joining.\n• Game: [Verification Game](<https://www.roblox.com/games/10459129877/Bloxy-Verification>)`)
        embed.setFooter({text: `This expires in 5 minutes`, icon_url: interaction.user.avatarURL()});

        const welcomer = new canvacord.Welcomer()
        .setUsername(`${dausername} (${(interaction.user.tag)})`)
        //.setMemberCount (message.member.guild.memberCount)
       // .setGuildName (member.guild.name)

        .setAvatar(`https://www.roblox.com/headshot-thumbnail/image?userId=${RobloxId}&width=420&height=420&format=png`)
        .setBackground(`https://preview.redd.it/toq3q2u3iqj51.png?width=640&crop=smart&auto=webp&s=ee1cdc0df52be7bfabf8d142c27f3f9b71582952`)
        .setColor("title", "#ffffff")
        .setColor("title-border", "#a8a7a7") //336d82
        .setColor("avatar", "#ffffff")
        .setColor("username", '#000000')
        .setColor("username-box", "#ffffff")
        .setColor("background", "#2f35e0")
        .setColor("border", "#faebd7")
        

         const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('primary')
            .setLabel('Verify')
            .setStyle('SUCCESS'),

            new Discord.MessageButton()
            .setCustomId('primary2')
            .setLabel('Cancel')
            .setStyle('DANGER'),


        );
         const row2 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('sent')
            .setLabel(`sent from ${guild}`)
            .setStyle('SECONDARY')
            .setDisabled(true),


        );
        
        
     let msg;
        if (RobloxId && channel == interaction.channel.id) {
            await interaction.reply(`Check your DM's! Please make sure they are enabled.`)
             msg = await interaction.user.send({ embeds: [embed], components: [row] });
        }

      

       const filter = (i) => i.user.id === interaction.user.id
       const collector = msg.channel.createMessageComponentCollector({
         filter, 
         time: 300000, 
       })
       const embed2 = new Discord.MessageEmbed()
       .setDescription(`Prompt Cancelled.`)
       .setColor('RED')


       collector.on('collect', async (i) => { //collecter
         if(i.customId === 'primary2') {
           return await msg.edit({embeds: [embed2], components: []})
         } else if(i.customId === 'primary'){

          async function p(){
            const presences = await noblox.getPresences([RobloxId])
            const presence = presences.userPresences[0].placeId
            console.log(presences)
           if(presence == 10459129877) {
             console.log('true')
             return true
           } else {
             console.log('false')
            
           }
          }

          let po = await p()

          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          /*
          


      

        SOMEHOW MOVE THE GAME CHECK TO BE AFTER THE CODE CHECK AND THEN IT MIGHT WORK






          */
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            
            // async function CheckForCode(userId, Code) {
            //     let response = await fetch(`https://www.roblox.com/users/${userId}/profile`).then();
            //     if (response.status != 200) { return false; }
            //     let html = await response.text();
            //     // console.log(html)
            //     if (html.indexOf(Code) != -1) {
            //         return true; //true
            //     }
            //     return console.log('no'); //false
            // }


            async function CheckForCode(userId, Code) {
              let response = await fetch(`https://www.roblox.com/users/${userId}/profile`).then();
              if (response.status != 200) { return false; }
              let html = await response.text();
              // console.log(html)
              if (html.indexOf(Code) != -1) {
                  return true; //true
              } else if(po == true) {
                  return true; //true
              } else {
                return false; //false
                
              }
             //return console.log('no'); //false
          }



            let found = await CheckForCode(RobloxId, Code);

            let embed3 = new Discord.MessageEmbed()
            .setTitle('Verification Logs')
            .setColor('GREEN')
            .setDescription('Verification logs for ' + `${interaction.guild.name}`)
            .addField(`User`, `${interaction.user.tag}`)
            .addField(`Roblox Username`, `${dausername}`)
            .addField(`Status`, `Success ✅`)
            .setTimestamp();
    
            let embed5 = new Discord.MessageEmbed()
            .setTitle('Verification Logs')
            .setColor('RED')
            .setDescription('Verification logs for ' + `${interaction.guild.name}`)
            .addField(`User`, `${interaction.user.tag}`)
            .addField(`Roblox Username`, `${dausername}`)
            .addField(`Status`, `Failure ❌`)
            .setTimestamp();

            let findTest = await Guild.findOne({ id: interaction.guild.id })
            console.log(findTest)
            
            async function log() {
            const guildQuery = Guild?.findOne({ id: interaction.guild.id }, async (err, data) => {
              if(err) throw err;
              console.log(data, 'is the data')
              if(!data) { return; }
              let ch = data.channel;
              console.log(ch)
              if(found == false){
                console.log('false' + found)
                client.channels.cache.get(`${ch}`).send({ embeds: [embed5] }); //webhookClient
              } else if(found == true){
                console.log('true' + found)
                client.channels.cache.get(`${ch}`).send({ embeds: [embed3] }); //webhookClient
              }
    
    
            });
          }
          await log()
            console.log(found)
            if(found == false){
                return ;//interaction.user.send('The code was not found in your profile!')
            }
            if (found == true) {
              
        //       let webhookid;
        //       let webhooktoken;
        // const guildQuery = Guild?.findOne({ id: interaction.guild.id }, async (err, data) => {
        //   if(err) throw err;
        //   if(!data){
        //     return
        //   } else{
        //     webhookid = data.webhookid
        //     webhooktoken = data.webhooktoken
        //     let webhookClient = new WebhookClient({ id: webhookid, token: webhooktoken });
        //     if(found == false){
        //       data.channel.send({ embeds: [embed5] }); //webhookClient
        //     } else if(found == true){
        //       data.channel.send({ embeds: [embed3] }); //webhookClient
        //     }
        //   }

        // });

        
   
       
  
        
       
                const wnew = new Discord.MessageEmbed()
                    .setTitle('You are now verified!')
                    .setDescription(`You are now verified in **${interaction.guild.name}**, enjoy your stay!`)
                    .setColor('GREEN')
                    .setTimestamp()
    
                await interaction.user.send({ embeds: [wnew], components: [row2] });
                await msg.edit({embeds: [embed], components: []})
                welcomer.build().then(data => {
                  const attachment = new Discord.MessageAttachment(data, 'welcomer.png')
                 interaction.user.send({files: [attachment] })
                  })
                 // webhookClient.send({ embeds: [embed3]}); ??  webhookClient.send({ embeds: [embed3]}); 
                  // webhookClient?.send({ embeds: [embed3]}) || null 


                verify.findOne({ Guild: interaction.guild.id }, async (err, data) => {
                    if (err) throw err
                    if (data == null) interaction.user.send('Well this is awkward, looks like there is no role setup to be verified to. Please contact the owner or a server admin to let them know.')
                    let role = data.Role
                    console.log(role)
                   
                    if (role) interaction.member.roles.add(role)
                })
                
                   let d = await veruser.findOne({User: dausername, ID: RobloxId, Member: interaction.user.id})
                  console.log(d)
                  if(!d || d == null || d == undefined) {
                      const newuser = new veruser({
                          User: args[0],
                          ID: RobloxId,
                          Member: interaction.user.id,
                      })
                      await newuser.save()
                      console.log('saved', newuser)
                  } else{
                  await veruser.findOneAndUpdate({User: args[0], ID: RobloxId, Member: interaction.user.id})
                    console.log('updated', veruser)
                  }

            
                  

    
    
                 verify3.findOne({ Guild: interaction.guild.id }, async (err, data) => {
                     if (err) throw err
                     if (data == null) return;
                     let name = data.Toggle
                     console.log(name)
                     if (name == true) {
                         interaction.member.setNickname(`(@${dausername}) ${interaction.user.username}`)
                         //console.log(message.member)
                     }
                 })
    
    
    
    
    
            }



         }
          


       








        else {

            //return await message.author.send(message.author.toString(), {embed});
            await interaction.user.send({content:'You have failed verification. The code not found in your profile, please try again.', components: []})
        } 

      } 
    
    
    
       )
    } catch (err) {
      console.log(err)
    } 
    } 
}
