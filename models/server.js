const express = require('express');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();
        this.PORT = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //MIDDLEWARES
        this.middlewares();

        //RUTAS
        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //DIRECTORIO PÚBLICO
        this.app.use(express.static('public'));

        //LECTURA Y PARSEO DEL BPDY
        this.app.use(express.json());

    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.PORT, () => {
            console.log(`Aplicación corriendo en el PUERTO ${this.PORT}`);
        })

    }
}

module.exports = Server



/*
const express = require('express');
const CORS = require('cors')

const Server {
    constructor(){
        this.app = express();
        this.PORT = process.env.PORT;
        this.userPath = '/api/usuarios';
        this.middlewares();
        this.routes();

    }

    middlewares(){
        this.app.use(cors);
        this.app.use(express.static('public'));    
    }

    routes(){
        this.app.use(this.userPath require('./routes/user.js'));
    }

    listen(){
        this.app.listen(this.PORT, () => {
            console.log('Corriendo el servidor', this.PORT);
        })
    }


}

module.exports = Server;


*/