import chalk from 'chalk';
import formatting from '../formatting.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const command = 'list';
export const description = 'List all games';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function Command (args) {
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
  }
  console.log('Game Menu');
  console.log(
    Object.values(games).map(({ description, name }) => `${formatting.command(name)} - ${description}`).join('\n')
  );
}