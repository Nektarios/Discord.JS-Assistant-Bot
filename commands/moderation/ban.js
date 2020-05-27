const Discord = require("discord.js");
const config = require("../../settings/config.json");

module.exports.run = async (client, message, args) => {

    let permerrorembed = new Discord.RichEmbed()
        .setTitle("ERROR")
        .setColor(config.red)
        .setDescription("You do not have enough permissions to use this command!")
        .setTimestamp(message.createdAt)
        .setFooter(`${config.projectName} Moderation`)

    if(message.member.hasPermission("BAN_MEMBERS")) {

        let user = message.mentions.users.first();
        if (user) {
            let member = message.guild.member(user);
            if (member) {
                let reason = args.slice(1).join(" ");
                if (!reason) reason = "No reason provided";

                let usererrorembed = new Discord.RichEmbed()
                    .setTitle("ERROR")
                    .setColor(config.red)
                    .setDescription("I cannot ban this user!")

                let banneddminfoembed = new Discord.RichEmbed()
                    .setTitle("You have been banned.")
                    .setDescription(`Apparently you have been banned from ${message.guild.name}.\n More information below.`)
                    .addField("Banned by:", message.author.tag)
                    .addField("Reason:", reason)
                    .setColor(config.color)
                    .setTimestamp(message.createdAt)
                    .setFooter(`${config.projectName} Moderation`)

                let banembed = new Discord.RichEmbed()
                    .setTitle(`${member.user.avatarURL}`, `[BAN] ${member.user.username}`)
                    .setColor(config.red)
                    .setThumbnail("https://i.imgur.com/3HUYYnJ.gif")
                    .addField("Banned by:", `${message.author.tag}`, true)
                    .addField("Reason", `${reason}`, true)
                    .addField("Channel", message.channel, true)
                    .setTimestamp(message.createdAt)

                if (member.hasPermission("BAN_MEMBERS")) return message.reply(usererrorembed);
                member.send(banneddminfoembed).then(() => {

                    setTimeout(function () {
                        member.ban(reason)
                    }, 4000)

                    message.delete().catch(O_o => {
                    });
                }).catch(err => {
                    message.channel.send(`Sorry, ${message.author} I couldn't ban because of: ${err}`);
                    console.error(err);
                })

                let logs = message.guild.channels.find(`name`, config.logsChannel);
                    if (logs) {
                        logs.send(banembed)
                    } else {
                        message.channel.send("User has been kicked!").then(message => message.delete(3000))
                    }
            }
        }
    } else {
        return message.channel.send(permerrorembed);
    }
}
module.exports.help = {
    name:"ban",
    aliases: []
}