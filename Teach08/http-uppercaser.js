const http = require('http');
const map = require('through2-map');

let port = process.argv[2];

function requestListener (request, response) {

    let result = "";
    
    request.on('data', function (data) {

        let chunk = data.toString().toUpperCase();
        result += chunk;
    });

    request.on('end',function () {
        response.writeHead(200);
        response.end(result);
    })
    
}
const server = http.createServer(requestListener);
server.listen(port);