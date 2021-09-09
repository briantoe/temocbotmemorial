const paginationEmbed = require("discord.js-pagination");
const { MessageEmbed } = require("discord.js");
const { getTemocColor } = require("../utils/temocColorSelector");
const { prefix } = require("../config.json");

module.exports = {
  name: "hasRole",
  description: "Shows an embed with all the users with this role, paginated.",
  async execute(message, args, client) {
    const temp = args[0].match(/^<@&!?(\d+)>$/);
    const roleId = temp[1];

    const memberList = await message.guild.members
      .fetch()
      .then((members) =>
        members.filter((member) => member.roles.cache.has(roleId))
      );

    const roleList = memberList.map((member) => member.user);

    const role = message.guild.roles.cache.find((r) => r.id === roleId);

    if (roleList.length === 0) {
      const embed = new MessageEmbed()
        .setDescription(`There are no users with the role ${role}.`)
        .setColor(getTemocColor());
      message.channel.send(embed);
      return;
    }

    // divide list into chunks with 10 per chunk
    const numUsersPerPage = 10;
    const paginatedRoleList = new Array(
      Math.ceil(roleList.length / numUsersPerPage)
    )
      .fill()
      .map((_) => roleList.splice(0, numUsersPerPage));

    let counter = 1;
    const embedList = paginatedRoleList.map((roleList) => {
      const listOfMentions = roleList
        .map((r) => `${counter++}. ${r}`)
        .join("\n");
      const embed = new MessageEmbed()
        .setDescription(listOfMentions)
        .setColor(getTemocColor());
      return embed;
    });

    const embed = new MessageEmbed()
      .setDescription(`**These people have the ${role} role.**`)
      .setColor(getTemocColor());
    message.channel.send(embed);
    paginationEmbed(message, embedList);
  },
  syntax(message) {
    const embed = new MessageEmbed()
      .addFields({
        name: "Usage",
        value: `${prefix}${this.name} <@role>`,
      })
      .setDescription(`**${this.description}**`)
      .setColor(getTemocColor());
    message.channel.send(embed).then((msg) => {
      setTimeout(() => msg.delete(), 10000);
    });
  },
};
