const client = require("../index");
const verify = require("../commands/info/verify3db.js");
client.on("guildMemberAdd", async (member) => {
     let role;
	  verify.findOne({Guild: member.guild.id} , async (err, data) => {
                if(err) throw err
            if(!data) return;
                role = data.Role
               console.log(role)
              
                if(role) member.roles.add(role)
              })

});


