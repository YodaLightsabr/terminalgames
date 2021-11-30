import chalk from 'chalk';
import formatting from '../formatting.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const command = 'play';
export const usage = 'play <game>';
export const description = 'Play a CLI game';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function Command ([game, ...args]) {
  const games = {};
  const gamesDir = path.join(__dirname, '..', 'games');
  const gameFilePaths = fs.readdirSync(gamesDir)
    .filter(file => file.endsWith('.js'));
  for (const gameFile of gameFilePaths) {
    const gameData = await import(path.join(__dirname, '..', 'games', gameFile));
    games[gameData.game] = {
      execute: gameData.default,
      description: gameData.description || 'No info provided',
      name: gameData.game
    };
  };
  if (games[game]) {
    games[game].execute(args);
  } else {
    console.log(`Game ${formatting.command(game)} was not found.`)
  }
}