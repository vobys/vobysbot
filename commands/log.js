// noinspection JSUnusedLocalSymbols
exports.run = async (client, message, args, level) => {
    if (!args || args.length < 2) {
        return message.reply("Must provide an environment of log.");
    } else {
        message.channel.send(":cyclone: Processing the request...");
    }

    const {spawn} = require('child_process'),
            cmd = spawn('scripts/' + client.config.developer.log, [args[0], args[1]]);

    cmd.stdout.on('data', data => {
        console.log(`stdout: ${data}`);
        // noinspection JSUnresolvedFunction
        message.channel.send(`= LOG =
• URL                  :: ${data}
• Server               :: ${args[0]} ${args[1]}`, {code: "asciidoc"});
    });

    cmd.stderr.on('data', data => {
        console.log(`stderr: ${data}`);
        // noinspection JSUnresolvedFunction
        message.channel.send(`= LOG =
• Error                :: ${data}
• Server               :: ${args[0]} ${args[1]}`, {code: "asciidoc"});
    });

    cmd.on('close', code => {
        console.log(`child process exited with code ${code}`);
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Developer"
};

exports.help = {
    name: "log",
    category: "Infrastructure",
    description: "Retrieve the log in the specified environment.",
    usage: "log [server] [environment]"
};
