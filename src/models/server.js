const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config');

class Server {

    constructor (){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        //Conectar a base de datos
        this.conectarDB();

        //middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    async conectarDB () {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use( express.json() );

        this.app.use( express.static('src/public') )
    }

    routes () {

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/user'));
          
    }

    listen () {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto: ${ this.port }`.green);
        });
    }
}

module.exports = Server;