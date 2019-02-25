// noinspection JSUnusedLocalSymbols
exports.run = async (client, message, args, level) => {
    if (!args || args.length < 2) {
        return message.reply("Must provide an environment to deploy.");
    } else if (args[0] !== "AWS" || args[1] !== "Dev") {
        return message.reply("Unknown environment to deploy: " + args[0] + " " + args[1]);
    }

    const {spawn} = require('child_process'), cmd = spawn('scripts/deploy.sh', [args[0], args[1]]);

    cmd.stdout.on('data', data => {
        console.log(`stdout: ${data}`);
    });

    cmd.stderr.on('data', data => {
        console.log(`stderr: ${data}`);
    });

    cmd.on('close', code => {
        console.log(`child process exited with code ${code}`);
        // noinspection JSUnresolvedFunction
        message.channel.send(`= DEPLOY =
• App Version    :: 1.4.1
• Broker Version :: 1.1.0
• Server         :: AWS Dev`, {code: "asciidoc"});
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Moderator"
};

exports.help = {
    name: "deploy",
    category: "Infrastructure",
    description: "Deploys the latest version in the specified environment.",
    usage: "deploy [server] [environment]"
};
