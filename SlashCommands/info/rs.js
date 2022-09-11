const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const noblox = require("noblox.js")
const fetch = require('node-fetch')
const Discord = require('discord.js');
const { DOMParser } = require('xmldom')
  
  module.exports = {
      name: "rs",
      description: "converts an asset to a template",
    type: 'CHAT_INPUT',
    options: [
		{
			name: 'asset',
			description: 'The asset ID',
			type: 'STRING',
			required: true
		},
	],
      run: async (client, interaction, args) => {
    
       
        //2888350255
      try {
        let ab = interaction.options.getString("asset");
        let a = Number(ab)

        let fullURL = `https://www.roblox.com/catalog/${a}`


        var assetID = fullURL.match(/(\d+)/)[0]; // Get assetID



        let response3 = await fetch(`https://api.roblox.com/marketplace/productinfo?assetId=` + assetID)//.then(); 
        if (response3.status != 200) {
            console.log('nope')
        }
        let rdata = await response3.json();

        let embed = new MessageEmbed();
        embed.addField(`Price`, `${rdata.PriceInRobux}`, true)
        embed.addField(`Sales`, `${rdata.Sales}`, true)
        embed.addField(`For Sale`, `${rdata.IsForSale}`, true)







        let response2 = await fetch(`https://assetdelivery.roblox.com/v1/assetId/` + assetID)//.then(); 
        if (response2.status != 200) {
            console.log('nope')
        }
        let _data = await response2.json();

       
        embed.addField(`Location`, `[Click Me!](<${_data.location}>)`, true)
        embed.addField(`RequestID`, `${_data.requestId}`, true)
        embed.addField(`Hash Dynamic`, `${_data.IsHashDynamic}`, true)
        embed.addField(`Copyright Protected`, `${_data.IsCopyrightProtected}`, true)
        embed.addField(`Archived`, `${_data.isArchived}`, true)






let imgURL;

if(!a) return interaction.reply('Please provide an asset ID')
















        function findJSON (url) { 
            fetch(url)
          .then(response => response.text())
          .then(data => extractXML(data.slice(13,67))); // Slice off url part
        }   
        






        function extractXML (url) {
            var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xhttp = new XMLHttpRequest();

           
            var parser, xmlDoc;
            parser = new DOMParser(); 
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    xmlDoc = parser.parseFromString(xhttp.responseText,"text/xml") // Parses XML
                    imgURL = xmlDoc.getElementsByTagName("url")[0].childNodes[0].nodeValue.match(/(\d+)/)[0] // Extract the numbers 
                    let neww = `https://www.roblox.com/catalog/${imgURL}`
                    
                    // .setImage(neww)
                    embed.setTitle('Asset Template');
                    embed.setDescription(`${neww}`);
                    embed.setImage(`https://image.thum.io/get/png/width/1920/crop/720/noanimate/${neww}`);
                  
                    
                    // .setThumbnail(`https://image.thum.io/get/png/width/1920/crop/720/noanimate/${neww}`)
                    embed.setTimestamp();
                    interaction.reply({embeds: [embed]})                    //openURL(imgURL)
                    console.log(imgURL+' 1')
                }
            }
            xhttp.open("GET", url, true);
            xhttp.send();   
        }












       


        //async function info(info) {
           
           
          //  console.log(_data) //.Id
            //return _data;
            
       // }
        



       









       let req = "catalog"
       if (fullURL.includes(req)) {
            
            var URL = 'https://assetdelivery.roblox.com/v1/assetId/' + assetID; 
           var ImageAsset = findJSON(URL)
         
        }




          let pneww = `https://www.roblox.com/catalog/${ImageAsset}`
         // console.log(neww)

        //console.log(neww)


     
      } catch(err) {
          console.log(err)
          interaction.reply('Please provide a valid asset **ID**')

      }
       
      
  
   
   
  
      },
  };
  
  
    

