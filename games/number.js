import chalk from 'chalk';
import formatting from '../formatting.js';
import { asyncTimeout as sleep } from '../utils.js'; // Feel free to add any utilities that might be used in other games or commands
import Prompt from 'prompt-sync';
const prompt = Prompt();

export const game = 'guessnum';
export const description = 'Guess the number';

export default async function Command (args) {

  console.log(formatting.title('~ Guess the Number ~\n')); // Repeat the game title before any game logic

  const computerChoice = Math.floor(Math.random() * 100) + 1;
  console.log('Computer has chosen. You may make your first guess.')
  let num = 1;
  let guess;
  while (!(computerChoice == guess)) {
    guess = prompt('Guess-O-Matic > Guess #' + num + ': ');
    num++;
    if (computerChoice == guess) {
      let message = 'You guessed correctly!';
      if (num < 3) message += ` In ${num} tries!!`;
      else if (num < 10) message += ` It took you ${num} tries.`;
      else message += ` It only took you ${num} tries to finally get it, but I guess we all have goals.`;
      console.log(message);
    } else {
      console.log(+guess > computerChoice ? 'Lower' : 'Higher');
    }
  }
}