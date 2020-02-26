module.exports = function (directory, extension, callbackto) {
    //the directory name, the filename extension string and your callback function
    const fs = require('fs');

    fs.readdir(directory, 'utf-8', callback);

    function callback(err, list) {


        if (err) {
            return callbackto(err);
        }

        let results = [];
        let ext = new RegExp('.' + extension)
        for (let i = 0; i < list.length; i++) {
            if (list[i].match(ext)) {
                results.push(list[i]);
            }
        }
        callbackto(null, results);

    }
}
