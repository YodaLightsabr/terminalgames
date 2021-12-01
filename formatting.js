import chalk from 'chalk';

const command = chalk.blueBright;
const title = chalk.yellowBright;

export default {
  command,
  title
}

export {
  command,
  title
}

export const colorMap = {
  // Basic colors
  "a": "black",
  "s": "red",
  "d": "yellow",
  "f": "green",
  "g": "cyan",
  "h": "blue",
  "j": "magenta",
  "k": "white",

  // Bright colors
  "z": "blackBright",
  "x": "redBright",
  "c": "yellowBright",
  "v": "greenBright",
  "b": "cyanBright",
  "n": "blueBright",
  "m": "magentaBright",
  ",": "whiteBright",

  // Background colors
  "1": "bgBlack",
  "2": "bgRed",
  "3": "bgYellow",
  "4": "bgGreen",
  "5": "bgCyan",
  "6": "bgBlue",
  "7": "bgMagenta",
  "8": "bgWhite",

  // Bright background colors
  "q": "bgBlackBright",
  "w": "bgRedBright",
  "e": "bgYellowBright",
  "r": "bgGreenBright",
  "t": "bgCyanBright",
  "y": "bgBlueBright",
  "u": "bgMagentaBright",
  "i": "bgWhiteBright",

  '-': '-'
};

export const backgroundColorMap = {
  // Basic colors
  "a": "1",
  "s": "2",
  "d": "3",
  "f": "4",
  "g": "5",
  "h": "6",
  "j": "7",
  "k": "8",

  // Bright colors
  "z": "q",
  "x": "w",
  "c": "e",
  "v": "r",
  "b": "t",
  "n": "y",
  "m": "u",
  ",": "i",


  '-': '-'
};

export function all () {
  let output = '';
  for (const color in colorMap) {
    output += chalk[colorMap[color]]('▄');
  }
  return output;
}

export function parseSingleColor (colorCode) {
  if (!colorMap[colorCode]) return ((input) => input); 
  if (colorCode == '-') return ((input) => input); 
  return chalk[colorMap[colorCode]];
}

export function parseColorCode (colorCode) {
  colorCode = colorCode.split('').map(code => {
    return parseSingleColor(code);
  });
  let output = '▀';//'▄';
  for (const fn of colorCode) {
    output = fn(output);
  }
  return output;
}

export function parseColorBlock (colorBlock) {
  let lines = colorBlock.split('\n').filter(a => a);
  let length = lines[0].length;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].length !== length) {
      lines[i] = 'a'.repeat(length);
    }
  }
  if (lines.length % 2 == 1) {
    lines.push('-'.repeat(length));
  }
  let outlines = [];
  lines.forEach((line, i) => {
    if (i % 2 == 0) { // if even
      outlines.push(line.split(''));
    } else {
      outlines[outlines.length - 1] = outlines[outlines.length - 1].map((line2, num) => {
        line2 += backgroundColorMap[line[num]];
        return line2;
      });
    }
  });
  outlines = outlines.map(row => {
    return row.map(item => parseColorCode(item)).join('');
  }).join('\n');
  return outlines;
}