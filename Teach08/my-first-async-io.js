const fs = require('fs');

fs.readFile(process.argv[2], 'utf-8', callback);

function callback(err, data) {


    if (err) {
        console.log(err);
    }
    //let buffer = data;
    //let string = buffer.toString();
    console.log(data.split(/\n/).length - 1);

}