const http = require('http');
const results = [];
let count = 0;

function httpGet(index) {
http.get(process.argv[index + 2], function (response) {

    resultText = "";
    resultCharCount = 0;
    response.setEncoding();

    response.on('data', function(data){
        resultText += data;
    });

    response.on('error', function(error) {
        console.error(error);

    });

    response.on('end', function(){
        results[index] = resultText;
        count++;
        if (count === 3) {
            printResults();
        }

    })
});
}


function printResults() {
    for (let i = 0; i < 3; i++) {
        console.log(results[i]);
    }
}

for(let i = 0; i < 3; i++) {
    httpGet(i);
}