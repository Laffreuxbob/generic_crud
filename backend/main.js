'use strict';

// Main conf
const express = require('express'); // NodeJS Server Framework
const pkg = require('./package.json'); // Pour pouvoir lire les data Json
const conf = require('./conf/server_config'); // x.x.x.x:XYZ

const bodyPost = require('body-parser'); // Necessaire a la lecture des data dans le body de la requete (post)


const server = express();


// Tools
const moment = require('moment')
const mariadb = require("mariadb");
const {createPool} = require("mariadb");
const database = require('./conf/database_config')
// const logger = require('')


// Avoid header CORS issue
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
// server.options('*', )


// server.options('*', cors());  // enable pre-flight


server.use(allowCrossDomain);
server.use(bodyPost.json()); // support json encoded bodies
server.use(bodyPost.urlencoded({extended: false})); // support encoded bodies


// curl http://ip:port/
server.get('/', (req, res) => {
    res.status(200);
    let json_response = {
        in: "Hello there ! ",
        out: "General Kenobi"
    }
    res.json(json_response)
})

// curl http://ip:port/version
server.get('/version', (req, res) => {
    if (!pkg || !pkg.version) {
        console.log('Error: No package.json');
        res.status(404);
        return res.send();
    }
    res.status(200);
    res.send(JSON.stringify(pkg.version))
})

// curl http://ip:port/item
server.get('/item', (req, res) => {
    mariadb.createConnection({
        host: database.host,
        port: database.port,
        user: database.user,
        password: database.password,
        database: database.database
    })
        .then(conn => {
            conn.query("SELECT * FROM item")
                .then(rows => {
                    conn.end()
                    res.send(rows);
                })
                .catch(err => {
                    console.log('bad request')
                    res.status(500)
                });
        })
        .catch(err => {
            console.log('bad connection')
            res.status(500)
        });
})

server.get('/item:id', (req, res) => {
    mariadb.createConnection({
        host: database.host,
        port: database.port,
        user: database.user,
        password: database.password,
        database: database.database
    })
        .then(conn => {
            conn.query("SELECT * FROM item WHERE id = ?", [url.params.id])
                .then(rows => {
                    conn.end()
                    res.send(rows);
                })
                .catch(err => {
                    console.log('bad request')
                    res.status(500)
                });
        })
        .catch(err => {
            console.log('bad connection')
            res.status(500)
        });
})

server.post('/item', (req, res) => {
    console.log("POST")
    console.log(req.body)

    mariadb.createConnection({
        host: database.host,
        port: database.port,
        user: database.user,
        password: database.password,
        database: database.database
    })
        .then(conn => {
            conn.query("INSERT INTO item (brand, model, price) VALUES (?, ?, ?)",
                [req.body.newbrand.toString(), req.body.newmodel.toString(), req.body.newprice])
                .catch(err => {
                    console.log(err, 'bad request')
                    res.status(500)
                });
        })
        .catch(err => {
            console.log(err, 'bad connection')
            res.status(500)
        });


    // mongo.db.collection('todos').findOne({name: newItem.name})
    //     .then(result => {
    //         if (result) {
    //             console.log("Warning,", newItem.name, " already exists!");
    //             res.status(403).end();
    //             return result;
    //         }
    //         mongo.db.collection('todos').insertOne(newItem);
    //         console.log('Todo successfully added to mongo database.');
    //         res.status(200);
    //         return res.send(JSON.stringify(newItem));
    //     })
    //     .catch(err => {
    //         console.log('An error occured inserting todo in mongo.', err)
    //     })
});

server.delete('/item', (req, res) => {
    console.log("DELETE")
    console.log(req.body)

    mariadb.createConnection({
        host: database.host,
        port: database.port,
        user: database.user,
        password: database.password,
        database: database.database
    })
        .then(conn => {
            conn.query("DELETE FROM item WHERE id = ?", [req.body.id_to_delete])
                .then( () => res.status(200))
                .catch(err => {
                    console.log(err, 'bad request')
                    res.status(500)
                });
            
        })

        .catch(err => {
            console.log(err, 'bad connection')
            res.status(500)
        });

});


// curl -X PUT -H "Content-Type: application/json" -d '{"id_to_update":"1", "updated_brand":"bob", "updated_model":"bobby", "updated_price":"10"}' "127.0.0.117:11717/item"
server.put('/item', (req, res) => {
    console.log("PUT")
    console.log(req.body)

    mariadb.createConnection({
        host: database.host,
        port: database.port,
        user: database.user,
        password: database.password,
        database: database.database
    })
        .then(async conn => {
            conn.query("UPDATE item SET brand = ? , model = ?, price = ? WHERE id = ?", [req.body.updated_brand, req.body.updated_model, req.body.updated_price, req.body.id_to_update])
                .then(
                    () => res.status(200)
                )
                .then(
                    await conn.query("SELECT * FROM item WHERE id = ?", [req.body.id_to_update])
                        .then(updated_item => {
                            conn.end()
                            res.send(updated_item);
                        })
                )
                .catch(err => {
                    console.log(err, 'bad request')
                    res.status(500)
                });
        })
        .catch(err => {
            console.log(err, 'bad connection')
            res.status(500)
        });
});


//server.get('/products', productService.getAll);
// server.get('/products/:id', productController.getOne);


// Server is running with the following conf : /server-config.js
server.listen(conf.port, conf.hostname, (err) => {
    if (err) {
        return console.log("Error:", err)
    }
    console.log('Server running at http://' + conf.hostname + ':' + conf.port + '/');
    console.log('today : ' + moment().format('DD-MM-YYYY hh:mm'))
})

