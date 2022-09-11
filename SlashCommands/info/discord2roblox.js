
const fetch = require('node-fetch')
const { Message, Client, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const { Configuration, BloxlinkAPI } = require("@morgann1/bloxlink");
const noblox = require('noblox.js');
const configuration = new Configuration({
    apiKey: "09e3e2f6-c44c-423b-b317-00c9d7ebf5418c47c5bd-26f4-4f70-ae56-d62e9ba70be6f7a1d323-5d10-49bd-991b-fa6d6b374c4f"
});

const bloxlink = new BloxlinkAPI(configuration);

module.exports = {
    name: "discord2roblox",
    description: 'queries results from roblox of a discord user',
    type: 'CHAT_INPUT',
options: [
    {
        name: 'user',
        description: 'The user',
        type: 'USER',
        required: true
    },
],
   
    run: async (client, interaction, args) => {
        const embednorover = new MessageEmbed();
        const embedyesrover = new MessageEmbed();
        const embednobloxlink = new MessageEmbed();
        const embedyesbloxlink = new MessageEmbed();
        const embednorbxbolt = new MessageEmbed();
        const embedyesrbxbolt = new MessageEmbed();
        let _data;
        let user = interaction.options.getMember('user').id || null
        let successful1
        let successful2;
        let successful3;
        let successful4;
        let rbxidd;
        let id2;
        let userr;
        let userr2;
        //console.log(user)
       
        try {

            //rover

            async function info(user) {

                let response = await fetch(`https://verify.eryn.io/api/user/${user}`)//.then(); 
                if (response.status == 404) {
                    _data = 'No ROBLOX accounts linked with this user.'
                }



                else if (response.status !== 200) {
                    console.log('nope')
                }
                else {
                    _data = await response.json();
                }

                return _data;

            }



            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



            //bloxlink


            async function info2(user) {


                let response = await bloxlink.search(`${user}`)
                console.log(response)
                if (!response.user.robloxId) {
                    _data = 'No ROBLOX accounts linked with this user.'
                }

                else {
                 //   console.log(response)
                    _data = response.user;
                  //  console.log(_data)
                }

                return _data;

            }



            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            //rover initialize

            let final = await info(user)
            //console.log(final)
            if (final === 'No ROBLOX accounts linked with this user.') {
              //  embednorover.addField(`Rover (No Result)`, `No ROBLOX accounts linked with this user.`)
                   // .setFooter({ text: 'Thank you RbxSociety for the inspiration of this command' })
                    successful1 = false
            } else {
              //  embedyesrover.addField(`Rover (Result)`,`https://www.roblox.com/users/${final.robloxId}/profile`)
                   // .setFooter({ text: 'Thank you RbxSociety for the inspiration of this command' })
                    successful1 = true
                    id2 = final.robloxId
                    userr = final.robloxUsername
            }


            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            //bloxlink initialize
            let bloxid;
            let final2 = await info2(user)
            console.log(final2)
            //console.log(final)
            if (final2 === 'No ROBLOX accounts linked with this user.') {
                //embedno.addField(`Bloxlink (No Result)`, `No ROBLOX accounts linked with this user.`)
                 //   .setFooter({ text: 'Thank you RbxSociety for the inspiration of this command' })
                    successful2 = false

            }
            else if (final2 === undefined) {
              //  embed.setDescription(`No ROBLOX accounts linked with this user.`)
                 //   .setFooter({ text: 'Thank you RbxSociety for the inspiration of this command' })
                    successful2 = false
                
                   
                    
            }


            


            else {
                //embedyes.addField(`Bloxlink (Result)`,`https://www.roblox.com/users/${final.robloxId}/profile`)
                //    .setFooter({ text: 'Thank you RbxSociety for the inspiration of this command' })

                successful2 = true
                rbxidd = final.robloxId
                console.log(rbxidd)
                if(rbxidd === undefined){
                    successful2 = false }else{
                        userr2 = await noblox.getUsernameFromId(rbxidd)
                    }
                
               
                //userr2 = final.robloxUsername
            }




            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // rbx bolt

            
            async function info3(user) {

                let response = await fetch(`https://api.rbxbolt.com/v1/discord/${user}?key=7B7N24zyYUFKo6DroOvuQvY5xpH0BF8eLji`)//.then(); 
                if (response.status == 404) {
                    _data = 'No ROBLOX accounts linked with this user.'
                }



                else if (response.status !== 200) {
                    console.log('nope')
                }
                else {
                    _data = await response.json();
                }

                return _data;

            }


            let finalrbxbolt = await info3(user)



            if (finalrbxbolt == 'No ROBLOX accounts linked with this user.') {
              //  embedno.addField(`RBXBolt (No Result)`, `No ROBLOX accounts linked with this user.`)
                 //   .setFooter({ text: 'Thank you RbxSociety for the inspiration of this command' })
                    successful3 = false
            } else if(finalrbxbolt.UserId == undefined){
                successful3 = false
            } 
               
            
            else {
               // embedyes.addField(`RBXBolt (Result)`,`https://www.roblox.com/users/${final.UserId}/profile`)
                //    .setFooter({ text: 'Thank you RbxSociety for the inspiration of this command' })
                    successful3 = true
                    
            }



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//let pl;
let k;
let responser = `https://devforum.roblox.com/u/${userr ? userr : userr2}/`
if(responser.status == 404 || responser == `https://devforum.roblox.com/u/undefined/`){
     k = {
        pl : 'Devforum (No Result)',
        dl : 'Could not find user or private account.'

    } 
} else{
    k = {
        pl : 'Devforum (Result)',
        dl : `${responser}`

    } 
}

// async function info4(user) {

//     let response = await fetch(`https://devforum.roblox.com/u/${userr ? userr : userr2}/summary`)//.then(); 
//     if (response.status == 404) {
//         _data = 'No ROBLOX accounts linked with this user.'
//     }



//     else if (response.status !== 200) {
//         console.log('nope')
//     }
//     else {
//         _data = await response.json();
//     }

//     return _data;

// }
























if(successful1 === false && successful2 === false && successful3 === false){
    let em = new MessageEmbed()
    em.addField(`Rover (No Result)`, `No ROBLOX accounts linked with this user.`)
   
    em.addField(`Bloxlink (No Result)`, `No ROBLOX accounts linked with this user.`)
    em.addField(`RBXBolt (No Result)`, `No ROBLOX accounts linked with this user.`)
    em.addField(`${k.pl}`, `${k.dl}`)
    interaction.reply({embeds: [em]})
}

if(successful1 === true && successful2 === false && successful3 === false){
    let em = new MessageEmbed()
    em.addField(`Rover (Result)`,`https://www.roblox.com/users/${id2}/profile`)
   
    em.addField(`Bloxlink (No Result)`, `No ROBLOX accounts linked with this user.`)
    em.addField(`RBXBolt (No Result)`, `No ROBLOX accounts linked with this user.`)
    em.addField(`${k.pl}`, `${k.dl}`)
  interaction.reply({embeds: [em]})
}

if(successful1 === false && successful2 === true && successful3 === false){
    let em = new MessageEmbed()
    em.addField(`Rover (No Result)`, `No ROBLOX accounts linked with this user.`)
   
    em.addField(`Bloxlink (Result)`,`https://www.roblox.com/users/${rbxidd}/profile`)
    em.addField(`RBXBolt (No Result)`, `No ROBLOX accounts linked with this user.`)
    em.addField(`${k.pl}`, `${k.dl}`)
   interaction.reply({embeds: [em]})
}

if(successful1 === false && successful2 === false && successful3 === true){
    let em = new MessageEmbed()
    em.addField(`Rover (No Result)`, `No ROBLOX accounts linked with this user.`)
   
    em.addField(`Bloxlink (No Result)`, `No ROBLOX accounts linked with this user.`)
    em.addField(`RBXBolt (Result)`,`https://www.roblox.com/users/${finalrbxbolt.UserId}/profile`)
    em.addField(`${k.pl}`, `${k.dl}`)
  interaction.reply({embeds: [em]})
}

if(successful1 === true && successful2 === true && successful3 === false){
    let em = new MessageEmbed()
    em.addField(`Rover (Result)`,`https://www.roblox.com/users/${id2}/profile`)
   
    em.addField(`Bloxlink (Result)`,`https://www.roblox.com/users/${rbxidd}/profile`)
    em.addField(`RBXBolt (No Result)`, `No ROBLOX accounts linked with this user.`)
    em.addField(`${k.pl}`, `${k.dl}`)
    interaction.reply({embeds: [em]})
}

if(successful1 === true && successful2 === false && successful3 === true){
    let em = new MessageEmbed()
    em.addField(`Rover (Result)`,`https://www.roblox.com/users/${id2}/profile`)
   
    em.addField(`Bloxlink (No Result)`, `No ROBLOX accounts linked with this user.`)
    em.addField(`RBXBolt (Result)`,`https://www.roblox.com/users/${finalrbxbolt.UserId}/profile`)
    em.addField(`${k.pl}`, `${k.dl}`)
    interaction.reply({embeds: [em]})
}

if(successful1 === false && successful2 === true && successful3 === true){
    let em = new MessageEmbed()
    em.addField(`Rover (No Result)`, `No ROBLOX accounts linked with this user.`)
   
    em.addField(`Bloxlink (Result)`,`https://www.roblox.com/users/${rbxidd}/profile`)
    em.addField(`RBXBolt (Result)`,`https://www.roblox.com/users/${finalrbxbolt.UserId}/profile`)
    em.addField(`${k.pl}`, `${k.dl}`)
    interaction.reply({embeds: [em]})
}

if(successful1 === true && successful2 === true && successful3 === true){
    let em = new MessageEmbed()
    em.addField(`Rover (Result)`,`https://www.roblox.com/users/${id2}/profile`)
   
    em.addField(`Bloxlink (Result)`,`https://www.roblox.com/users/${rbxidd}/profile`)
    em.addField(`RBXBolt (Result)`,`https://www.roblox.com/users/${finalrbxbolt.UserId}/profile`)
    em.addField(`${k.pl}`, `${k.dl}`)
    
   interaction.reply({embeds: [em]})
}










            // if (successful) {
            //     message.channel.send({
            //         embeds: [embedyes]
            //     })
            // } else {
            //     message.channel.send({
            //         embeds: [embedno]
            //     })
            // }


        } catch (err) {
            console.log(err)
        }

    },
};
