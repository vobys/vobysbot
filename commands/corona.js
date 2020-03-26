exports.run = async (client, message, args, _) => {
  if (!args || args.length < 1) {
    return message.reply("Must provide a country to retrieve.");
  }

  const data = await retrieveData(args[0]);

  message.channel.send({
    embed: {
      color: 0x0099ff,
      title: "Corona Data",
      url: "https://github.com/NovelCOVID/API",
      description: "NovelCOVID API",
      fields: [
        {
          name: data.country,
          value: `Cases: ${data.cases}\nDeaths: ${data.deaths}`
        }
      ],
      thumbnail: {
        url: data.countryInfo.flag,
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
        url: `https://corona.lmao.ninja/countries/${country}`
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
