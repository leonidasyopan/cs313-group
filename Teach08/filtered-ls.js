const fs = require('fs');

fs.readdir(process.argv[2], 'utf-8', callback);

function callback(err, list) {


    if (err) {
        console.log(err);
    }

    let ext = new RegExp('.' + process.argv[3])
    for (let i = 0; i < list.length; i++) {
        if (list[i].match(ext)) {
            console.log(list[i]);

        }
    }

}