const http = require('http');

http.get(process.argv[2],callback);

function callback(response) {

    resultText = "";
    resultCharCount = 0;
    response.setEncoding();

    response.on('data', function(data){
        resultCharCount += data.length;
        resultText += data;
    });

    response.on('error', function(error) {
        console.log(error);

    });

    response.on('end', function(){
        console.log(resultCharCount);
        console.log(resultText);

    })
}