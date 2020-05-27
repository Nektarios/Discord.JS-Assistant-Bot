const Discord = require("discord.js");
const config = require("../../settings/config.json");

module.exports.run = async (client, message, args) => {

    let muteusererrorembed = new Discord.RichEmbed()
        .setTitle("ERROR")
        .setColor(config.red)
        .addField("I could not find this user, make sure you spell his name correctly.")
        .setTimestamp(message.createdAt)
        .setFooter(`${config.projectName} Moderation`)

    let mUser = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!mUser) return message.reply(muteusererrorembed);

    let mutepermerrorembed = new Discord.RichEmbed()
        .setTitle("ERROR")
        .setColor(config.red)
        .addField("You do not have enough permissions to use this command.")
        .setTimestamp(message.createdAt)
        .setFooter(`${config.projectName} Moderation`)

    if(mUser.hasPermission("MANAGE_MESSAGES")) return message.reply(mutepermerrorembed);
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }

    let mutetimeerrorembed = new Discord.RichEmbed()
        .setTitle("ERROR")
        .setColor(config.red)
        .addField("You did not specify a time for this mute!")
        .setFooter(`${config.projectName} Moderation`)

    let mutetime = args[1];
    if(!mutetime) return message.reply(mutetimeerrorembed);

    let muteembed = new Discord.RichEmbed()
        .setTitle("[MUTE]")
        .setColor(config.red)
        .addField("Muted User", `${mUser}`, true)
        .addField("Moderator", `<@${message.author.id}>`, true)
        .setTimestamp();

    let logs = message.guild.channels.find(`name`, `${config.logsChannel}`);
    message.delete().catch(O_o=>{});

    if(logs){
        logs.send(muteembed);
    }

    await(mUser.addRole(muterole.id));
    message.reply(`<@${mUser.id}> has been muted for ${ms(ms(mutetime))}`);

    setTimeout(function(){
        mUser.removeRole(muterole.id);
        message.channel.send(`Mute from <@${mUser.id}> has been removed!`);
    }, ms(mutetime));

}

module.exports.help = {
    name: "mute",
    aliases: []
}