module.exports = {
  name: "ping",
  description: "Ping!",
  execute(message) {
    message.channel.send(`${message.author} Pong.`);
  },
  syntax(message)
  {
    message.channel.send("Usage: just say ping")
  }
};
