#!/usr/bin/env node
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import Stump from 'stump.js';
import formatting from './formatting.js';
const stump = new Stump(['Debug', 'Timestamp']);
import { fileURLToPath } from 'url';

const args = process.argv.slice(2);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log(chalk.blue('Terminal Games\n') + chalk.blueBright('Fun minigames to play in your terminal\n'));

const games = async () => {
  const commands = {};
  const commandsDir = path.join(__dirname, 'commands');
  const commandFilePaths = fs.readdirSync(commandsDir)
    .filter(file => file.endsWith('.js'));
  for (const commandFile of commandFilePaths) {
    const commandData = await import(path.join(__dirname, 'commands', commandFile));
    commands[commandData.command] = {
      execute: commandData.default,
      description: commandData.description || 'No info provided',
      name: commandData.command,
      usage: commandData.usage || commandData.command
    };
  }
  const command = args.shift();
  if (command == undefined) {
    console.log('Run ' + formatting.command('games help') + ' to view all commands.');
  } else if (command == 'help') {
    console.log('Help Menu');
    console.log(
      Object.values(commands).map(({ description, usage }) => `${formatting.command(usage)} - ${description}`).join('\n')
    );
  } else if (commands[command]) {
    commands[command].execute(args, {
      originalCommand: command
    });
  } else {
    console.log('Command ' + formatting.command(command) + ' was not found. Run ' + formatting.command('games help') + ' to view all commands.');
  }
}

games();