'use strict';
var http = require('http'),
    port = process.argv[2];


var connect = function (req, res) {

    var parsed = new URL(req.url, 'http://exampple.com'),
        date = new Date(parsed.searchParams.get('iso')),
        result = '';

    if (/api\/parsetime/.test(req.url)) {

        result = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        };

    } else if (/api\/unixtime/.test(req.url)) {
        
        result = {
            unixtime: date.getTime()
        };
    }

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    return res.end(JSON.stringify(result));
};

http.createServer(connect).listen(port);