exports.run = async (client, message, args, _) => {
  if (!args || args.length > 1) {
    return message.reply("this is all your fault: too many parameters!");
  }

  const data = await retrieveData(args.length > 0 ? args[0] : null).catch(
    reason => {
      if (reason && reason.message)
        return message.reply(`we're doomed! ${reason.message}`);
      return message.reply("I'm quite beside myself.");
    }
  );

  message.channel.send({
    embed: {
      color: 0x0099ff,
      title: "Corona Data",
      url: "https://github.com/NovelCOVID/API",
      description: "NovelCOVID API",
      fields: [
        {
          name: args.length > 0 ? data.country : "All Countries",
          value: `Cases: ${data.cases}\nDeaths: ${data.deaths}`
        }
      ],
      thumbnail: {
        url:
          args.length > 0
            ? data.countryInfo.flag
            : "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/globe-with-meridians_1f310.png",
        height: 84,
        width: 84
      },
      timestamp: new Date(),
      footer: {
        text: message.author.username,
        // eslint-disable-next-line camelcase
        icon_url: message.author.avatarURL
      }
    }
  });

  function retrieveData(country) {
    return new Promise((resolve, reject) => {
      const request = require("request");
      const options = {
        method: "GET",
        url: `https://corona.lmao.ninja/v2/${
          country ? "countries/" + country : "all"
        }`
      };
      request(options, (error, response, body) => {
        if (error || response.statusCode !== 200) {
          reject(
            new Error(`An error was sent by API: \n${JSON.stringify(error)}`)
          );
        }

        resolve(JSON.parse(body));
      });
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "corona",
  category: "Miscelaneous",
  description: "Corona data from NovelCOVID API.",
  usage: "corana [country]"
};
