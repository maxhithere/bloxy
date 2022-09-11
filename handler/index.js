const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");
const Discord = require('discord.js')
const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

  
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        
        // Register for all the guilds the bot is in
         await client.application.commands.set(arrayOfSlashCommands);
    });

 
    const { mongooseConnectionString } = require('../config.json')
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString).then(() => console.log('Connected to database'));

    
    
      const errchannel = 'channel id (optional if u want a channel to send error messages to)'



process.on('unhandledRejection',(reason,p)=>{
    console.log("/{ANTI CRASH}\ Unhandled Rejection/Catch")
    console.log(reason,p)
    const errEmbed=new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Error")
        .setDescription("Error Occured, immediate assistance needed.**\n\nERROR:\n\n** ``"+reason+"\n\n"+p+"``")
        .setTimestamp()
    client.channels.cache.get(errchannel).send({embeds:[errEmbed]})
})



process.on('uncaughtException',(err, origin)=>{
    console.log("/{ANTI CRASH}\ Uncaught Exception")
    console.log(err,origin)
    const errEmbed=new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Error")
        .setDescription("Error Occured, immediate assistance needed.**\n\nERROR:\n\n** ``"+err+"\n\n"+origin+"``")
        .setTimestamp()
    client.channels.cache.get(errchannel).send({embeds:[errEmbed]})
})


process.on('uncaughtExceptionMonitor',(reason,p)=>{
    console.log("/{ANTI CRASH}\ Unhandled Exception/Catch")
    console.log(reason,p)
    const errEmbed=new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Error")
        .setDescription("Error Occured, immediate assistance needed.**\n\nERROR:\n\n** ``"+reason+"\n\n"+p+"``")
        .setTimestamp()
    client.channels.cache.get(errchannel).send({embeds:[errEmbed]})
})
                                                                                          

process.on('multipleResolves',(type,promise, reason)=>{
    console.log("/{ANTI CRASH}\ Multiple resolves")
    console.log(type,promise, reason)
    const errEmbed=new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Error")
        .setDescription("Error Occured, immediate assistance needed.**\n\nERROR:\n\n** ``"+ type+"\n\n"+promise+"\n\n"+reason+"``")
        .setTimestamp()
    client.channels.cache.get(errchannel).send({embeds:[errEmbed]})
})
    

};
