const discord = require("discord.js");
const secret = require("./settings/secret.json");
const client = new discord.Client({
    disableEveryone: true
});

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

const lib = require("./lib/functions");
lib.setup(client);

module.exports.client = client;

client.login(secret.token);