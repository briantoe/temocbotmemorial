const { temocColors } = require("./config.json");

module.exports = {
  getTemocColor() {
    return temocColors[Math.floor(Math.random() * temocColors.length)];
  },
};
