const http = require('http');
const fs = require('fs');

let port = process.argv[2];

function requestListener (request, response) {

    let result = "";
    let file = fs.createReadStream(process.argv[3]);
    file.on('data', function (data) {

        let chunk = data.toString()
        result += chunk;
    });

    file.on('end',function () {
        response.writeHead(200);
        response.end(result);
    })
    
}
const server = http.createServer(requestListener);
server.listen(port);
