#!/usr/bin/env node --harmony

const program = require('commander');
const atob = require('atob');

const readline = require('readline');
const fs = require('fs');

program
    .version('1.0.0')
    .arguments('<base64>', 'Base64 hash to be translated.')
    .option('-f, --file <file>', 'File with base64 hashes to be translated.')
    .action(function (base64) {
        _base64 = base64;
    })
    .parse(process.argv);

if (typeof _base64 !== 'undefined') {
    console.log(b2h(_base64));
} else if (program.file) {
    const rl = readline.createInterface({
        input: fs.createReadStream(program.file),
        output: process.stdout,
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