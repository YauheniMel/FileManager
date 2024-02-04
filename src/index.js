import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { Commander } from "./commander/index.js";


const rl = readline.createInterface({input, output});


const arg = process.argv[2];
const name = arg.substring(arg.indexOf('=') + 1);

const commander = new Commander(name);

rl.prompt();

rl.on('line', async (line) => {
    const [command, ...args] = line.trim().split(' ');

    if(command === '.exit') {
        rl.close();
    } else {
        commander.command = command;
        commander.args = args;

        await commander.action();

        rl.prompt();
    }
});

rl.on('close', () => {
    commander.sayBye();
})

