const fs = require('fs');

const path = process.argv[2];

let buffer = fs.readFileSync(path);

let string = buffer.toString();

console.log(string.split(/\n/).length - 1);