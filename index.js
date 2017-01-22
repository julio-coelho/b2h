#!/usr/bin/env node --harmony

const program = require('commander');
const atob = require('atob');

const readline = require('readline');
const fs = require('fs');

program
    .version('1.0.0')
    .option('-b, --base64 <base64>', 'Base64 hash to be translated.')
    .option('-f, --file <file>', 'File with base64 hashes to be translated.')
    .option('-o, --output <output>', 'Output file with hexadecimal result.')
    .parse(process.argv);

if (program.base64) {
    console.log(b2h(program.base64));
} else if (program.file) {

    if (!program.output) {
        console.error('Ops .... I have an input but not an output.')
        process.exit(-2);
        return;
    }

    const rl = readline.createInterface({
        input: fs.createReadStream(program.file),
        output: fs.createWriteStream(program.output),
        terminal: false
    });

    rl.on('line', (line) => {
        let chunck = line.split(':');
        if (chunck.length > 1) {
            rl.output.write(chunck[0] + ':' + b2h(chunck[1]) + '\n');
        } else {
            rl.output.write(b2h(chunck[0]) + '\n');
        }
    });

} else {
    console.error('Hey Sr .... What I have to do ?')
    process.exit(-1);
    return;
}

function b2h(base64) {

    let raw = atob(base64);

    let hexadecimal = '';

    for (i = 0; i < raw.length; i++) {

        let _hex = raw.charCodeAt(i).toString(16)

        hexadecimal += (_hex.length == 2 ? _hex : '0' + _hex);

    }

    return hexadecimal.toLowerCase();
}