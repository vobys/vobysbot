// noinspection JSUnusedLocalSymbols
exports.run = async (client, message, args, level) => {
    if (!args || args.length === 1) {
        message.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Kudos",
                url: "https://www.google.com/search?q=kudos+feedback",
                description: "Real-time Continuous Peer Feedback",
                fields: [{
                    name: "Good Job! " + args[0],
                    value: "Em breve teremos mais uma funcionalidade aqui."
                }],
                thumbnail: {
                    url: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/198/military-medal_1f396.png",
                    height: 84,
                    width: 84
                },
                timestamp: new Date(),
                footer: {
                    text: "© Vobys"
                }
            }
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Developer"
};

exports.help = {
    name: "kudos",
    category: "Miscelaneous",
    description: "Real-time Continuous Peer Feedback.",
    usage: "kudos [name]"
};
