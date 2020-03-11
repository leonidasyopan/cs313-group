const express = require('express')
const path = require('path')
const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL || "postgres://noyhvnbaxtkxpx:283a83628fde31341a2731969eb18d54ad54a2e84daa887429d7647d531b4393@ec2-184-72-235-80.compute-1.amazonaws.com:5432/dfqhr4c08nknuo?ssl=true";
const PORT = process.env.PORT || 5000

const pool = new Pool({ connectionString: connectionString })



express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/getPerson', (request, response) => {

        if (request.query.id) {
            var id = request.query.id;

                getPersonByID(id, function(err, result) {

                    response.end(JSON.stringify(result))

                })

            
        } else {
            response.render("pages/getPerson");
        }

    })
    .get('/getParents', (request, response) => {

    })
    .get('/getChildren', (request, response) => {
        
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

    function getPersonByID (id, callback) {
        pool.query('SELECT * FROM person WHERE person_id = $1', [id], (err, res) => {
            if (err) {
                callback(err)
            }
            result = res.rows[0]
            console.log('user:', result)

            callback(null,result);

    })
}