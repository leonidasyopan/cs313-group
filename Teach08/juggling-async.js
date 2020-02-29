const http = require('http');
let firstText = "",secondText = "",thirdText = "";

http.get(process.argv[2], first);
http.get(process.argv[3], second);
http.get(process.argv[4], third);

function first (response) {
    
    let resultText = "";
    response.setEncoding();

    response.on('data', function(data){
        resultText += data;
    });

    response.on('error', function(error) {
        console.log(error);

    });

    response.on('end', function(){
        firstText =  resultText;
        if (secondText != "" && thirdText != "") {
            sendResult();
        }
    })

   
}

function second (response) {
    let resultText = "";
    response.setEncoding();

    response.on('data', function(data){
        resultText += data;
    });

    response.on('error', function(error) {
        console.log(error);

    });

    response.on('end', function(){
        secondText =  resultText;
        if (firstText != "" && thirdText != "") {
            sendResult();
        }
    })
    
}

function third (response) {
    let resultText = "";
    response.setEncoding();

    response.on('data', function(data){
        resultText += data;
    });

    response.on('error', function(error) {
        console.error(error);

    });

    response.on('end', function(){
        thirdText =  resultText;
        if (firstText != "" && secondText != "") {
            sendResult();
        }
    })
    
}

function sendResult() {
    console.log(firstText);
    console.log(secondText);
    console.log(thirdText);
}