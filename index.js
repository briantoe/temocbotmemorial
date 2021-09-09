// index.js
const dotenv = require("dotenv");
const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");

const client = new Discord.Client();
client.commands = new Discord.Collection();
dotenv.config();

const prefix = config.prefix;
const sudo = config.sudo;

const commandsFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandsFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name.toLowerCase(), command);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async (message) => {
  if (
    !message.content.startsWith(prefix) ||
    message.author.bot ||
    !sudo.includes(message.author.id)
  )
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (!client.commands.has(command)) return;

  try {
    await client.commands.get(command).execute(message, args, client);
  } catch (error) {
    console.log(error);
    client.commands.get(command).syntax(message);

    // message.reply(
    //   `there was an error trying to execute that command \`(${command})\`!`
    // );
  }
});

client.login(process.env.TOKEN);
