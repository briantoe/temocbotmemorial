const { MessageEmbed } = require("discord.js");
const { prefix } = require("../config.json");
const { getTemocColor } = require("../utils/temocColorSelector");
const { parseTime } = require("../utils/parseTime");

module.exports = {
  name: "meetup",
  description: `
    Creates a temporary role and sends a message into the channel prompting people to react to it to gain that temporary role.
    This role can be made mentionable. 
    After a specified time frame, the temporary role is deleted.
  `,
  execute(message, args, client) {
    // write your logic here
    const mentionable = args.includes("-mentionable");
    args = args.filter((i) => i !== "-mentionable");   
    const roleName = args[0];
    

  },
  syntax(message) {
    // syntax command
    const embed = new MessageEmbed()
      .addFields({
        name: "Usage",
        value: `${prefix}${this.name} <name of meetup> <time here> [<#channel>] [-mentionable]`,
      })
      .setDescription(`**${this.description}**`)
      .setColor(getTemocColor());
    message.channel.send(embed).then((msg) => {
      setTimeout(() => msg.delete(), 10000);
    });
  },
};
