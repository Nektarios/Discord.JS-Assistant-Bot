const Discord = require("discord.js");
const config = require("../../settings/config.json");

module.exports.run = async (client, message, args) => {

    let kickpermerrorembed = new Discord.RichEmbed()
        .setTitle("ERROR")
        .setColor(config.red)
        .setDescription("You dont have enough permissions to use this command!")
        .setTimestamp(message.createdAt)
        .setFooter(`${config.projectName} Moderation`)

    if(message.member.hasPermission("KICK_MEMBERS")) {

        let kUser = message.mentions.users.first();
        if(kUser){
            let member = message.guild.member(kUser);
            if(member){
                let reason = args.slice(1).join(" ");
                if(!reason) reason = "No reason provided!";

                let kickusererrorembed = new Discord.RichEmbed()
                    .setTitle("ERROR")
                    .setColor(config.red)
                    .setDescription("I cannot kick this user!")

                let kickembed = new Discord.RichEmbed()
                    .setTitle("[KICK]")
                    .setColor(config.red)
                    .addField("Kicked user", `${member}`)
                    .addField("Kicked by", `${message.author.tag}`)
                    .addField("Reason", `${reason}`)
                    .setThumbnail("https://i.imgur.com/3HUYYnJ.gif")
                    .addField("Channel", message.channel)
                    .setTimestamp(message.createdAt)
                    .setFooter(`${config.projectName} Moderation`)

                let kickedembed = new Discord.RichEmbed()
                    .setTitle(`You were kicked from ${message.guild.name}`)
                    .setColor(config.color)
                    .addField("Kicked by", `${message.author.tag}`)
                    .addField("Reason", `${reason}`)
                    .setTimestamp(message.createdAt)
                    .setFooter(`${config.projectName} Moderation`)

                if(member.hasPermission("KICK_MEMBERS")) return message.reply(kickusererrorembed);

                member.send(kickedembed).then(member.kick(reason)).then(() => {
                    message.delete().catch(O_o=>{});
                }).catch(err => {
                    message.channel.send(`Sorry, ${message.author} I couldn't kick because of: ${err}`);
                    console.error(err);
                });
                    let logs = message.guild.channels.find(`name`, config.logsChannel);

                    if(logs){
                        logs.send(kickembed)
                    } else {
                        message.channel.send("User has been kicked!").then(message => message.delete(2500))
                    }
            }
        }
    } else {
        message.channel.send(kickpermerrorembed)
    }
}
module.exports.help = {
    name:"kick",
    aliases: []
}