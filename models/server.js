const express = require('express');
const cors = require('cors');
const { conexionDB } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.PORT = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.conectarDB();
        //MIDDLEWARES
        this.middlewares();

        //RUTAS
        this.routes();
    }

    async conectarDB(){
        await conexionDB();
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
