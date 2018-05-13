import randomColor from "randomcolor";

const colors = {};

export default (string, type = 'bright') => {
  if (typeof colors[string] === 'undefined') {
    colors[string] = randomColor({luminosity: type});
  }

  return colors[string];
};
