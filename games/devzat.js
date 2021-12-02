import chalk from 'chalk';
import formatting from '../formatting.js';
import { asyncTimeout as sleep, asyncExecute as run, shell } from '../utils.js'; // Feel free to add any utilities that might be used in other games or commands
import Prompt from 'prompt-sync';
const prompt = Prompt();

export const game = 'devzat';
export const description = 'Chat over SSH';

export default async function Command (args) {

  console.log(formatting.title('~ Devzat by @quackduck ~\n')); // Repeat the game title before any game logic


  let name = prompt('Your name: '); // Make sure to use a type of formatting when referencing a name or something that could change
  if (!name) name = 'TerminalGames_' + (Math.floor(Math.random() * 10000)).toString().substring(0, 3);
  await shell('ssh', [name + '@devzat.hackclub.com']);
  //run(`ssh ${name}@devzat.hackclub.com`);
}
