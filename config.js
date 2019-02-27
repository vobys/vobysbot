const externalConfig = require("./config.json");

const config = {
    // Bot Owner, level 10 by default. A User ID. Should never be anything else than the bot owner's ID.
    "ownerID": externalConfig.owner,

    // Bot Admins, level 9 by default. Array of user ID strings.
    "admins": externalConfig.admins,

    // Bot Support, level 8 by default. Array of user ID strings
    "support": externalConfig.supports,

    // Your Bot's Token. Available on https://discordapp.com/developers/applications/me
    "token": externalConfig.token,

    // Artifactory Settings
    "atoken": externalConfig.artifactory.token,
    "aurl": externalConfig.artifactory.url,
    "aartifacts": externalConfig.artifactory.artifacts,
    "ascript": externalConfig.artifactory.script,

    "defaultSettings": {
        "prefix": externalConfig.prefix,
        "modLogChannel": externalConfig.modLogChannel,
        "devRole": externalConfig.devRole,
        "modRole": externalConfig.modRole,
        "adminRole": externalConfig.adminRole,
        "systemNotice": externalConfig.systemNotice,
        "welcomeChannel": externalConfig.welcomeChannel,
        "welcomeMessage": externalConfig.welcomeMessage,
        "welcomeEnabled": externalConfig.welcomeEnabled
    },

    permLevels: [
        {
            level: 0,
            name: "User",
            check: () => true
        },

        {
            level: 1,
            name: "Developer",
            check: (message) => {
                try {
                    const devRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.devRole.toLowerCase());
                    if (devRole && message.member.roles.has(devRole.id)) return true;
                } catch (e) {
                    return false;
                }
            }
        },

        {
            level: 2,
            name: "Moderator",
            check: (message) => {
                try {
                    const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
                    if (modRole && message.member.roles.has(modRole.id)) return true;
                } catch (e) {
                    return false;
                }
            }
        },

        {
            level: 3,
            name: "Administrator",
            check: (message) => {
                try {
                    const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
                    return (adminRole && message.member.roles.has(adminRole.id));
                } catch (e) {
                    return false;
                }
            }
        },

        {
            level: 4,
            name: "Server Owner",
            check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id) : false
        },

        {
            level: 8,
            name: "Bot Support",
            check: (message) => config.support.includes(message.author.id)
        },

        {
            level: 9,
            name: "Bot Admin",
            check: (message) => config.admins.includes(message.author.id)
        },

        {
            level: 10,
            name: "Bot Owner",
            check: (message) => message.client.config.ownerID === message.author.id
        }
    ]
};

module.exports = config;
