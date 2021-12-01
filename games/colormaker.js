import chalk from 'chalk';
import formatting, { colorMap, all, parseColorCode } from '../formatting.js';
import { asyncTimeout as sleep, asyncExecute as run, shell } from '../utils.js'; // Feel free to add any utilities that might be used in other games or commands
import Prompt from 'prompt-sync';
const prompt = Prompt();

export const game = 'util:colormaker';
export const description = 'Build layouts for graphical games';

export default async function Command (args) {

  console.log(formatting.title('~ Utility: Color Maker ~\n'));
  console.log(all()); // Repeat the game title before any game logic
  while (true) {

    let key = prompt('Enter key: '); // Make sure to use a type of formatting when referencing a name or something that could change
    if (key == 'exit') process.exit();
    console.log(parseColorCode(key));
  }
}
