// noinspection JSUnusedLocalSymbols
exports.run = async (client, message, args, level) => {
    if (!args || args.length < 2) {
        return message.reply("Must provide an environment to deploy.");
    } else if (args[0] !== "AWS" || args[1] !== "Dev") {
        return message.reply("Unknown environment to deploy: " + args[0] + " " + args[1]);
    } else {
        message.channel.send(":cyclone: Processing the request...");
    }

    const artifacts = client.config.aartifacts;

    const versions = await Promise.all(artifacts.map(async (artifact) => {
        return await retrieveVersion(client.config.aurl, client.config.atoken, artifact.id, artifact.group);
    }));

    const names = artifacts.map((artifact) => {
        let name = artifact.name + " Version";
        return name.padEnd(20);
    });

    let versionsInfo = "";
    for (let i = 0; i < names.length; i++) {
        versionsInfo = versionsInfo + `• ${names[i]} :: ${versions[i]}
`;
    }

    const {spawn} = require('child_process'),
            cmd = spawn('scripts/' + client.config.ascript, [args[0], args[1]].concat(versions));

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
${versionsInfo}• Server               :: ${args[0]} ${args[1]}`, {code: "asciidoc"});
    });
};

function retrieveVersion(url, token, artifact, group) {
    return new Promise((resolve, reject) => {
        const request = require("request");
        const options = {
            method: 'GET',
            url: url + '/search/versions',
            qs: {g: group, a: artifact},
            headers: {'X-JFrog-Art-Api': token}
        };
        request(options, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                reject(`An error was sent by Artifactory: \n${JSON.stringify(error)}`);
            }

            const artifacts = JSON.parse(body);
            const version = artifacts.results[0].version;
            resolve(version);
        });
    });
}

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
