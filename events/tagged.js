const client = require("../index");
const bl = require('../commands/info/blacklist.js')
client.on("messageCreate", async message => {
    //console.log(message.guild.id)
    if(!bl.Toggle || bl.Toggle == null) {
        return;
    }
  bl.findOne({ Guild: message.guild.id }, async (err, data) => {
      if( err) throw err
    if(data == null){
      return;
    }
    if(data.Toggle == "false") {
      return;
    } else if(data.Toggle == "true") {
      let blacklisted = ['fuck', 'hoe', 'whore', 'bitch', 'sped', 'nigga', 'nigger', 'niga', 'fhag', 'faggot', 'fag', 'smd', 'retard', 'boob', 'anal', 'vagina', 'pussy', 'dick', 'penis', 'porn', 'sperm', 'diok', 'yhole', 'whore', 'slut', 'clit', 'spastic', 'spaz', 'coochie', 'dike', 'cum', 'cock', 'ass', 'shit'];
      let foundInText = false;
      let length;
      let tagged = ['####', '###', '#####', '######', '##', '#######', '######']
        for (let i in blacklisted) {
          if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true
        }
        for (let j in tagged) {
          let ex = tagged[j]
         // console.log(ex)
          let msg = JSON.stringify(message.content.length)
          if (msg.includes(ex.length)) length = ex
        }
       
       
                 if (foundInText) { 
                      message.delete();
                    let msg2 = await message.channel.send(`The awful word that ${message.author} meant to say but was sensored was ${length}`)
                    setTimeout(() => msg2.delete(), 5000);
                  }
    } 
  })

  



});


