const client = require("../index");
const moment = require('moment')
const noblox = require("noblox.js")
const fetch = require('node-fetch')
const { Message, Client, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const { TwitterClient } = require('twitter-api-client')

const db = require('../commands/info/twittermodel.js')
let {CronJob} = require('cron')
client.on("guildMemberUpdate", () => {
    
    let token = `twitter token`
let role;
let channel;
    let client2 = require("../index");

    let job = new CronJob(
        '*/5 * * * *',
        function() {
            client2.guilds.cache.forEach(async guild => {
                db.findOne({ Guild: guild.id }, async (err, data) => {
                if(!data || data == null){
                    return;
                } 
                else if(data.Channel == null){
                    return;

                }

         
                
                else{
                  if(data.Role == null){
                    role = null
                  }
                    data.Role = role
                    data.Channel = channel


                    try{


                      const fetchTweetsFromUser = async function(screenName, count) {
                          const response = await fetch(
                            `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${screenName}&count=${count}`,
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          )
                          const json = await response.json()
                          return json
                        }
               
               let arr = []
                        let final = await fetchTweetsFromUser('Roblox', '1')
                        console.log(final)
                        let ok = final.map(x => x.text)
                       let ok2 = final.map(x => x.user.profile_image_url)
                   let supercalifragilisicexpealidocious = final.map(x => x.id_str)
                     arr.push(supercalifragilisicexpealidocious)
                  let check = await db.findOneAndUpdate({ Tweet: supercalifragilisicexpealidocious})
                
                  
                  
                        let ok3 = final.map(x => x.retweet_count)
                        if(!ok3) ok3 = 'none'
                        let ok4 = final.map(x => x.favorite_count)
                        if(!ok4) ok4 = 'none'
                        let compare = final.map(x => x.created_at)
                        console.log(compare)
               
               
               
                       let yes = moment(Date.now()).toISOString(true).substring(0, 23)
                       let yes2 = moment(new Date(compare)).toISOString(true).substring(0, 23)//.getTime() / 1000)
               
                   
               
               
               
               
               
               
               
               
                        let embed = new MessageEmbed()
                   
                        .setTitle('New Roblox Tweet!')
                        .setColor('AQUA')
                        .setDescription(`${ok}`)
                        .setThumbnail(ok2[0])
                        .setURL(`https://twitter.com/Roblox/status/${supercalifragilisicexpealidocious}`)
                        .addField('Retweets', `${ok3}`, true)
                        .addField('Favorites', `${ok4}`, true)
               
                   
                        console.log(check.Tweet, 'check')
                        console.log(supercalifragilisicexpealidocious, 'super')
                 for(let i in arr) {
                      if(arr[i] !== supercalifragilisicexpealidocious && role !== null){
                        channel.send(`<@${role}>`).then(() => {
                          client.channels.cache.get(channel).send({embeds: [embed]})
                      })
                      }

                      else if(arr[i] !== supercalifragilisicexpealidocious && role == null){
                        client.channels.cache.get(channel).send({embeds: [embed]})

          
           }

           else {
            return;
           }






                 }
                   
                  } catch(err){
                    console.log(err)
                  }
              

              }})
      })
  }
  
  )
      null,
      true,
      'America/Los_Angeles'
  

  

})

