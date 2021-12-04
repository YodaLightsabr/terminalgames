// basically a very messy model editor for displaying pixel graphics in the terminal

import chalk from 'chalk';
import formatting, { parseColorBlock, backgroundColorMap, keyTop, keyBottom } from '../formatting.js';
import { asyncTimeout as sleep, asyncExecute as run, shell } from '../utils.js'; // Feel free to add any utilities that might be used in other games or commands
import Prompt from 'prompt-sync';
const prompt = Prompt();

export const game = 'util:colormaker';
export const flags = ['hidden'];
export const description = 'Dev utility: Build layouts for graphical games';

export default async function Command (args) {

  console.log(formatting.title('~ Utility: Color Maker ~\n'));
  prompt('You are about to enter a development utility for designing models for games in the terminal. Press enter to continue, or Ctrl + C twice to exit.');
  var stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding('utf8');
  function generateCanvas (width, height) {
    let eachRow = 'a'.repeat(width).split('');
    let a = [];
    ' '.repeat(height).split('').forEach(() => {
      a.push(eachRow);
    });
    return a;
  }
  let stringifyCanvas = (canvas) => {
    return canvas.map(row => row.join('')).join('\n');
  }
  let canvas = generateCanvas(20, 10);
  canvas = JSON.parse(JSON.stringify(canvas))
  console.log('\n'.repeat(30))
  let caretX = 0;
  let caretY = 0;
  stdin.on('data', function(key){
    if (key == 2) {
      let width = prompt('resize > width: ');
      let height = prompt('resize > height: ');
      canvas = JSON.parse(JSON.stringify(generateCanvas(+width, +height)))
      console.clear();
      setTimeout(() => {
        console.clear();
      }, 100);
    }
    if (key == 1) {
      let choice = prompt('saves > [i]mport or [e]xport? ');
      if (choice == 'i') {
        let data = prompt('saves > save code: ');
        canvas = decodeURIComponent(data).split('\n').map(a => a.split(''));
        caretX = 0;
        caretY = 0;
      } else {
        console.log(encodeURIComponent(stringifyCanvas(canvas)));
        console.log('saves > use this code with the parseModel() function');
        prompt('saves > press enter once copied ');
      }
      console.clear();
      setTimeout(() => {
        console.clear();
      }, 100);
    }
      if (key == '\u001B\u005B\u0041') {
        caretY -= 1;
        showCursor = true;
         // process.stdout.write('up'); 
      }
      if (key == '\u001B\u005B\u0043') {
        caretX += 1;
        showCursor = true;
         // process.stdout.write('right'); 
      }
      if (key == '\u001B\u005B\u0042') {
        caretY += 1;
        showCursor = true;
        //  process.stdout.write('down'); 
      }
      if (key == '\u001B\u005B\u0044') {
        caretX -= 1;
        showCursor = true;
         // process.stdout.write('left'); 
      }
      if (caretX < 0) caretX = 0;
      if (caretY < 0) caretY = 0;
    if (backgroundColorMap[key]) {
      canvas[caretY][caretX] = key;
    
    }
    render();
      if (key == '\u0003') { process.exit(); }    // ctrl-c
  });
  function clear () {
    let linesToDelete = canvas.length / 2;
    linesToDelete += 2;
    for (let i = 0; i < linesToDelete; i++) {
   process.stdout.moveCursor(0, -1) // up one line
  // process.stdout.clearLine(1) // from cursor to end
  // console.log('\n'.repeat(50));
    }
  }
  let showCursor = false;
  async function render () {
        let c = JSON.parse(JSON.stringify(canvas));
    if (showCursor) {
      c[caretY][caretX] = ',';
    }
    let string = stringifyCanvas(c);
    clear();
    console.log(parseColorBlock(string));
    console.log('X', (caretX + '').padEnd(10, ' '), keyTop(), ' ', chalk.greenBright('1'), '- import/export model')
   console.log('Y', (caretY + '').padEnd(10, ' '), keyBottom(), ' ', chalk.blueBright('2'), '- resize canvas (warning, will clear canvas)')
  //  console.log(canvas);

  }
  setInterval(() => {
    showCursor = !showCursor;
    render();
  }, 500)
}
