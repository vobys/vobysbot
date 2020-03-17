exports.run = async (client, message, args, _) => {
  if (!args || args.length < 1) {
    const reports = client.standup
      .findAll("day", new Date().getDate())
      .filter(report => report.channel === message.channel.name);
    reports.forEach(report =>
      message.channel.send(
        `:construction_worker: __**${report.member}**__:\n${report.text}`
      )
    );
    if (reports.length === 0) message.channel.send("No reports send yet!");
  } else if (args && message.guild) {
    const member = message.author.username;
    const text = args.join(" ");
    const key = `${message.guild.id}-${message.channel.name}-${
      message.author.id
    }-${new Date().getDate()}`;
    client.standup.ensure(key, {
      day: new Date().getDate(),
      channel: message.channel.name,
      member: member,
      text: text
    });
    client.standup.set(key, text, "text");
    message.channel.send(`Report to member ${member} was saved!`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Developer"
};

exports.help = {
  name: "standup",
  category: "Development",
  description: "Asynchronous standup meeting report.",
  usage: "standup [report text]"
};
