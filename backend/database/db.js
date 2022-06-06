const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: "127.0.0.1",
    port: 3307,
    user: "root",
    password: "",
    database: "guitarshopjava",
    connectionLimit: 5
});

module.exports = pool