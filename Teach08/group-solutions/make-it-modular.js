var module = require('./mymodule.js');

let directory = process.argv[2];
let extenstion = process.argv[3];
module(directory, extenstion, callback);

function callback(err, data) {
    if(err){
        console.log(err);
    }
    else {
        data.forEach(element => {
            console.log(element);
        });
        
    }
}