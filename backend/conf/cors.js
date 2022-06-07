

const cors = {
    const: whitelist = [
        'http://0.0.0.0:3000',
    ],
    const: corsOptions = {
        origin: function(origin, callback){
            const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
            callback(null, originIsWhitelisted);
        },
        credentials: true
    }
}

server.use(cors(corsOptions));