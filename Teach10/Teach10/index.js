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

        if (request.query.id) {
            var id = request.query.id;

                getParentsByID(id, function(err, result) {

                    response.end(JSON.stringify(result))

                })

            
        } else {
            response.render("pages/getPerson");
        }

    })
    .get('/getChildren', (request, response) => {

        if (request.query.id) {
            var id = request.query.id;

                getChildrenByID(id, function(err, result) {

                    response.end(JSON.stringify(result))

                })

            
        } else {
            response.render("pages/getPerson");
        }
        
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

function getParentsByID (id, callback) {
    pool.query('SELECT parent_id FROM person INNER JOIN children ON person_id = child_id WHERE person_id = $1', [id], (err, res) => {
        if (err) {
            callback(err)
        }
        
        let parents = [];

        for (let i = 0; i < res.rows.length; i++) {
            var resultCounter = 0;
            console.log(res.rows[i].parent_id);

            getPersonByID(res.rows[i].parent_id, function(err, result) {

               parents.push(result)
                resultCounter++;
                console.log(resultCounter)
                if (resultCounter === res.rows.length){
                    console.log("in if");
                    callback(null,parents);
                }

            })

        }

        

})
}

function getChildrenByID (id, callback) {
    pool.query('SELECT child_id FROM person INNER JOIN children ON person_id = parent_id WHERE person_id = $1', [id], (err, res) => {
        if (err) {
            callback(err)
        }
        
        let children = [];

        for (let i = 0; i < res.rows.length; i++) {
            var resultCounter = 0;
            console.log(res.rows[i].parent_id);

            getPersonByID(res.rows[i].child_id, function(err, result) {

               children.push(result)
                resultCounter++;
                console.log(resultCounter)
                if (resultCounter === res.rows.length){
                    console.log("in if");
                    callback(null,children);
                }

            })
        }
})
}