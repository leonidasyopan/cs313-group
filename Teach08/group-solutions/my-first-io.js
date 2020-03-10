const fs = require('fs');

let buffer = fs.readFileSync(process.argv[2]);

let string = buffer.toString();


console.log(string.split(/\n/).length - 1);