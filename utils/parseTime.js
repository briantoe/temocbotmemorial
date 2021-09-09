module.exports = {
  parseTime(s) {
    const unitMapping = {
      d: 60 * 60 * 24,
      h: 60 * 60,
      m: 60,
      s: 1,
    };

    const matches = s.match(/\d*\.?\d+[dhms]/g);
    if (!matches) {
      return undefined;
    }

    let result = 0;
    for (let match of matches) {
      const unit = unitMapping[match.slice(-1)];
      const number = parseFloat(match.slice(0, -1));
      result += unit * number;
    }

    return result;
  },
};
