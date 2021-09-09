const { MessageEmbed } = require("discord.js");
const { prefix } = require("../config.json");
const { getTemocColor } = require("../utils/temocColorSelector");
module.exports = {
  name: "say",
  description: "Makes the bot say something in a specified channel.",
  async execute(message, args, client) {
    const regexChannel = args[0].match(/<#([0-9]+)>/);
    const channel = regexChannel ? regexChannel[1] : message.channel.id;

    if (args.includes("-embed")) {
      args = args.filter((i) => i !== "-embed");
      const msg = args.join(" ");
      const embed = new MessageEmbed()
        .setColor(getTemocColor())
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setDescription(msg);
      // .addFields({
      //   name: `Inline field asdfasdfd <@${message.author}>`,
      //   value: "**" + msg + `${message.author} **`,
      //   inline: true,
      // });
      const sendChannel = client.channels.cache.get(channel);
      sendChannel.send(embed);
    } else {
      const msg = args.join(" ");
      const sendChannel = client.channels.cache.get(channel);
      sendChannel.send(msg);
    }
  },
  syntax(message) {
    const embed = new MessageEmbed()
      .addFields({
        name: "Usage",
        value: `${prefix}${this.name} [<#channel>] [-embed] <your message here>`,
      })
      .setDescription(`**${this.description}**`)
      .setColor(getTemocColor());
    message.channel.send(embed).then((msg) => {
      setTimeout(() => msg.delete(), 10000);
    });
  },
};

// TODO: make @mentions work, (but not @everyones)
