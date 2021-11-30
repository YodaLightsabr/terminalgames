import chalk from 'chalk';
import formatting from '../formatting.js';
import { asyncTimeout as sleep } from '../utils.js'; // Feel free to add any utilities that might be used in other games or commands
import Prompt from 'prompt-sync';
const prompt = Prompt();

export const game = 'rps';
export const description = 'Rock paper scissors';

export default async function Command (args) {

  console.log(formatting.title('~ Rock Paper Scissors ~\n')); // Repeat the game title before any game logic

  console.log('Rock...'); // Run some game logic, add suspense to make it less boring
  await sleep(500);
  console.log('Paper...');
  await sleep(500);
  console.log('Scissors...');
  await sleep(500);
  const computerChoice = Math.floor(Math.random() * 3);
  const choice = prompt(formatting.command('Computer') + ' has chosen. Your choice is: [(r)ock, (p)aper, (s)cissors]  '); // Make sure to use a type of formatting when referencing a name or something that could change
  let option = 0;
  if (choice !== 'r' && choice !== 'p' && choice !== 's') {
    if (choice !== 'rock' && choice !== 'paper' && choice !== 'scissors') {
      if (choice == 'rock') option = 0;
      if (choice == 'paper') option = 1;
      if (choice == 'scissors') option = 2;
    } else {
      return console.log("That's not a valid choice.");
    }
  } else {
    if (choice == 'r') option = 0;
    if (choice == 'p') option = 1;
    if (choice == 's') option = 2;
  }
  // For games that are a black box of hidden logic, show the chosen options of both players
  console.log('Computer: ' + formatting.command((['Rock', 'Paper', 'Scissors'])[computerChoice]));
  console.log('You: ' + formatting.command((['Rock', 'Paper', 'Scissors'])[option]));
  if (computerChoice == option) {
    return console.log(`It's a ${formatting.title('tie!')}`);
  }
  if (computerChoice == (option + 1) % 3) return console.log(`${formatting.title('Computer')} wins!`);
  console.log(`${formatting.title('You')} win!`);
}