const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/obtener-token');

const authPost = async (req, res) => {
    const {correo, password} = req.body;

    const usuario = await Usuario.findOne({correo, estado:true});
    if(!usuario){
        return res.status(400).json({
            msg: 'Correo o password no existen la BD'
        })
    }

    const validarPassword = bcryptjs.compareSync(password, usuario.password);

    if(!validarPassword){
        return res.status(400).json({
            msg: 'El password es incorrecto'
        })
    }

    const token = await generarJWT(usuario.id);
    res.json({
        usuario,
        token
    })
}

module.exports = {
    authPost
}