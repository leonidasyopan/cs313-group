const http = require('http');

http.get(process.argv[2],callback);

function callback(response) {

    response.setEncoding();

    response.on('data', function(data){
        console.log(data);
    });

    response.on('error', function(error) {
        console.log(error);

    });

    response.on('end', function(){

    })
}