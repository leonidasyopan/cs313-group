const net = require('net');
const server = net.createServer(function (socket) {

    let date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();

    if (month.toString().length < 2)
        month = '0' + month;
    
    if (day.length < 2)
        day = '0' + day;

    socket.write([year,month,day].join('-') + " " + date.getHours() + ":" + date.getMinutes() + '\n');
    socket.end();

});
server.listen(process.argv[2]);
