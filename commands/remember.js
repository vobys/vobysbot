exports.run = async (client, message, args, _) => {
  if (!args || args.length < 5) {
    return message.reply("this is all your fault: missing parameters!");
  }

  if (args[1] !== "in" || !/\d+[hms]/.test(args[2]) || args[3] !== "to") {
    return message.reply("this is all your fault: parse error!");
  }

  const member = message.mentions.members.first();
  const unit = args[2].replace(/\d*/, "");
  let delay = parseInt(args[2].replace(/\D/, ""), 10);
  const remember = args.slice(4).join(" ");

  if (unit === "m") delay *= 60;
  else if (unit === "h") delay *= 3600;

  setTimeout(
    (msg, mention, note) =>
      msg.channel.send(`<@${mention.user.id}>, remember to ${note}!`),
    delay * 1000,
    message,
    member,
    remember
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Developer"
};

exports.help = {
  name: "remember",
  category: "Miscelaneous",
  description: "Remember for scheduled notification.",
  usage: "remember [mention] in [delay][h|m|s] to [message]"
};
