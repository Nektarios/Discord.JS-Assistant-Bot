const {client} = require('../index.js');
const config = require("../settings/config.json");

client.on("ready", async () => {

    console.log(`${client.user.username} is ready for action!`)

    setInterval(async () => {

        const statuslist = [

            `${client.users.size} users at ${client.guilds.size} servers`,

            `AC Nektarios#1241`

        ];

        const random = Math.floor(Math.random() * statuslist.length);

        try {

            await client.user.setPresence({

                game: {

                    name: `${statuslist[random]}`,

                    type: "WATCHING"

                },
                status: 'dnd'

            })
        } catch (err) {
            console.error(err);
        }
    }, 10000)


    await client.guilds.keyArray().forEach(id => {

    });
});