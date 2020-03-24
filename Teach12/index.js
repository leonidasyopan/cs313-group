const express = require('express')
const session = require('express-session');
const bcrypt = require('bcrypt');
const FileStore = require('session-file-store')(session);
const path = require('path')
const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgres://noyhvnbaxtkxpx:283a83628fde31341a2731969eb18d54ad54a2e84daa887429d7647d531b4393@ec2-184-72-235-80.compute-1.amazonaws.com:5432/dfqhr4c08nknuo?ssl=true';
const PORT = process.env.PORT || 5000

const pool = new Pool({ connectionString: connectionString })

function logRequest(request, response, next) {
    console.log("Received a request for: " + request.url);
    next();
}

function verifyLogin(request, response, next) {
    if(request.session.username) {
        next();
    } else {
        response.status(401)
        response.json({success: false});
    }
}

express()
    .use(require('morgan')('dev'))
    .use(express.json())
    .use(express.urlencoded({extended: true})) // support URL encoded bodies
    .use(express.static(path.join(__dirname, 'public')))
    .use(session({
        name: 'delicious-cookie-id',
        secret: 'some secret',
        saveUninitialized: true,
        resave: true,
        store: new FileStore()

    }))
    .use(logRequest)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .post('/login', (req,res) => {
        var username = req.body.username;
        var password = req.body.password;

        bcrypt.hash(password, 10).then(function(hash) {
            console.log(hash)
        });
    
        console.log(username);
        console.log(password);

        

        let sql = "SELECT * from users WHERE username = '" + username + "'";

        sqlQuery(sql, function (err, response){

            if(err) {
                console.error(err);
            }
            console.log()
            console.log(response[0]);
            if(response.length === 1) {

                bcrypt.compare(password, response[0].password, function(err, result) {
                    if(result) {
                        console.log('compare - if')
                        req.session.username = username;
                        res.json({success: true});
                        res.end();
                    }
                    else {
                        console.log('compare - else')
                        res.json ({success: false});
                        res.end();
                    }
                });
                
            }
            else {
                console.log('else')
                res.json ({success: false});
                res.end();
            }
        })
        
    })
    .post ('/logout', (req, res) => {

        if(req.session.username) {
            req.session.destroy();
            res.json({success: true})
            res.end();
        }
        else {
            res.json({success: false})
            res.end();
        }
    })

    .get ('/getServerTime', verifyLogin, (req,res) => {
        let time = new Date();
        res.json({success: true, time: time})
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))


    function sqlQuery (sql, callback) { 
    
    
        console.log(sql);
    
        pool.query(sql, (err, res) => {
            if (err) {
                callback(err)
            }
            if (res){
            callback(null,res.rows);
            }
    })
    }

    